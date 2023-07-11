import React, { useContext } from "react";
import { BiPowerOff } from "react-icons/bi";
import AuthContext from "../utils/AuthContext";
import "./Contact.css";

const Contact = ({ user, classes, setActiveChat }) => {
  const { logoutUser } = useContext(AuthContext);
  const logoutHandler = () => {
    logoutUser();
  };
  return (
    <div
      className={`${classes} contact-container`}
      onClick={() => {
        if (!classes) {
          setActiveChat(user);
        }
      }}
    >
      <img src={user.avatar.url} alt={`${user.username}-avatar`} />
      <h3>{user.username}</h3>
      {classes && <BiPowerOff className="logout-btn" onClick={logoutHandler} />}
    </div>
  );
};

export default Contact;
