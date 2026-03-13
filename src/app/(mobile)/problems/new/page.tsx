import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ProblemRegistrationForm } from "@/features/problem-registration/problem-registration-form";
import { getFolders, getKeywords } from "@/lib/mocks/repository";
import { getQueryClient } from "@/lib/query/get-query-client";
import { queryKeys } from "@/lib/query/keys";

export default async function ProblemRegistrationPage() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({ queryKey: queryKeys.keywords, queryFn: getKeywords }),
    queryClient.prefetchQuery({ queryKey: queryKeys.folders, queryFn: getFolders })
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProblemRegistrationForm />
    </HydrationBoundary>
  );
}
