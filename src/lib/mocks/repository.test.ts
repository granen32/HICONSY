import { createFolder, createProblem, deleteProblem, getFolders, getProblemById, getProblems } from "@/lib/mocks/repository";

describe("mock repository", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("filters problems by keyword", async () => {
    const problems = await getProblems({ keyword: "functions" });

    expect(problems.length).toBeGreaterThan(0);
    expect(problems.every((problem) => problem.keywordIds.includes("functions"))).toBe(true);
  });

  it("filters problems by search query", async () => {
    const problems = await getProblems({ query: "그래프" });

    expect(problems.length).toBeGreaterThanOrEqual(1);
    expect(problems.some((problem) => problem.id === "problem-65")).toBe(true);
  });

  it("filters problems by folder", async () => {
    const problems = await getProblems({ folderId: "folder-music" });

    expect(problems.length).toBeGreaterThan(0);
    expect(problems.every((problem) => problem.folderId === "folder-music")).toBe(true);
  });

  it("returns folders with computed problem counts", async () => {
    const folders = await getFolders();
    const musicFolder = folders.find((folder) => folder.id === "folder-music");
    const juneFolder = folders.find((folder) => folder.id === "folder-3");

    expect(folders).toHaveLength(3);
    expect(musicFolder?.problemCount).toBe(6);
    expect(juneFolder?.problemCount).toBe(7);
  });

  it("creates and persists a folder", async () => {
    const folder = await createFolder({ name: "새 폴더", coverToken: "coral" });
    const stored = JSON.parse(window.localStorage.getItem("hiconsy-folders") ?? "[]") as Array<{ id: string; name: string }>;

    expect(folder.name).toBe("새 폴더");
    expect(stored.some((entry) => entry.id === folder.id)).toBe(true);
  });

  it("gets a problem by id and deletes it", async () => {
    const created = await createProblem({
      title: "삭제 테스트",
      subject: "math",
      keywordIds: ["functions"],
      body: "삭제 가능한 문제",
      folderId: undefined,
      coverImage: undefined,
      solutionImages: []
    });

    const found = await getProblemById(created.id);
    expect(found?.id).toBe(created.id);

    await deleteProblem(created.id);
    const deleted = await getProblemById(created.id);
    expect(deleted).toBeNull();
  });
});
