import React, { useState, useContext } from "react";
import Card from "../components/Card";
import FormInput from "../components/FormInput";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
} from "../utils/Validators";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../utils/AuthContext";
import { toast } from "react-toastify";

const Register = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: {
      value: "",
      valid: false,
    },
    email: {
      value: "",
      valid: false,
    },
    password: {
      value: "",
      valid: false,
    },
    confirmPassword: {
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
      if (v === "confirmPassword" && data.password !== values[v].value) {
        return toast("Passwords should match", {
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
      .post("http://localhost:5000/api/v1/user/register", data)
      .then((res) => {
        // console.log(res.data);
        loginUser(res.data.token, res.data.user._id);
        navigate("/setavatar");
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
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_MINLENGTH(4),
            VALIDATOR_MAXLENGTH(12),
          ]}
          errorText="Please enter your username (4 - 12 characters)"
        />
        <FormInput
          name="email"
          type="email"
          changeHandler={changeHandler}
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email"
        />
        <FormInput
          name="password"
          type="password"
          changeHandler={changeHandler}
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_MINLENGTH(8),
            VALIDATOR_MAXLENGTH(16),
          ]}
          errorText="Please enter your password (8 - 16 characters)"
        />
        <FormInput
          name="confirmPassword"
          type="password"
          changeHandler={changeHandler}
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_MINLENGTH(8),
            VALIDATOR_MAXLENGTH(16),
          ]}
          errorText="Please enter your password once again"
        />
        <button type="submit" className="auth-btn">
          Create User
        </button>
      </form>
      <p>
        ALREADY HAVE AN ACCOUNT? <Link to="/login">LOGIN</Link>
      </p>
    </Card>
  );
};

export default Register;
