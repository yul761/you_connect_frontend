import React, { Component } from "react";
import Logo from "../assets/logo.png";

export default class header extends Component {
  burgerNavClicked = () => {
    var navMenu = document.querySelector(".header__navLink");
    navMenu.classList.toggle("burgerNav__Active");

    //burger animation
    var burger = document.querySelector(".header__burgerNav");
    burger.classList.toggle("toggle");
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
        <div className="header__userProfile">
          <div className="header__userProfile--link">User Initial</div>
        </div>
      </div>
    );
  }
}
