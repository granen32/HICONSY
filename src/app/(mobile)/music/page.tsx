import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { FolderListingPage } from "@/features/listing/folder-listing-page";
import { MUSIC_FOLDER_ID } from "@/lib/constants/folders";
import { getFolders, getKeywords, getProblems } from "@/lib/mocks/repository";
import { getQueryClient } from "@/lib/query/get-query-client";
import { queryKeys } from "@/lib/query/keys";

export default async function MusicPage() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({ queryKey: queryKeys.keywords, queryFn: getKeywords }),
    queryClient.prefetchQuery({ queryKey: queryKeys.folders, queryFn: getFolders }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.problems({ keyword: "all", folderId: MUSIC_FOLDER_ID }),
      queryFn: () => getProblems({ keyword: "all", folderId: MUSIC_FOLDER_ID })
    })
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FolderListingPage backHref="/" />
    </HydrationBoundary>
  );
}
