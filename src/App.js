import React from "react";
import TopicList from "./pages/Topics/TopicList";
import { Route, Link, BrowserRouter, Switch } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Activate from "./pages/Activate/Activate";

function App() {
  return (
    <BrowserRouter>
      <switch>
        <div className="App">
        <Route path="/topics" component={TopicList}></Route>
          <Route path="/signup" component={SignUp}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/activate/:uid/:token" component={Activate}></Route>
        </div>
      </switch>
      <div style={{ position: "fixed", bottom: 5, right: 10 }}>
        Data Credits to{" "}
        <a
          style={{ color: "#FB8C28" }}
          target="blank"
          href="https://codeforces.com/blog/entry/95106"
        >
          YouKnowWho@Codeforces
        </a>
      </div>

      <div style={{ position: "fixed", bottom: 5, left: 10 }}>
        Site Credits to{" "}
        <a
          style={{ color: "cyan" }}
          target="blank"
          href="https://codeforces.com/profile/zenitsu101"
        >
          zenitsu101@Codeforces
        </a>
        ,{" "}
        <a
          style={{ color: "darkblue" }}
          target="blank"
          href="https://github.com/DeepthansuGVS"
        >
          DeepthansuGVS@Github
        </a>
      </div>
    </BrowserRouter>
  );
}

export default App;
