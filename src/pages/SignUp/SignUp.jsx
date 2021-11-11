import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { validateEmail } from "./utils";
import usePasswordValidator from "./usePasswordValidator.js";
import axios from "../../http/api";

import "./signup.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [disabled,setDisabled] = useState(false);
  const [success,setSuccess] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");


  usePasswordValidator({
    min: 8,
    max: 15
  },password,setPassword,passwordError,setPasswordError);
  useEffect(
    () => {
      if (!email) {
        setEmailError("");
      } else {
        if (validateEmail(email)) {
          setEmailError("");
        } else {
          setEmailError("Please enter a valid email.");
        }
      }
    },
    [email]
  );

  useEffect(
    () => {
      if (!confirmPassword || !password) {
        setConfirmPasswordError("");
      } else {
        if (password !== confirmPassword) {
          setConfirmPasswordError("The passwords must match.");
        } else {
          setConfirmPasswordError("");
        }
      }
    },
    [password, confirmPassword]
  );

  const handleSubmit = async (e) => {
      e.preventDefault();
      setDisabled(true);
      try{
        const res = await axios.post("/accounts/users/", {
          email : email,
          password : password,
          re_password : confirmPassword
        })

        setSuccess("An activation email is sent to your email account!")
        setDisabled(false);
      }
      catch(err){
        let data = err.response.data
        if(data.email){
          setEmailError("Account already exists!");
        }
        else if(data.password){
          setPasswordError(data.password)
        }
        setDisabled(false);
        console.log(err.response.data)
      }


  }
  return (
    <div>
      <form>
        <h3>Please sign up</h3>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <div className="error">{emailError}</div>

        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <div className="error">{passwordError}</div>

        <input
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Confirm Password"
        />
        <div className="error">{confirmPasswordError}</div>
        {
          
          (emailError==""&&passwordError==""&&confirmPasswordError==""&&!disabled)?(
        <button type="submit" onClick={handleSubmit}>Submit</button>):(
          <button type="submit" disabled>Submit</button>
        )
        }
        </form>
        {success!=""?(<h3>{success}</h3>):(<h3></h3>)}
    </div>
  );

}

export default SignUp;