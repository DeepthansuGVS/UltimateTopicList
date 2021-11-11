import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "../../http/api";
import "./activate.css";
import { useParams, useHistory } from 'react-router-dom';

const delay = ms => new Promise(res => setTimeout(res, ms));

function Activate() {
  const {uid,token} = useParams();
  const [message,setMessage] = useState("");
  const history = useHistory()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/accounts/users/activation/",{uid,token})
      setMessage("Account activated successfully redirecting to login!")
      await delay(3000);
      console.log("here");  
      history.push("/login")
    } catch (err) {
      setMessage("Invalid activation token!")
      await delay(3000);
      console.log("here");
      history.push("/activation")
    }
  };
  return (
    <div>
      <form>
        <h3>Click here to activate your Account</h3>
        <button type="submit" onClick={handleSubmit}>
          Activate
        </button>
      </form>
      <h4>{message}</h4>
    </div>
  );
}

export default Activate;
