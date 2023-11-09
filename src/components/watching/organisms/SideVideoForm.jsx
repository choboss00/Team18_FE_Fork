import Title from "../../account/atoms/Title";
import VideoCard from "../molecules/VideoCard";

const SideVideoForm = ({ data }) => {
  return (
    <>
      <div className="h-full w-full space-y-6 overflow-y-auto">
        <div className="w-full flex flex-col items-center">
          <Title className="mt-10 text-xl">Recommended Video</Title>
          {data.map((video, index) => (
            <VideoCard
              className="relative max-w-[80%] -left-2"
              key={index}
              video={video}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SideVideoForm;
