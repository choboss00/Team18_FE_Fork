import React from "react";
import VideoCard from "../molecules/VideoCard";
import Loader from "../../account/atoms/Loader";
import Error from "../../account/atoms/Error";

const VideoGrid = React.forwardRef(
  ({ videos, hasNextPage, isFetchingNextPage, error }, ref) => {
    if (error) return <Error errorMessage={error.message} />;

    if (!videos || videos.length === 0) {
      return <p>유효한 데이터가 없습니다.</p>;
    }

    return (
      <>
        <div className="flex flex-wrap justify-center items-center space-x-4 ">
          {videos.map((page, i) => (
            <React.Fragment key={i}>
              {page?.videos?.response?.map((video) => (
                <VideoCard key={video.videoId} video={video} />
              ))}
            </React.Fragment>
          ))}
        </div>
        <div ref={ref} style={{ height: "100px" }}>
          {isFetchingNextPage ? (
            <Loader />
          ) : hasNextPage ? (
            <Loader />
          ) : (
            "마지막 페이지입니다."
          )}
        </div>
      </>
    );
  }
);

export default VideoGrid;
