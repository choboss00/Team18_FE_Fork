import { useSetAtom } from "jotai";
import { getPublicChannels } from "../../../apis/chatting/talkplus";
import { useInfiniteQuery } from "@tanstack/react-query";
import { channelIdAtom } from "../../../store/chatting/chatting";
import ChannelListItem from "./ChannelListItem";
import { useEffect, useState } from "react";
import ChannelDetailModal from "../modal/ChannelDetailModal";
import { useInView } from "react-intersection-observer";
import SearchInput from "./SearchInput";
import useDebounce from "../../../hooks/useDebounce";

const PublicChannelList = () => {
  const setChannelId = useSetAtom(channelIdAtom);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { ref, inView } = useInView();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const handleModalOpen = (id) => {
    setChannelId(id);
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setChannelId("");
    setModalIsOpen(false);
  };

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["publicChannels", debouncedSearchValue],
      ({ pageParam = "" }) =>
        getPublicChannels({ pageParam, searchValue: debouncedSearchValue }),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage.length === 0) return undefined;
          if (!lastPage?.hasNext) return undefined;
          const lastChannelId =
            lastPage.channels[lastPage.channels.length - 1].id;
          return lastChannelId;
        },
      }
    );

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, fetchNextPage, hasNextPage]);

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;

  return (
    <>
      <ChannelDetailModal
        modalIsOpen={modalIsOpen}
        handleModalClose={handleModalClose}
      />
      <p className="font-bold text-2xl">Public Channel List</p>
      <SearchInput
        value={searchValue}
        onChange={setSearchValue}
        placeholder="Search by TAG"
      />
      <div className="w-full h-[90%] overflow-y-scroll scrollbar-hide bg-white">
        {data.pages.map((page, index) => (
          <div key={index}>
            {page?.channels &&
              page.channels.map((channel) => (
                <section
                  key={channel.id}
                  className="flex justify-between border-b-2 p-2"
                  onClick={() => handleModalOpen(channel.id)}
                >
                  <ChannelListItem data={channel} />
                </section>
              ))}
          </div>
        ))}
      </div>
      <div ref={ref}></div>
    </>
  );
};
export default PublicChannelList;
