export type Locale = "ko" | "en";

export type Keyword = {
  id: string;
  slug: string;
  label: Record<Locale, string>;
  colorToken: string;
};

export type Folder = {
  id: string;
  name: string;
  coverToken: string;
  problemCount: number;
  createdAt: string;
};

export type ProblemImage = {
  id: string;
  name: string;
  objectUrl: string;
  kind: "cover" | "solution";
};

export type Problem = {
  id: string;
  title: string;
  subject: "math";
  keywordIds: string[];
  folderId?: string;
  coverImage?: ProblemImage;
  solutionImages: ProblemImage[];
  body: string;
  createdAt: string;
  updatedAt: string;
};

export type ProblemFilters = {
  keyword?: string;
  folderId?: string;
  query?: string;
};
