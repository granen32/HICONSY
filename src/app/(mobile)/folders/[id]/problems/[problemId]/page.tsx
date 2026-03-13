import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ProblemDetailPage } from "@/features/problem-detail/problem-detail-page";
import { getFolders, getKeywords, getProblemById } from "@/lib/mocks/repository";
import { getQueryClient } from "@/lib/query/get-query-client";
import { queryKeys } from "@/lib/query/keys";

export default async function FolderProblemDetailRoute({
  params,
  searchParams
}: {
  params: Promise<{ id: string; problemId: string }>;
  searchParams: Promise<{ back?: string }>;
}) {
  const { id, problemId } = await params;
  const { back } = await searchParams;
  const fallbackHref = back ?? `/folders/${id}`;
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({ queryKey: queryKeys.keywords, queryFn: getKeywords }),
    queryClient.prefetchQuery({ queryKey: queryKeys.folders, queryFn: getFolders }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.problem(problemId),
      queryFn: () => getProblemById(problemId)
    })
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProblemDetailPage problemId={problemId} backHref={fallbackHref} deleteRedirectHref={fallbackHref} />
    </HydrationBoundary>
  );
}
