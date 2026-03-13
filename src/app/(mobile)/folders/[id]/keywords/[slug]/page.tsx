import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { KeywordFeedPage } from "@/features/listing/keyword-feed-page";
import { getKeywords, getProblems } from "@/lib/mocks/repository";
import { getQueryClient } from "@/lib/query/get-query-client";
import { queryKeys } from "@/lib/query/keys";

export default async function FolderKeywordFeedRoute({
  params
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const { id, slug } = await params;
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({ queryKey: queryKeys.keywords, queryFn: getKeywords }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.problems({ keyword: slug, folderId: id }),
      queryFn: () => getProblems({ keyword: slug, folderId: id })
    })
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <KeywordFeedPage
        slug={slug}
        backHref={`/folders/${id}`}
        baseKeywordPath={`/folders/${id}/keywords`}
        problemHrefBase={`/folders/${id}/problems`}
        folderId={id}
      />
    </HydrationBoundary>
  );
}
