import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import VideoGrid from "../organisms/VideoGrid";
import { getVideos } from "../../../apis/watching/videos";
import { useInView } from "react-intersection-observer";
import Error from "../../account/atoms/Error";
import { Suspense } from "react";
import VideoSkeleton from "../atoms/Skeleton";
import { ErrorBoundary } from "react-error-boundary";
import Dropdown from "../../common/Dropdown";
import { CATEGORY } from "../../account/constants/TAGLIST";
import Title from "../../account/atoms/Title";
import { nameToCategoryId } from "../utils/categoryId";

const VideoList = () => {
  const { ref, inView } = useInView();
  const [category, setCategory] = useState("IDOL");

  const handleOptionChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };
  const { data, error, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery(
      ["getVideos", category],
      ({ pageParam = 1 }) => {
        const categoryId = nameToCategoryId(category);
        return getVideos.fetchPostingsListWithScroll(pageParam, categoryId);
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          if (lastPage.last) return undefined;
          return allPages.length + 1;
          // const lastPageData = allPages[allPages.length - 1];
          // return lastPageData.last ? undefined : lastPageData.pageData.page + 1;
        },
        onSuccess: (data) => {
          console.log(data);
        },

        retry: false,
      }
    );

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, isFetchingNextPage, hasNextPage]);

  // 현재 응답 데이터의 page 값을 직접 조회하여 접근
  // const lastPageData = data?.pages[data?.pages.length - 1];
  // const currentPageData = lastPageData?.pageData?.videoAllResponseDTO;
  // const isLastPage = lastPageData?.last;
  // const allVideos = data?.pages
  //   .map((page) => page.pageData.videoAllResponseDTO)
  //   .flat();

  return (
    <>
      <Title className="mt-20 text-base text-paragraph">
        You can choose a video
      </Title>
      <Title className="mb-20">Videos by Category</Title>
      <main className="w-[70%]">
        <ErrorBoundary
          fallback={<Error errorMessage="Failed to load video list" />}
        >
          {error ? (
            <Error errorMessage={error.message} />
          ) : (
            <ErrorBoundary>
              <Suspense fallback={<VideoSkeleton />}>
                <div>
                  <Dropdown
                    name="category"
                    options={CATEGORY.map((c) => c.category)}
                    selected={category}
                    onSelectedChange={handleOptionChange}
                    className="border-2 bg-white mb-10"
                  />
                  <VideoGrid
                    // videos={allVideos}
                    videos={data?.pages}
                    fetchNextPage={fetchNextPage}
                    // last={isLastPage}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    ref={ref}
                    error={error}
                  />
                </div>
              </Suspense>
            </ErrorBoundary>
          )}
        </ErrorBoundary>
      </main>
    </>
  );
};

export default VideoList;
