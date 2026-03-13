import { seedFolders, seedKeywords, seedProblems } from "@/lib/mocks/seed";
import { safeRead, safeWrite } from "@/lib/storage/local-storage";
import type { Folder, Keyword, Problem, ProblemFilters } from "@/types/problem";
import { MUSIC_FOLDER_ID } from "@/lib/constants/folders";

const STORAGE_KEYS = {
  folders: "hiconsy-folders",
  problems: "hiconsy-problems"
} as const;

function wait(ms = 150) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeFolders(folders: Folder[]) {
  const next = folders.map((folder) =>
    folder.id === "folder-2" ? { ...folder, id: MUSIC_FOLDER_ID, name: "뮤직", coverToken: "secondary" } : folder
  );

  if (!next.some((folder) => folder.id === MUSIC_FOLDER_ID)) {
    return [seedFolders[0], ...next];
  }

  return next;
}

function normalizeProblems(problems: Problem[]) {
  return problems.map((problem) =>
    problem.folderId === "folder-2" ? { ...problem, folderId: MUSIC_FOLDER_ID } : problem
  );
}

function readFolders() {
  const folders = normalizeFolders(safeRead(STORAGE_KEYS.folders, seedFolders));
  const problems = readProblems();
  const foldersWithCounts = folders.map((folder) => ({
    ...folder,
    problemCount: problems.filter((problem) => problem.folderId === folder.id).length
  }));
  safeWrite(STORAGE_KEYS.folders, foldersWithCounts);
  return foldersWithCounts;
}

function readProblems() {
  const problems = normalizeProblems(safeRead(STORAGE_KEYS.problems, seedProblems));
  safeWrite(STORAGE_KEYS.problems, problems);
  return problems;
}

export async function getKeywords(): Promise<Keyword[]> {
  await wait();
  return seedKeywords;
}

export async function getFolders(): Promise<Folder[]> {
  await wait();
  return readFolders();
}

export async function createFolder(input: Pick<Folder, "name" | "coverToken">): Promise<Folder> {
  await wait();

  const folders = readFolders();
  const folder: Folder = {
    id: `folder-${crypto.randomUUID()}`,
    name: input.name,
    coverToken: input.coverToken,
    problemCount: 0,
    createdAt: new Date().toISOString()
  };

  safeWrite(STORAGE_KEYS.folders, [folder, ...folders]);
  return folder;
}

export async function getProblems(filters?: ProblemFilters): Promise<Problem[]> {
  await wait();

  const problems = readProblems();
  const normalizedQuery = filters?.query?.trim().toLowerCase();

  let filtered = problems;

  if (filters?.keyword && filters.keyword !== "all") {
    filtered = filtered.filter((problem) => problem.keywordIds.includes(filters.keyword!));
  }

  if (filters?.folderId) {
    filtered = filtered.filter((problem) => problem.folderId === filters.folderId);
  }

  if (normalizedQuery) {
    filtered = filtered.filter((problem) => {
      const haystack = `${problem.title} ${problem.body}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }

  return filtered;
}

export async function createProblem(
  input: Omit<Problem, "id" | "createdAt" | "updatedAt">
): Promise<Problem> {
  await wait();

  const problems = readProblems();
  const problem: Problem = {
    ...input,
    id: `problem-${crypto.randomUUID()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  safeWrite(STORAGE_KEYS.problems, [problem, ...problems]);
  return problem;
}

export async function getProblemById(id: string): Promise<Problem | null> {
  await wait();

  const problems = readProblems();
  return problems.find((problem) => problem.id === id) ?? null;
}

export async function deleteProblem(id: string): Promise<{ id: string }> {
  await wait();

  const problems = readProblems();
  safeWrite(
    STORAGE_KEYS.problems,
    problems.filter((problem) => problem.id !== id)
  );

  return { id };
}
