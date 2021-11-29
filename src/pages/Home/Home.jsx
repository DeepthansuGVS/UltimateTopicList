import React from "react";
import "./home.css";
import Feedback from "../../Components/Feedback/Feedback";

function Home() {

  return (
    <div className="home">
      <div className="first">
        <h2 align="left" style={{ marginLeft: "220px" }}>
          <span style={{ color: "black" }}>Ultimate</span>TopicList
        </h2>
        <div className="wrapper">
          <div className="text">
            <div className="content_first"></div>
            <button className="btn btn-primary">
              <a href="/topics" className="getstarted">
                Get Started
              </a>
            </button>
          </div>
          <div className="first_img">
            <img
              className="profile_image"
              src="https://cdn.discordapp.com/attachments/886888441516806157/910590861279100968/images_28.jpeg"
            />
          </div>
        </div>
      </div>
      <div className="second">
        <h2>About</h2>
        <div className="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ducimus
          natus cupiditate quis odio laborum quo, esse, tempora quas deserunt
          culpa maiores voluptate neque veniam sed recusandae sit architecto
          explicabo sint voluptatem eos vitae cum? Quaerat numquam cumque ut?
          Rem dolorem dolor molestiae repellat aut accusamus suscipit voluptate
          beatae explicabo? Expedita error tenetur repellat sed optio,
          perferendis, enim natus, laudantium praesentium inventore at. Soluta
          id fugit distinctio consequatur error ut accusamus? Dolor quis rerum
          autem illo qui itaque ipsam quaerat, quod perferendis, excepturi
          doloremque consequatur quam quidem nobis? Sint, aperiam. Consequatur
          quod odio rerum doloremque incidunt accusamus officiis est vero.
        </div>

        {/* the difficulty description */}
        <table className="border">
          <tr>
            <th className="border">Difficulty</th>
            <th className="border" colSpan="2">
              {" "}
              Description
            </th>
          </tr>
          <tr>
            <td className="border">0</td>
            <td className="border" colSpan="2">
              Consists of basic topics you should be familiar before you start
              CP
            </td>
          </tr>
          <tr>
            <td className="border">1</td>
            <td className="border" colSpan="2">
              Consists of topics you should learn if current codeforces rating
              is 1600−1899
            </td>
          </tr>
          <tr>
            <td className="border">2</td>
            <td className="border" colSpan="2">
              Consists of topics you should learn if current codeforces rating
              is 1900−2399
            </td>
          </tr>
          <tr>
            <td className="border">3</td>
            <td className="border" colSpan="2">
              Consists of topics you should learn if current codeforces rating
              is 2400+
            </td>
          </tr>
        </table>
      </div>
      <div className="third">
        <h2>Contributors</h2>
        <div className="cards">
          <div className="card">
            <div className="img">
              <img
                src="https://otakukart.com/wp-content/uploads/2020/05/rem-anime.jpeg"
                alt=""
              />
            </div>
            <div className="data">
              <h3>
                <a
                  className="orange"
                  href="https://codeforces.com/profile/YouKn0wWho"
                  target="_blank"
                >
                  YouKn0wWho
                </a>
              </h3>
              <p>Author of the Topic List</p>
            </div>
          </div>
          <div className="card">
            <div className="img">
              <img src="https://www.enjpg.com/img/2020/zenitsu-14.jpg" alt="" />
            </div>
            <div className="data">
              <h3>
                <a
                  href="https://codeforces.com/profile/zenitsu101"
                  target="_blank"
                >
                  zenitsu101
                </a>
              </h3>
              <p>Contributed in making the website</p>
            </div>
          </div>
          <div className="card">
            <div className="img">
              <img
                src="https://i.pinimg.com/originals/21/8a/66/218a66106a383f6726e63266e62c0932.png"
                alt=""
              />
            </div>
            <div className="data">
              <h3>
                <a
                  href="https://codeforces.com/profile/DeepthansuGvs"
                  target="_blank"
                >
                  DeepthansuGvs
                </a>
              </h3>
              <p>Contributed in making the website</p>
            </div>
          </div>
        </div>
      </div>
      <div className="feedback second">
        <h2>Feedback</h2>
        <div className="content">
          If you find some link to be broken in the topics section <b>or</b> if you find some issue with the website <b>or</b>  you would have any any improvement/features you would like to suggest , kindly use the feedback form provided below. 
        </div>
        <Feedback />
      </div>
    </div>
  );
}

export default Home;
