import React, { Component } from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";

const BackendURL = "http://3.15.233.84:4000";

export default class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserProfile: false,
      userData: null,
      usernameInitial: null
    };
  }
  burgerNavClicked = () => {
    var navMenu = document.querySelector(".header__navLink");
    navMenu.classList.toggle("burgerNav__Active");

    //burger animation
    var burger = document.querySelector(".header__burgerNav");
    burger.classList.toggle("toggle");
  };

  userprofile = () => {
    axios
      .get(`${BackendURL}/userInfo`, {
        headers: { "auth-token": window.sessionStorage.getItem("curToken") }
      })
      .then(response => {
        // this.setState({ curUser: response.data });
        console.log(response.data);
        this.setState({ userData: response.data });
      });
  };

  componentDidMount() {
    console.log(window.sessionStorage.getItem("isLoggedIn"));
    console.log(this.state);
    if (window.sessionStorage["isLoggedIn"]) {
      this.userprofile();
    }

    this.setState({
      showUserProfile: window.sessionStorage.getItem("isLoggedIn")
    });
    console.log(this.state.userData);
  }

  //   static getDerivedStateFromProps(props, state) {
  //     return { userData: props.userData };
  //   }
  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.showUserProfile);
    this.ifShowUserProfile();
    console.log(this.state.userData);
    this.formatUsernameInitial();
  }

  formatUsernameInitial = () => {
    if (this.state.userData !== null && this.state.usernameInitial === null) {
      let username = this.state.userData.username;
      let Initial = username.split("")[0].toUpperCase();
      this.setState({ usernameInitial: Initial });
    }
  };

  ifShowUserProfile = () => {
    if (this.state.showUserProfile) {
      // already logged in and should show user profile
      document.querySelector(".header__userProfile").style.display = "flex";
      document.querySelector(".header__login").style.display = "none";
    }
  };

  render() {
    return (
      <div className="header">
        <div
          className="header__burgerNav"
          onClick={() => this.burgerNavClicked()}
        >
          <div className="header__burgerNav--line line1"></div>
          <div className="header__burgerNav--line line2"></div>
          <div className="header__burgerNav--line line3"></div>
        </div>
        <div className="header__logo">
          <img
            className="header__logo--icon"
            src={Logo}
            alt="this is the Initial logo"
          ></img>
        </div>
        <ul className="header__navLink">
          <ol className="header__navLink--home">HOME</ol>
          <ol className="header__navLink--about">ABOUT</ol>
        </ul>
        <div className="header__login">
          <Link className="header__login--link" to="/login">
            <div className="header__login--link--initial">Log In</div>
          </Link>
        </div>

        <div className="header__userProfile">
          <Link className="header__userProfile--link" to="/main/userprofile">
            <div className="header__userProfile--link--initial">
              {this.state.usernameInitial}
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
