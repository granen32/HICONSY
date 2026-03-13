import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { FolderListingPage } from "@/features/listing/folder-listing-page";
import { getFolders, getKeywords, getProblems } from "@/lib/mocks/repository";
import { getQueryClient } from "@/lib/query/get-query-client";
import { queryKeys } from "@/lib/query/keys";

export default async function FolderListingRoute({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({ queryKey: queryKeys.keywords, queryFn: getKeywords }),
    queryClient.prefetchQuery({ queryKey: queryKeys.folders, queryFn: getFolders }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.problems({ keyword: "all", folderId: id }),
      queryFn: () => getProblems({ keyword: "all", folderId: id })
    })
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FolderListingPage folderId={id} basePath={`/folders/${id}`} backHref="/" />
    </HydrationBoundary>
  );
}
