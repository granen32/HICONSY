import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ListingPage } from "@/features/listing/listing-page";
import { getFolders, getKeywords, getProblems } from "@/lib/mocks/repository";
import { getQueryClient } from "@/lib/query/get-query-client";
import { queryKeys } from "@/lib/query/keys";

export default async function MobileHomePage() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({ queryKey: queryKeys.keywords, queryFn: getKeywords }),
    queryClient.prefetchQuery({ queryKey: queryKeys.folders, queryFn: getFolders }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.problems({ keyword: "all" }),
      queryFn: () => getProblems({ keyword: "all" })
    })
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListingPage />
    </HydrationBoundary>
  );
}
