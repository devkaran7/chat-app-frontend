import React, { useContext, useState } from "react";
import "./Login.css";
import Card from "../components/Card";
import FormInput from "../components/FormInput";
import { VALIDATOR_REQUIRE } from "../utils/Validators";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../utils/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: {
      value: "",
      valid: false,
    },
    password: {
      value: "",
      valid: false,
    },
  });

  const changeHandler = (event, valid) => {
    setValues({
      ...values,
      [event.target.name]: {
        value: event.target.value,
        valid: valid,
      },
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const data = {};
    for (const v in values) {
      if (values[v].valid === false) {
        return toast("Inputs are not valid", {
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
      data[v] = values[v].value;
    }
    axios
      .post("http://localhost:5000/api/v1/user/login", data)
      .then((res) => {
        // console.log(res.data);
        loginUser(res.data.token, res.data.user._id);
        if (res.data.user.avatar.isSet === false) {
          navigate("/setavatar");
        } else {
          navigate("/chat");
        }
        toast("Welcome!", {
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
    <Card className="auth-container">
      <h1>CHAT APP</h1>
      <form onSubmit={submitHandler}>
        <FormInput
          name="username"
          type="text"
          changeHandler={changeHandler}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter your username"
        />
        <FormInput
          name="password"
          type="password"
          changeHandler={changeHandler}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter your password"
        />
        <button type="submit" className="auth-btn">
          Login
        </button>
      </form>
      <p>
        DON'T HAVE AN ACCOUNT? <Link to="/register">REGISTER</Link>
      </p>
    </Card>
  );
};

export default Login;
