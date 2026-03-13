import type { Folder, Keyword, Problem } from "@/types/problem";
import { MUSIC_FOLDER_ID } from "@/lib/constants/folders";

export const seedKeywords: Keyword[] = [
  { id: "all", slug: "all", label: { ko: "전체", en: "All" }, colorToken: "neutral" },
  { id: "functions", slug: "functions", label: { ko: "함수", en: "Functions" }, colorToken: "lilac" },
  { id: "statistics", slug: "statistics", label: { ko: "통계", en: "Statistics" }, colorToken: "mint" },
  { id: "equations", slug: "equations", label: { ko: "방정식", en: "Equations" }, colorToken: "warning" },
  { id: "integration", slug: "integration", label: { ko: "적분", en: "Integration" }, colorToken: "secondary" }
];

export const seedFolders: Folder[] = [
  { id: MUSIC_FOLDER_ID, name: "뮤직", coverToken: "secondary", problemCount: 487, createdAt: "2026-03-01T10:00:00.000Z" },
  { id: "folder-1", name: "기출", coverToken: "coral", problemCount: 1368, createdAt: "2026-03-04T10:00:00.000Z" },
  { id: "folder-3", name: "6월 모의", coverToken: "warning", problemCount: 214, createdAt: "2026-03-06T10:00:00.000Z" }
];

export const seedProblems: Problem[] = [
  {
    id: "problem-51",
    title: "051",
    subject: "math",
    keywordIds: ["functions", "statistics"],
    folderId: "folder-3",
    body: "함수 f(x), g(x)에 대하여 lim 문제를 다시 풀어보는 연습용 카드입니다.",
    coverImage: { id: "cover-51", name: "cover-51.png", objectUrl: "/placeholder-problem.svg", kind: "cover" },
    solutionImages: [
      { id: "solution-51-1", name: "solution-51-1.png", objectUrl: "/placeholder-problem-2.svg", kind: "solution" },
      { id: "solution-51-2", name: "solution-51-2.png", objectUrl: "/placeholder-problem-3.svg", kind: "solution" }
    ],
    createdAt: "2026-03-09T10:00:00.000Z",
    updatedAt: "2026-03-09T10:00:00.000Z"
  },
  {
    id: "problem-65",
    title: "065",
    subject: "math",
    keywordIds: ["equations"],
    folderId: "folder-1",
    body: "방정식과 그래프를 함께 다루는 문제입니다.",
    coverImage: { id: "cover-65", name: "cover-65.png", objectUrl: "/placeholder-problem.svg", kind: "cover" },
    solutionImages: [],
    createdAt: "2026-03-10T10:00:00.000Z",
    updatedAt: "2026-03-10T10:00:00.000Z"
  },
  {
    id: "problem-78",
    title: "0078",
    subject: "math",
    keywordIds: ["statistics"],
    folderId: MUSIC_FOLDER_ID,
    body: "표본과 분산에 관한 정리 확인 문제입니다.",
    coverImage: { id: "cover-78", name: "cover-78.png", objectUrl: "/placeholder-problem-2.svg", kind: "cover" },
    solutionImages: [
      { id: "solution-78-1", name: "solution-78-1.png", objectUrl: "/placeholder-problem.svg", kind: "solution" }
    ],
    createdAt: "2026-03-11T10:00:00.000Z",
    updatedAt: "2026-03-11T10:00:00.000Z"
  },
  {
    id: "problem-55",
    title: "55",
    subject: "math",
    keywordIds: ["functions"],
    folderId: "folder-3",
    body: "6월 모의고사에서 어려웠던 함수 문제를 다시 모은 카드입니다.",
    coverImage: { id: "cover-55", name: "cover-55.png", objectUrl: "/placeholder-problem-3.svg", kind: "cover" },
    solutionImages: [
      { id: "solution-55-1", name: "solution-55-1.png", objectUrl: "/placeholder-problem.svg", kind: "solution" },
      { id: "solution-55-2", name: "solution-55-2.png", objectUrl: "/placeholder-problem-2.svg", kind: "solution" },
      { id: "solution-55-3", name: "solution-55-3.png", objectUrl: "/placeholder-problem-4.svg", kind: "solution" }
    ],
    createdAt: "2026-03-11T16:00:00.000Z",
    updatedAt: "2026-03-11T16:00:00.000Z"
  },
  {
    id: "problem-54",
    title: "0054",
    subject: "math",
    keywordIds: ["functions"],
    folderId: "folder-1",
    body: "함수의 극한과 분수식을 함께 보는 대표 문제입니다.",
    coverImage: { id: "cover-54", name: "cover-54.png", objectUrl: "/placeholder-problem-4.svg", kind: "cover" },
    solutionImages: [],
    createdAt: "2026-03-11T18:00:00.000Z",
    updatedAt: "2026-03-11T18:00:00.000Z"
  },
  {
    id: "problem-67",
    title: "067",
    subject: "math",
    keywordIds: ["equations", "integration"],
    folderId: "folder-1",
    body: "방정식과 적분 조건을 함께 묻는 고난도 문제입니다.",
    coverImage: { id: "cover-67", name: "cover-67.png", objectUrl: "/placeholder-problem-2.svg", kind: "cover" },
    solutionImages: [
      { id: "solution-67-1", name: "solution-67-1.png", objectUrl: "/placeholder-problem-4.svg", kind: "solution" }
    ],
    createdAt: "2026-03-12T09:00:00.000Z",
    updatedAt: "2026-03-12T09:00:00.000Z"
  },
  {
    id: "problem-82",
    title: "082",
    subject: "math",
    keywordIds: ["statistics"],
    folderId: MUSIC_FOLDER_ID,
    body: "확률과 통계 개념을 묶어서 복습하기 위한 문제입니다.",
    coverImage: { id: "cover-82", name: "cover-82.png", objectUrl: "/placeholder-problem-3.svg", kind: "cover" },
    solutionImages: [],
    createdAt: "2026-03-12T12:00:00.000Z",
    updatedAt: "2026-03-12T12:00:00.000Z"
  },
  {
    id: "problem-91",
    title: "091",
    subject: "math",
    keywordIds: ["integration"],
    folderId: MUSIC_FOLDER_ID,
    body: "적분 구간 해석과 그래프 독해를 동시에 요구하는 문제입니다.",
    coverImage: { id: "cover-91", name: "cover-91.png", objectUrl: "/placeholder-problem.svg", kind: "cover" },
    solutionImages: [
      { id: "solution-91-1", name: "solution-91-1.png", objectUrl: "/placeholder-problem-3.svg", kind: "solution" },
      { id: "solution-91-2", name: "solution-91-2.png", objectUrl: "/placeholder-problem-4.svg", kind: "solution" }
    ],
    createdAt: "2026-03-12T20:00:00.000Z",
    updatedAt: "2026-03-12T20:00:00.000Z"
  },
  {
    id: "problem-92",
    title: "092",
    subject: "math",
    keywordIds: ["functions", "integration"],
    folderId: MUSIC_FOLDER_ID,
    body: "뮤직 폴더에서 함수와 적분을 함께 복습하는 카드입니다.",
    coverImage: { id: "cover-92", name: "cover-92.png", objectUrl: "/placeholder-problem-4.svg", kind: "cover" },
    solutionImages: [],
    createdAt: "2026-03-12T21:00:00.000Z",
    updatedAt: "2026-03-12T21:00:00.000Z"
  },
  {
    id: "problem-93",
    title: "093",
    subject: "math",
    keywordIds: ["statistics", "equations"],
    folderId: MUSIC_FOLDER_ID,
    body: "통계 조건을 방정식으로 해석하는 유형을 정리한 문제입니다.",
    coverImage: { id: "cover-93", name: "cover-93.png", objectUrl: "/placeholder-problem-2.svg", kind: "cover" },
    solutionImages: [
      { id: "solution-93-1", name: "solution-93-1.png", objectUrl: "/placeholder-problem-3.svg", kind: "solution" }
    ],
    createdAt: "2026-03-12T22:00:00.000Z",
    updatedAt: "2026-03-12T22:00:00.000Z"
  },
  {
    id: "problem-94",
    title: "094",
    subject: "math",
    keywordIds: ["integration"],
    folderId: MUSIC_FOLDER_ID,
    body: "넓이와 적분 구간을 함께 묻는 대표 유형입니다.",
    coverImage: { id: "cover-94", name: "cover-94.png", objectUrl: "/placeholder-problem.svg", kind: "cover" },
    solutionImages: [],
    createdAt: "2026-03-12T23:00:00.000Z",
    updatedAt: "2026-03-12T23:00:00.000Z"
  },
  {
    id: "problem-101",
    title: "101",
    subject: "math",
    keywordIds: ["equations"],
    folderId: "folder-1",
    body: "기출에서 자주 나오는 이차방정식 그래프 해석 문제입니다.",
    coverImage: { id: "cover-101", name: "cover-101.png", objectUrl: "/placeholder-problem.svg", kind: "cover" },
    solutionImages: [],
    createdAt: "2026-03-13T09:00:00.000Z",
    updatedAt: "2026-03-13T09:00:00.000Z"
  },
  {
    id: "problem-102",
    title: "102",
    subject: "math",
    keywordIds: ["functions"],
    folderId: "folder-1",
    body: "기출 함수 문제 중 변곡점 해석이 중요한 유형입니다.",
    coverImage: { id: "cover-102", name: "cover-102.png", objectUrl: "/placeholder-problem-2.svg", kind: "cover" },
    solutionImages: [
      { id: "solution-102-1", name: "solution-102-1.png", objectUrl: "/placeholder-problem.svg", kind: "solution" }
    ],
    createdAt: "2026-03-13T09:30:00.000Z",
    updatedAt: "2026-03-13T09:30:00.000Z"
  },
  {
    id: "problem-103",
    title: "103",
    subject: "math",
    keywordIds: ["statistics"],
    folderId: "folder-1",
    body: "기출 통계 문제 중 표본 분포를 해석하는 카드입니다.",
    coverImage: { id: "cover-103", name: "cover-103.png", objectUrl: "/placeholder-problem-3.svg", kind: "cover" },
    solutionImages: [],
    createdAt: "2026-03-13T10:00:00.000Z",
    updatedAt: "2026-03-13T10:00:00.000Z"
  },
  {
    id: "problem-106",
    title: "106",
    subject: "math",
    keywordIds: ["functions", "statistics"],
    folderId: "folder-1",
    body: "기출형 데이터 해석과 함수식을 같이 묻는 문제입니다.",
    coverImage: { id: "cover-106", name: "cover-106.png", objectUrl: "/placeholder-problem-2.svg", kind: "cover" },
    solutionImages: [
      { id: "solution-106-1", name: "solution-106-1.png", objectUrl: "/placeholder-problem-4.svg", kind: "solution" }
    ],
    createdAt: "2026-03-13T11:30:00.000Z",
    updatedAt: "2026-03-13T11:30:00.000Z"
  },
  {
    id: "problem-201",
    title: "201",
    subject: "math",
    keywordIds: ["functions"],
    folderId: "folder-3",
    body: "6월 모의 함수 문항 중 오답률이 높았던 문제입니다.",
    coverImage: { id: "cover-201", name: "cover-201.png", objectUrl: "/placeholder-problem-3.svg", kind: "cover" },
    solutionImages: [],
    createdAt: "2026-03-13T12:00:00.000Z",
    updatedAt: "2026-03-13T12:00:00.000Z"
  },
  {
    id: "problem-202",
    title: "202",
    subject: "math",
    keywordIds: ["equations"],
    folderId: "folder-3",
    body: "6월 모의 방정식 문항을 다시 정리한 카드입니다.",
    coverImage: { id: "cover-202", name: "cover-202.png", objectUrl: "/placeholder-problem.svg", kind: "cover" },
    solutionImages: [
      { id: "solution-202-1", name: "solution-202-1.png", objectUrl: "/placeholder-problem-2.svg", kind: "solution" }
    ],
    createdAt: "2026-03-13T12:30:00.000Z",
    updatedAt: "2026-03-13T12:30:00.000Z"
  },
  {
    id: "problem-203",
    title: "203",
    subject: "math",
    keywordIds: ["statistics"],
    folderId: "folder-3",
    body: "6월 모의 통계 문항에서 조건 해석을 연습하는 문제입니다.",
    coverImage: { id: "cover-203", name: "cover-203.png", objectUrl: "/placeholder-problem-4.svg", kind: "cover" },
    solutionImages: [],
    createdAt: "2026-03-13T13:00:00.000Z",
    updatedAt: "2026-03-13T13:00:00.000Z"
  },
  {
    id: "problem-204",
    title: "204",
    subject: "math",
    keywordIds: ["integration", "equations"],
    folderId: "folder-3",
    body: "적분과 방정식을 함께 처리하는 6월 모의 킬러 유형입니다.",
    coverImage: { id: "cover-204", name: "cover-204.png", objectUrl: "/placeholder-problem-2.svg", kind: "cover" },
    solutionImages: [
      { id: "solution-204-1", name: "solution-204-1.png", objectUrl: "/placeholder-problem-3.svg", kind: "solution" },
      { id: "solution-204-2", name: "solution-204-2.png", objectUrl: "/placeholder-problem.svg", kind: "solution" }
    ],
    createdAt: "2026-03-13T13:30:00.000Z",
    updatedAt: "2026-03-13T13:30:00.000Z"
  },
  {
    id: "problem-205",
    title: "205",
    subject: "math",
    keywordIds: ["functions", "integration"],
    folderId: "folder-3",
    body: "함수 증가감소와 적분값을 연결하는 6월 모의 문제입니다.",
    coverImage: { id: "cover-205", name: "cover-205.png", objectUrl: "/placeholder-problem-3.svg", kind: "cover" },
    solutionImages: [],
    createdAt: "2026-03-13T14:00:00.000Z",
    updatedAt: "2026-03-13T14:00:00.000Z"
  }
];
