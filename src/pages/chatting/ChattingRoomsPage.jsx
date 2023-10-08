import Community from "../../components/chatting/Community";
import SearchInput from "../../components/chatting/SearchInput";

const ChattingRoomsPage = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center w-[1000px]">
        <SearchInput />
        <Community
          appId="77E9161E-6470-4E08-9329-E7A148215547"
          userId="hoon001"
          nickname="hoon001"
        />
      </div>
    </div>
  );
};

export default ChattingRoomsPage;
