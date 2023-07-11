import React from "react";

import "./ChatHeader.css";

const ChatHeader = ({ user }) => {
  return (
    <div className="chat-header">
      <img src={user.avatar.url} alt={`${user.username}-avatar`} />
      <h2>{user.username}</h2>
    </div>
  );
};

export default ChatHeader;
