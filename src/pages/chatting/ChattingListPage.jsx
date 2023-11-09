import { Suspense, useEffect, useState } from "react";
import PublicChannelList from "../../components/chatting/channelList/PublicChannelList";
import JoinedChannelList from "../../components/chatting/channelList/JoinedChannelList";
import { useAtomValue, useSetAtom } from "jotai";
import {
  currentChannelTypeAtom,
  userIdAtom,
  userNameAtom,
  userProfileImageUrlAtom,
} from "../../store/chatting/chatting";
import { login } from "../../apis/chatting/talkplus";
import Tabs from "../../components/chatting/channelList/Tabs";
import CreateChannelModal from "../../components/chatting/modal/CreateChannelModal";
import Fallback from "../../components/common/Fallback";
import Loader from "../../components/common/Loader";
import ChannelListItemSkeletons from "../../components/chatting/skeleton/ChannelListItemSkeletons";
import Error from "../../components/common/Error";

const ChattingListPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const channelType = useAtomValue(currentChannelTypeAtom);

  const setUserId = useSetAtom(userIdAtom);
  const setUserProfileImageUrl = useSetAtom(userProfileImageUrlAtom);
  const setUserName = useSetAtom(userNameAtom);

  const handleLogin = () => {
    login()
      .then((res) => {
        setUserId(res.id);
        setUserProfileImageUrl(res.profileImageUrl);
        setUserName(res.username);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <Fallback
      Loader={Loader}
      Error={Error}
      errorMessage="Failed to load chatting list page"
    >
      <div className="w-[58rem] mx-auto my-16 flex flex-col space-y-5">
        <CreateChannelModal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
        <section className="flex flex-col gap-6 w-[1000px]">
          <h1 className="inline-block text-4xl font-bold text-green-700">
            Chat List
          </h1>
          <Tabs handleModalOpen={() => setModalIsOpen(true)} />
            <Fallback
              Loader={ChannelListItemSkeletons}
              Error={Error}
              errorMessage="Failed to load channel list"
            >
          {channelType === "Public" ? (
            <PublicChannelList />
          ) : (
            <JoinedChannelList />
          )}
            </Fallback>
        </section>
      </div>
    </Fallback>
  );
};
export default ChattingListPage;
