export const queryKeys = {
  folders: ["folders"] as const,
  keywords: ["keywords"] as const,
  problems: (filters?: { keyword?: string; folderId?: string; query?: string }) =>
    [
      "problems",
      {
        keyword: filters?.keyword ?? "all",
        folderId: filters?.folderId ?? "",
        query: filters?.query ?? ""
      }
    ] as const,
  problem: (id: string) => ["problem", id] as const
};
