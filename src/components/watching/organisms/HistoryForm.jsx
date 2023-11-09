import HistoryCard from "../molecules/HistoryCard";

const HistoryForm = ({ data }) => {
  const videos = data?.data?.data?.response;
  console.log(videos);
  return (
    <>
      <main className="w-full flex flex-col justify-center items-center">
        {videos.map((video, index) => (
          <HistoryCard key={index} video={video} />
        ))}
      </main>
    </>
  );
};

export default HistoryForm;
