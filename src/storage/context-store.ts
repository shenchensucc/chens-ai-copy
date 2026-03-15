import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = join(__dirname, "..", "..");
const DATA_DIR = process.env.CHENS_AI_COPY_DATA_PATH || join(PACKAGE_ROOT, "data");

export interface Preferences {
  resumeFormat?: {
    style: string;
    sectionsOrder: string[];
    bulletStyle: string;
    atsOptimized: boolean;
    maxPages: number;
  };
  communication?: {
    tone: string;
    length: string;
    formality: string;
  };
  [key: string]: unknown;
}

export interface Learning {
  id: string;
  content: string;
  source?: string;
  category?: string;
  date: string;
}

export interface InterestedCompany {
  name: string;
  sector?: string;
  notes?: string;
  rolesOfInterest?: string[];
  lastChecked?: string;
}

export interface ContextData {
  preferences: Preferences;
  experience: unknown;
  skills: unknown;
  learnings: Learning[];
  interestedCompanies: InterestedCompany[];
  updatedAt: string;
}

async function ensureDataDir(): Promise<void> {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
}

function dataPath(file: string): string {
  return join(DATA_DIR, file);
}

export async function loadJson<T>(file: string, defaultValue: T): Promise<T> {
  await ensureDataDir();
  const path = dataPath(file);
  if (!existsSync(path)) {
    return defaultValue;
  }
  try {
    const content = await readFile(path, "utf-8");
    return JSON.parse(content) as T;
  } catch {
    return defaultValue;
  }
}

export async function saveJson<T>(file: string, data: T): Promise<void> {
  await ensureDataDir();
  const path = dataPath(file);
  await writeFile(path, JSON.stringify(data, null, 2), "utf-8");
}

export async function getFullContext(): Promise<ContextData> {
  const [preferences, experience, skills, learnings, interestedCompanies] = await Promise.all([
    loadJson<Preferences>("preferences.json", {}),
    loadJson("experience.json", {}),
    loadJson("skills.json", {}),
    loadJson<Learning[]>("learnings.json", []),
    loadJson<InterestedCompany[]>("interested_companies.json", []),
  ]);

  return {
    preferences,
    experience,
    skills,
    learnings,
    interestedCompanies,
    updatedAt: new Date().toISOString(),
  };
}

export async function addLearning(learning: Omit<Learning, "id" | "date">): Promise<Learning> {
  const learnings = await loadJson<Learning[]>("learnings.json", []);
  const newLearning: Learning = {
    ...learning,
    id: `l-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    date: new Date().toISOString(),
  };
  learnings.push(newLearning);
  await saveJson("learnings.json", learnings);
  return newLearning;
}

export async function updatePreference(key: string, value: unknown): Promise<void> {
  const prefs = await loadJson<Record<string, unknown>>("preferences.json", {});
  const keys = key.split(".");
  let target: Record<string, unknown> = prefs;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    if (!(k in target) || typeof target[k] !== "object") {
      target[k] = {};
    }
    target = target[k] as Record<string, unknown>;
  }
  target[keys[keys.length - 1]] = value;
  await saveJson("preferences.json", prefs);
}

export async function addInterestedCompany(company: InterestedCompany): Promise<void> {
  const companies = await loadJson<InterestedCompany[]>("interested_companies.json", []);
  if (!companies.some((c) => c.name.toLowerCase() === company.name.toLowerCase())) {
    companies.push(company);
    await saveJson("interested_companies.json", companies);
  }
}
