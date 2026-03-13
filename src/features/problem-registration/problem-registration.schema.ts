import { z } from "zod";

export const problemRegistrationSchema = z.object({
  title: z.string().min(1, "제목을 입력해 주세요.").max(60),
  keywordIds: z.array(z.string()).min(1, "키워드를 선택해 주세요."),
  folderId: z.string().optional(),
  body: z.string().min(1, "설명을 입력해 주세요.")
});

export type ProblemRegistrationValues = z.infer<typeof problemRegistrationSchema>;
