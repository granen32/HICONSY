import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { KeywordFeedPage } from "@/features/listing/keyword-feed-page";
import { getKeywords, getProblems } from "@/lib/mocks/repository";
import { getQueryClient } from "@/lib/query/get-query-client";
import { queryKeys } from "@/lib/query/keys";

export default async function MainKeywordFeedRoute({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({ queryKey: queryKeys.keywords, queryFn: getKeywords }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.problems({ keyword: slug }),
      queryFn: () => getProblems({ keyword: slug })
    })
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <KeywordFeedPage slug={slug} backHref="/" />
    </HydrationBoundary>
  );
}
