import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../utils/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Chat.css";
import Contact from "../components/Contact";
import ChatArea from "../components/ChatArea";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

const Chat = () => {
  const socket = useRef();
  const [user, setUser] = useState();
  const [activeChat, setActiveChat] = useState();
  const [contacts, setContacts] = useState([]);
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/users")
      .then((res) => {
        const tempUser = res.data.users.find(
          (u) => u._id.toString() === userId.toString()
        );
        if (tempUser.avatar.isSet === false) {
          return navigate("/setavatar", { replace: true });
        }
        setUser(tempUser);
        setContacts(
          res.data.users.filter((u) => u._id.toString() !== userId.toString())
        );
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
  }, [userId, navigate]);

  useEffect(() => {
    if (user) {
      socket.current = io("http://localhost:5000");
      socket.current.emit("add-user", user._id);
    }
  }, [user]);

  return (
    <div className="chat-container">
      <div className="contacts-area">
        <h2>CHAT APP</h2>
        <div className="contacts">
          {contacts.map((u) => {
            return (
              <Contact key={u._id} user={u} setActiveChat={setActiveChat} />
            );
          })}
        </div>
        <div className="user-contact">
          {user && <Contact user={user} classes="user-contact-container" />}
        </div>
      </div>
      {user && <ChatArea activeChat={activeChat} socket={socket} user={user} />}
    </div>
  );
};

export default Chat;
