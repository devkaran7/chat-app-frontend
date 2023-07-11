import React, { useState } from "react";
import "./FormInput.css";
import { validate } from "../utils/Validators";

const FormInput = (props) => {
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const errorStyles = {
    backgroundColor: "rgb(253, 173, 164)",
    border: "3px solid red",
    color: "red",
  };

  const textChangeHandler = (event) => {
    const validity = validate(event.target.value, props.validators);
    props.changeHandler(event, validity);
    setIsValid(validity);
  };

  const blurHandler = () => {
    setIsTouched(true);
  };

  return (
    <div className="input-container">
      <input
        type={props.type}
        name={props.name}
        placeholder={props.name}
        onChange={textChangeHandler}
        onBlur={blurHandler}
        style={isTouched && !isValid ? errorStyles : undefined}
      />
      <span
        className="error-text"
        style={
          isTouched && !isValid ? { display: "block" } : { display: "none" }
        }
      >
        {props.errorText}
      </span>
    </div>
  );
};

export default FormInput;
