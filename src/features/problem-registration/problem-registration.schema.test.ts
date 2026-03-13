import { problemRegistrationSchema } from "@/features/problem-registration/problem-registration.schema";

describe("problem registration schema", () => {
  it("rejects empty title and keywords", () => {
    const result = problemRegistrationSchema.safeParse({
      title: "",
      keywordIds: [],
      body: ""
    });

    expect(result.success).toBe(false);
  });

  it("accepts valid input", () => {
    const result = problemRegistrationSchema.safeParse({
      title: "6월 모의고사",
      keywordIds: ["functions"],
      folderId: "folder-1",
      body: "방정식에서 어려웠던 문제를 다시 모아봅니다."
    });

    expect(result.success).toBe(true);
  });
});
