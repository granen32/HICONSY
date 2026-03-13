import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ProblemDetailPage } from "@/features/problem-detail/problem-detail-page";
import { getFolders, getKeywords, getProblemById } from "@/lib/mocks/repository";
import { getQueryClient } from "@/lib/query/get-query-client";
import { queryKeys } from "@/lib/query/keys";

export default async function MusicProblemDetailRoute({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ back?: string }>;
}) {
  const { id } = await params;
  const { back } = await searchParams;
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({ queryKey: queryKeys.keywords, queryFn: getKeywords }),
    queryClient.prefetchQuery({ queryKey: queryKeys.folders, queryFn: getFolders }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.problem(id),
      queryFn: () => getProblemById(id)
    })
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProblemDetailPage problemId={id} backHref={back ?? "/music"} deleteRedirectHref={back ?? "/music"} />
    </HydrationBoundary>
  );
}
