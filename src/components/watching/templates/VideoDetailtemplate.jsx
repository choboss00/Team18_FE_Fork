import React from "react";
import { useParams } from "react-router-dom";
import { getDetailVideo } from "../../../apis/watching/videos";
import { useQuery } from "@tanstack/react-query";
import Error from "../../account/atoms/Error";
import Loader from "../../account/atoms/Loader";
import VideoDetailForm from "../organisms/VideoDetailForm";
import SideVideoForm from "../organisms/SideVideoForm";

const VideoDetailtemplate = () => {
  const { videoId } = useParams();
  const { data, isError, error, isLoading } = useQuery(
    ["getDetailVideo", videoId],
    () => getDetailVideo(videoId),
    { enabled: !!videoId, suspense: true }
  );
  if (isError) {
    return <Error errorMessage={error.errorMessage} />;
  }
  if (isLoading) {
    return <Loader />;
  }

  console.log(data);
  return (
    <>
      <main className="h-screen border-2">
        <VideoDetailForm data={data} />
        <SideVideoForm />
      </main>
    </>
  );
};

export default VideoDetailtemplate;
