import React from "react";
import "./SetAvatar.css";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const SetAvatar = () => {
  const navigate = useNavigate();

  const setAvatarClickHandler = (url) => {
    // console.log(url);
    axios
      .patch("http://localhost:5000/api/v1/user/setavatar", {
        avatarurl: url,
      })
      .then((res) => {
        // console.log(res.data);
        navigate("/chat");
        toast("Avatar set!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          type: "success",
        });
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
    <Card className="select-avatar-container">
      <h1>Select an avatar</h1>
      <div className="select-avatar">
        {[...Array(4)].map(() => {
          const imageId = uuidv4();
          const url = `https://api.multiavatar.com/${imageId}.png`;
          return (
            <img
              src={url}
              key={imageId}
              alt={imageId}
              onClick={() => {
                setAvatarClickHandler(url);
              }}
            />
          );
        })}
      </div>
    </Card>
  );
};

export default SetAvatar;
