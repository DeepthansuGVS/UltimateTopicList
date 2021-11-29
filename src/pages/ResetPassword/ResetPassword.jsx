import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import usePasswordValidator from "./usePasswordValidator.js";
import axios from "../../http/api";
import { useParams } from "react-router-dom";
import Loading from "../../Components/Loading";
import { useHistory } from "react-router-dom";
import "./resetpassword.css";

const delay = ms => new Promise(res => setTimeout(res, ms));

function ResetPassword(props) {

  
  const history = useHistory();
  
  const [disabled,setDisabled] = useState(false);
  const [message,setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  
  const {uid, token} = useParams();
  useEffect(() => {
    let res = localStorage.getItem("accessToken");
    if (res) {
      props.setToken(res);
    }
  }, []);
  
  usePasswordValidator({
    min: 8,
    max: 15
  },password,setPassword,passwordError,setPasswordError);

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
        const res = await axios.post("/accounts/users/reset_password_confirm/", {
          new_password : password,
          re_new_password : confirmPassword,
          uid: uid,
          token: token
        })

        setMessage("Password Reset successfully");
        await delay(1500)
        history.push("/login");
        setDisabled(false);
      }
      catch(err){
        setMessage("Invalid Token");
      }


  }
  return (
    <div>
      <form>
        <h3>Reset Password</h3>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="New Password"
        />
        <div className="error">{passwordError}</div>

        <input
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Confirm New Password"
        />
        <div className="error">{confirmPasswordError}</div>
        {confirmPasswordError == "" && passwordError == "" && !disabled ? (
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

export default ResetPassword;