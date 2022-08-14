import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { validateEmail } from "./utils";
import usePasswordValidator from "./usePasswordValidator.js";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading";
import { useHistory } from "react-router-dom";

import "./login.css";
import axios from "../../http/api";

const delay = ms => new Promise(res => setTimeout(res, ms));

function Login({token, setToken}) {

  useEffect(() => {
    let res = localStorage.getItem("accessToken");
    if (res) {
      setToken(res);
    }
  }, []);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState("");

  const history = useHistory();

  usePasswordValidator(
    {
      min: 8,
      max: 15,
    },
    password,
    setPassword,
    passwordError,
    setPasswordError
  );

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
      console.log(data);
      if (data.status == 0) {
        setEmailError(`email does not exist`);
      } else {
        if (data.is_active) {
          try {
            const res = await axios.post("/accounts/jwt/create", {
              email,
              password,
            });
            let data = res.data;
            console.log(data);

            localStorage.setItem("accessToken", data.access);
            localStorage.setItem("refreshToken", data.refresh);

            setMessage("Logged in successfully!Redirecting to the Topics Page");
            await delay(1500)
            history.push("/topics");

          } catch (err) {
            console.log("Catch");
            console.log(err.response.data);
            setPasswordError(`Invalid Password`);
          }
        } else {
          try {
            const res = await axios.post("/accounts/users/resend_activation/", {
              email,
            });
            setMessage(`Account not activated, an email is sent for verification!`);
          } catch (err) {
            setMessage(`Oops try after sometime!`);
          }
        }
      }
      setDisabled(false);
    } catch (err) {
      console.log("Should not go here");
    }
  };

  return (
    <div className="login">
      <form>
        <h3>Login to continue</h3>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <div className="error">{emailError}</div>

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <div className="error">{passwordError}</div>

        {emailError == "" && passwordError == "" && !disabled ? (
          <button type="submit" onClick={handleSubmit}>
            Login
          </button>
        ) : !disabled ? (
          <button type="submit" disabled>
            Login
          </button>
        ) : (
          <Loading />
        )}
        
        <div className="forgotPassword">
          <Link to="/resetpassword">forgot password?</Link>
        </div>
      </form>

      <h4>{message}</h4>
    </div>
  );
}

export default Login;
