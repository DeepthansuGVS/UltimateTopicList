import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { validateEmail } from "./utils.js";
import axios from "../../http/api";
import Loading from "../../Components/Loading";

import "./forgotpassword.css";

function ForgotPassword({token, setToken}) {
  useEffect(() => {
    let res = localStorage.getItem("accessToken");
    if (res) {
      setToken(res);
    }
  }, []);

  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!email) {
      setEmailError("");
    } else {
      if (validateEmail(email)) {
        setEmailError("");
      } else {
        setEmailError("Please enter a valid email.");
      }
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    try {
      const res = await axios.post("/accounts/check/", {
        email,
      });

      let data = res.data;
      if (data.status == 0) {
        setMessage(`The email does not exist`);
      } else {
        if (data.is_active) {
          try{
            const res = await axios.post("/accounts/users/reset_password/", {
                email,
            });

            setMessage("email sent successfully");
            
          }
          catch(err){
            console.log("Should not go here");
          }
        } else {
          setMessage(`Please activate your account first`);
        }
      }
      setDisabled(false);
    } catch (err) {
      console.log("Should not go here");
    }
  };
  return (
    <div>
      <form>
        <h3>Enter your email</h3>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <div className="error">{emailError}</div>

         {emailError == "" && !disabled ? (
          <button type="submit" onClick={handleSubmit}>
             Reset Password
          </button>
        ) : !disabled ? (
          <button type="submit" disabled>
             Reset Password
          </button>
        ) : (
          <Loading />
        )}
      </form>
      {<h3>{message}</h3>}
    </div>
  );
}

export default ForgotPassword;
