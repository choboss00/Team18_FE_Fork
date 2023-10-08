import { useState } from "react";

import "./community.css";
import "./theme.css";
import {
  OpenChannel,
  OpenChannelSettings,
  SendBirdProvider,
} from "@sendbird/uikit-react";
import CommunityChannelListWithSendBird from "./openChannel/CommunityChannelList";
import ChannelList from "@sendbird/uikit-react/ChannelList";
import { ChannelListProvider } from "@sendbird/uikit-react/ChannelList/context";

export default function Community({ appId, userId, theme, nickname }) {
  const [showSettings, setShowSettings] = useState(false);
  const [currentChannel, setCurrentChannel] = useState(null);
  const currentChannelUrl = currentChannel ? currentChannel.url : "";
  return (
    <SendBirdProvider
      appId={appId}
      userId={userId}
      theme={theme}
      nickname={nickname}
    >
      <div className="community-app">
        <ChannelListProvider>
          <ChannelList />
        </ChannelListProvider>
        <div className="channel-list">
          <CommunityChannelListWithSendBird
            currentChannelUrl={currentChannelUrl}
            setCurrentChannel={setCurrentChannel}
          />
        </div>
        <div className="community-open-channel">
          <OpenChannel
            channelUrl={currentChannelUrl}
            onChatHeaderActionClick={() => {
              setShowSettings(true);
            }}
          />
        </div>
        {showSettings && (
          <OpenChannelSettings
            channelUrl={currentChannelUrl}
            onCloseClick={() => {
              setShowSettings(false);
            }}
          />
        )}
      </div>
    </SendBirdProvider>
  );
}
