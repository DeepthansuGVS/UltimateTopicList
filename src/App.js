import React from "react";
import TopicList from "./pages/TopicList";


function App() {
  return (
    <div className="App">
      <TopicList></TopicList>
      <div style={{position: "fixed", bottom:5, right:10}}>
        Data Credits to <a style={{color:'#FB8C28'}} target="blank"  href="https://codeforces.com/blog/entry/95106">YouKnowWho@Codeforces</a> 
      </div>

      <div style={{position: "fixed", bottom:5, left:10}}>
        Site Credits to <a style={{color:'cyan'}} target="blank" href="https://codeforces.com/profile/zenitsu101">zenitsu101@Codeforces</a>
        , <a style={{color:'darkblue'}} target="blank" href="https://github.com/DeepthansuGVS">DeepthansuGVS@Github</a>
      </div>

    </div>
    
  );
}

export default App;
