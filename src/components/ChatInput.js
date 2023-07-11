import React, { useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import "./ChatInput.css";
import axios from "axios";
import { toast } from "react-toastify";

const ChatInput = ({ activeChat, socket, setMessages }) => {
  const [message, setMessage] = useState("");
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setMessages((prev) => {
          return [...prev, msg];
        });
      });
    }
  }, [socket]);

  const sendMessageHandler = (event) => {
    event.preventDefault();
    if (message.trim().length === 0) {
      return toast("message must not be empty", {
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
    }
    axios
      .post("http://localhost:5000/api/v1/addmsg", {
        text: message,
        to: activeChat._id,
      })
      .then((res) => {
        socket.current.emit("send-msg", res.data.message);
        setMessages((prev) => {
          return [...prev, res.data.message];
        });
        setMessage("");
        setIsEmojiPickerVisible(false);
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
  };

  return (
    <form
      autoComplete="off"
      className="chat-input-container"
      onSubmit={sendMessageHandler}
    >
      <div className="emoji-picker">
        {isEmojiPickerVisible && (
          <EmojiPicker
            theme="dark"
            emojiStyle="google"
            width="30rem"
            height="30rem"
            onEmojiClick={(emoji) => {
              setMessage((prev) => prev + emoji.emoji);
            }}
          />
        )}
      </div>

      <BsEmojiSmileFill
        className="emoji-btn"
        onClick={() => {
          setIsEmojiPickerVisible((prev) => !prev);
        }}
      />
      <input
        type="text"
        id="message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button type="submit">
        <IoMdSend />
      </button>
    </form>
  );
};

export default ChatInput;
