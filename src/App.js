import React, { useEffect, useState } from "react";
import TopicList from "./pages/Topics/TopicList";
import {
  Route,
  Link,
  BrowserRouter,
  Switch,
  NavLink,
  Redirect,
} from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Activate from "./pages/Activate/Activate";
import SendActivation from "./pages/SendActivation/SendActivation";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home/Home";
import axios from "./http/api"

function App() {
  const [token, setToken] = useState(null);

  
  useEffect(() => {
    const check = async () =>{
      try{
        const res = await axios.post("/accounts/jwt/verify",{
          token
        });
        setToken(token);
      }
      catch(err){
        setToken(null);
        console.log(err.message);
      }
    }
    check();
  }, []);

  return (
    <BrowserRouter>
      <switch>
        <div className="App">
          <Navbar token={token} setToken={setToken} />
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/topics">
            <TopicList token={token} setToken={setToken} />
          </Route>
          <Route path="/signup">
            {token ? <Redirect to="/" /> : <SignUp />}
          </Route>
          <Route path="/login">
            <Login token={token} setToken={setToken} />
          </Route>
          <Route path="/activate/:uid/:token">
            <Activate token={token} setToken={setToken} />
          </Route>
          <Route path="/reactivate">
            <SendActivation />
          </Route>
          <Route path="/resetpassword">
            <ForgotPassword token={token} setToken={setToken} />
          </Route>
          <Route path="/password/reset/confirm/:uid/:token">
            <ResetPassword token={token} setToken={setToken} />
          </Route>
        </div>
      </switch>
    </BrowserRouter>
  );
}

export default App;
