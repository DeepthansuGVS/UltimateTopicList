import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles((theme) => ({
  navLinks: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    maxWidth: "1500px",
    margin: "10px auto",
  },
  navBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    
  },
  navLinks: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "18px",
    zIndex: "+1",
  },
  navActive: {
    opacity: 1,
    transform: "translateX(0%)",
  },
  navLink: {
    marginLeft: "30px",
    "&:hover": {
      color: "#2272FF",
    },
    transition: "all .2s ease-in",
    outline: "none",
  },

  landingBottom: {
    position: "absolute",
    bottom: 50,
    left: 5,
  },
  navImg: {
    position: "absolute",
    top: "-40px",
    right: "-30px",
  },
  logo: {
    fontWeight: "700",
    color: "#2272FF",
    fontSize: "28px",
  },
  activeLink: {
    color: "#2272FF",
  },
  burger: {
    display: "none",
    zIndex: "1000",
    marginRight: "30px",
    cursor: "pointer",
    "&>div": {
      width: "25px",
      height: "3px",
      backgroundColor: "rgb(226, 226, 226)",
      margin: "4px",
      zIndex: "1000",
      transition: "all 0.3s ease",
    },
  },

  line2Tog: {
    opacity: 0,
  },

  line1Tog: {
    transform: "rotate(-45deg) translate(-5px, 6px)",
  },

  line3Tog: {
    transform: "rotate(45deg) translate(-5px, -6px)",
  },
}));


function BaseLayout({ token, setToken }) {
  console.log(token);

  
  const classes = useStyles();
  const history = useHistory();
  const burgerNode = useRef(null);
  const burger2 = useRef(null);
  const line1Node = useRef(null);
  const line2Node = useRef(null);
  const line3Node = useRef(null);
  const [loggedIn, setLoggedIn] = useState(false);  
  
  useEffect(() => {
    if(token)setLoggedIn(true)
    else setLoggedIn(false)

  }, [token])
  const handleLogout = (e) => {
    localStorage.clear();
    window.location.pathname = '/'
  };

  const navSlide = () => {
    let node = burgerNode.current;
    node.classList.toggle(classes.navActive);
    let navLinks = document.querySelectorAll(classes.navLink);

    node.childNodes.forEach((link, index) => {
      link.style.animation = link.style.animation
        ? ""
        : `navLinkFade 0.6s ease forwards ${index / 7 + 0.3}s`;
    });

    let node2 = burger2.current;
    node2.classList.toggle("cross");

    let nodeline1 = line1Node.current;
    nodeline1.classList.toggle(classes.line1Tog);

    let nodeline2 = line2Node.current;
    nodeline2.classList.toggle(classes.line2Tog);

    let nodeline3 = line3Node.current;
    nodeline3.classList.toggle(classes.line3Tog);
  };

  return (
    <div style={{ position: "relative", OverflowX: "hidden" }}>
      <div className={classes.container}>
        <nav className={classes.navBar}>
          <div
            className={classes.logoDiv}
            onClick={() => {
              let cross = document.getElementsByClassName("cross");
              console.log(cross);
              if (cross.length) {
                burger2.current.click();
              }
            }}
          >
            <NavLink to="/">
              <h1 className={classes.logo}>UltimateTopicList</h1>
            </NavLink>
          </div>
          <div
            className={classes.navLinks}
            ref={burgerNode}
            onClick={() => {
              burger2.current.click();
            }}
          >
            <NavLink
              activeClassName={classes.activeLink}
              to="/topics"
              className={classes.navLink}
            >
              Topics
            </NavLink>
            {!loggedIn ? (
            <NavLink
              activeClassName={classes.activeLink}
              to="/signup"
              className={classes.navLink}
            >
              Sign up
            </NavLink>
            ): (
              <></>
            )}
            {loggedIn ? (
              <NavLink
                activeClassName={classes.activeLink}
                to="/logout"
                className={classes.navLink}

                onClick={handleLogout}
              >
                Logout
              </NavLink>
            ) : (
              <NavLink
                activeClassName={classes.activeLink}
                to="/login"
                className={classes.navLink}

              >
                Login
              </NavLink>
            )}
          </div>
          <div className={classes.burger} onClick={navSlide} ref={burger2}>
            <div className={classes.line1} ref={line1Node}></div>
            <div className={classes.line2} ref={line2Node}></div>
            <div className={classes.line3} ref={line3Node}></div>
          </div>
        </nav>
      </div>
      <div className={classes.navHorLine}></div>
    </div>
  );
}

export default BaseLayout;
