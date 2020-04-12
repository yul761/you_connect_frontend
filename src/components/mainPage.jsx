import React, { Component } from "react";
import Header from "./header";
import UserProfile from "./userProfile";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import PostsPage from "../components/postsPage";

const BackendURL = "http://3.15.233.84:4000";
var flag = false;

export default class mainPage extends Component {
  constructor() {
    super();
    this.state = { userData: null, isLoggedIn: false, isLoggedOut: false };
  }

  userprofile = () => {
    axios
      .get(`${BackendURL}/userInfo`, {
        headers: { "auth-token": window.sessionStorage.getItem("curToken") },
      })
      .then((response) => {
        // this.setState({ curUser: response.data });
        console.log(response.data);
        this.setState({ userData: response.data }, () => {
          console.log("userData setstate finished");
        });
      });
  };

  componentDidMount() {
    flag = false;
  }

  logoutCLicked = () => {
    window.sessionStorage.setItem("isLoggedIn", false);
    window.sessionStorage.removeItem("curToken");
    this.setState({ isLoggedOut: true });
    flag = true;
    this.props.history.push("/main");
    console.log("Log out clicked");
  };

  componentDidUpdate(prevProps, prevState) {
    flag = false;
    console.log(window.sessionStorage.getItem("isLoggedIn") === "true");
    console.log(this.state.userData === null);
    console.log(prevProps.location.pathname);
    console.log(this.props.location.pathname);
    this.props.history.listen((location, action) => {
      console.log(location.pathname);
      if (location.pathname === "/main") {
        console.log(window.sessionStorage.getItem("isLoggedIn") === "true");
        console.log(this.state.userData === null);
        if (
          window.sessionStorage.getItem("isLoggedIn") === "true" &&
          this.state.userData === null
        ) {
          this.userprofile();
        }
      }
    });

    if (
      window.sessionStorage.getItem("isLoggedIn") === "true" &&
      this.state.userData === null
    ) {
      this.userprofile();
    }
  }

  render() {
    console.log(this.state.userData);
    return (
      <div className="mainPage">
        <Header LogoutStatus={this.state.isLoggedOut} flag={flag} />
        <Switch>
          <Route
            path="/main/userprofile"
            component={(props) => (
              <UserProfile
                {...props}
                userData={this.state.userData}
                logout={this.logoutCLicked}
              />
            )}
          />
          <Route
            path="/main"
            component={(props) => (
              <PostsPage
                {...props}
                userData={this.state.userData}
                LogoutStatus={this.state.isLoggedOut}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
