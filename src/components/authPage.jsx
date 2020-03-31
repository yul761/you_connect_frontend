import React, { Component } from "react";
import axios from "axios";

const BackendURL = "http://3.15.233.84:4000";
export default class authPage extends Component {
  constructor() {
    super();
    this.state = {};
  }

  SignUp = e => {
    e.preventDefault();
    let username = e.target.username.value;
    let email = e.target.email.value;
    let password = e.target.password.value;
    let Confirmpassword = e.target.Confirmpassword.value;

    if (password !== Confirmpassword) {
      window.confirm("Error : Password do not match");
    } else {
      let profile = {
        username: username,
        email: email,
        password: password
      };

      axios.post(`${BackendURL}/auth/signup`, profile).then(response => {
        console.log(response);
        // redirect back to main page after successfully signup
        this.props.history.push("/");
      });

      // route to another page after successful sign up
    }
  };

  LogIn = e => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    let profile = {
      email: email,
      password: password
    };

    axios.post(`${BackendURL}/auth/login`, profile).then(response => {
      console.log(response);
      // store secret token into browser session storage to stay login before browser is closed
      window.sessionStorage.setItem("curToken", response.data.accesstoken);
      window.sessionStorage.setItem("isLoggedIn", true);
      // redirect back to main page after successfully login
      this.props.history.push("/");
    });

    //route to user profile page after successful login
  };

  render() {
    return (
      <div className="authPage">
        <div className="authPage__logo">
          {/* <img
            className="authPage__logo--icon"
            alt="this is the you connect logo"
            src={Logo}
          ></img> */}
          <label className="authPage__logo--icon">YouConnect</label>
        </div>
        <div className="authPage__title">Welcome to YouConnect</div>
        {/* Login Section */}
        <form className="authPage__login" onSubmit={e => this.LogIn(e)}>
          <label className="authPage__login--email">E-mail</label>
          <input
            className="authPage__login--emailInput"
            name="email"
            type="email"
          />
          <label className="authPage__login--password">Password</label>
          <input
            className="authPage__login--passwordInput"
            name="password"
            type="password"
          />
          <input
            className="authPage__login--loginSubmit"
            type="submit"
            value="Log In"
          />
        </form>

        {/* Signup Section */}
        <form className="authPage__signup" onSubmit={e => this.SignUp(e)}>
          <label className="authPage__signup--username">User Name</label>
          <input
            className="authPage__signup--usernameInput"
            name="username"
            type="text"
          />
          <label className="authPage__signup--email">E-mail</label>
          <input
            className="authPage__signup--emailInput"
            name="email"
            type="email"
          />
          <label className="authPage__signup--password">Password</label>
          <input
            className="authPage__signup--passwordInput"
            name="password"
            type="password"
          />
          <label className="authPage__signup--Confirmpassword">
            Confirm Password
          </label>
          <input
            className="authPage__signup--ConfirmpasswordInput"
            name="Confirmpassword"
            type="password"
          />
          <input
            className="authPage__signup--signupSubmit"
            type="submit"
            value="Sign Up"
          />
        </form>

        {/* Ask to register if not yet section */}
        <div className="authPage__divideLine">
          <hr />
        </div>

        <div className="authPage__askToRegister">
          New to YouConnect?
          <div
            className="authPage__askToRegister--button"
            onClick={() => {
              console.log("Go to register section");
              document.getElementsByClassName(
                "authPage__login"
              )[0].style.display = "none";
              document.getElementsByClassName(
                "authPage__divideLine"
              )[0].style.display = "none";
              document.getElementsByClassName(
                "authPage__signup"
              )[0].style.display = "flex";
              document.getElementsByClassName(
                "authPage__title"
              )[0].style.height = "14%";
              document.getElementsByClassName(
                "authPage__title"
              )[0].style.padding = "6%";
              document.getElementsByClassName(
                "authPage__askToRegister"
              )[0].style.display = "none";
              document.getElementsByClassName(
                "authPage__backToLogin"
              )[0].style.display = "flex";
            }}
          >
            Create Account
          </div>
        </div>

        {/* Back to login section button */}
        <div className="authPage__backToLogin">
          Already a member?
          <div
            className="authPage__backToLogin--button"
            onClick={() => {
              console.log("Go to login section");
              document.getElementsByClassName(
                "authPage__signup"
              )[0].style.display = "none";
              document.getElementsByClassName(
                "authPage__divideLine"
              )[0].style.display = "flex";
              document.getElementsByClassName(
                "authPage__login"
              )[0].style.display = "flex";
              document.getElementsByClassName(
                "authPage__title"
              )[0].style.height = "15%";
              document.getElementsByClassName(
                "authPage__title"
              )[0].style.padding = "8%";
              document.getElementsByClassName(
                "authPage__askToRegister"
              )[0].style.display = "flex";
              document.getElementsByClassName(
                "authPage__backToLogin"
              )[0].style.display = "none";
            }}
          >
            Log in now
          </div>
        </div>
      </div>
    );
  }
}
