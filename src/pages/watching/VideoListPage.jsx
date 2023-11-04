import React from "react";
import VideoList from "../../components/watching/templates/VideoList";
import UserVideoList from "../../components/watching/templates/UserVideoList";
import Title from "../../components/account/atoms/Title";
const VideoListPage = () => {
  const token = window.localStorage.getItem("token");
  return token ? (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <Title className="mt-20">Videos for you</Title>
        <UserVideoList />
        <Title className="mt-20">Videos by Category</Title>
        <VideoList />
      </div>
    </>
  ) : (
    <VideoList />
  );
};

export default VideoListPage;
