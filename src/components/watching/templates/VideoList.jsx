import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import VideoGrid from "../organisms/VideoGrid";
import { getVideos } from "../../../apis/watching/videos";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const VideoList = () => {
  const paramCategory = useParams().category;
  const { ref, inView } = useInView();

  const { data, error, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery(
      ["getVideos", paramCategory],
      ({ pageParam = 1 }) =>
        getVideos.fetchPostingsListWithScroll(pageParam, paramCategory),
      {
        getNextPageParam: (lastPage, allPages) => {
          if (lastPage.last) return undefined;
          return allPages.length + 1;
        },
        onSuccess: (data) => {
          console.log(data); // 응답 데이터 확인
        },
        retry: false,
      }
    );

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, isFetchingNextPage, hasNextPage]);

  // 토큰이 있는 경우 - UserVideoList && VideoList 출력
  // 없는 경우 - VideoList 만 출력
  return (
    <>
      <main className="max-w-[70%]">
        <VideoGrid
          videos={data?.pages}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          error={error}
          ref={ref}
        />
      </main>
    </>
  );
};

export default VideoList;
