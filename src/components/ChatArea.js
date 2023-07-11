import React, { useEffect, useState, useRef } from "react";
import "./ChatArea.css";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import axios from "axios";
import { toast } from "react-toastify";

const ChatArea = ({ activeChat, socket, user }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (activeChat) {
      axios
        .post("http://localhost:5000/api/v1/getmsg", { to: activeChat._id })
        .then((res) => {
          setMessages(res.data.messages);
        })
        .catch((error) => {
          // console.log(error);
          toast(error.response.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            type: "error",
          });
        });
    }
  }, [activeChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  const isSendedbyuser = (message) => {
    if (message.to.toString() === activeChat._id.toString()) {
      return true;
    }
    return false;
  };

  return (
    <div className="chat-area">
      {activeChat ? (
        <>
          <ChatHeader user={activeChat} />
          <div className="chat-box">
            {messages.map((message) => {
              return (
                <div key={message._id}>
                  <div
                    className={`${
                      isSendedbyuser(message) ? "sended" : "received"
                    }`}
                  >
                    <p className="message">{message.text}</p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
          <ChatInput
            activeChat={activeChat}
            socket={socket}
            setMessages={setMessages}
          />
        </>
      ) : (
        <p style={{ color: "white", fontSize: "1.5rem" }}>
          Hey {user.username}, welcome to the chat application
        </p>
      )}
    </div>
  );
};

export default ChatArea;
