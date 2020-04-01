import React, { Component } from "react";
import Header from "./header";
import UserProfile from "./userProfile";
import axios from "axios";
import { Switch, Route } from "react-router-dom";

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
        headers: { "auth-token": window.sessionStorage.getItem("curToken") }
      })
      .then(response => {
        // this.setState({ curUser: response.data });
        console.log(response.data);
        this.setState({ userData: response.data });
      });
  };

  componentDidMount() {
    flag = false;
  }

  logoutCLicked = () => {
    window.sessionStorage.setItem("isLoggedIn", false);
    this.setState({ isLoggedOut: true });
    flag = true;
    this.props.history.push("/main");
    console.log("Log out clicked");
  };

  componentDidUpdate(prevProps, prevState) {
    flag = false;
    if (
      window.sessionStorage.getItem("isLoggedIn") === "true" &&
      this.state.userData === null
    ) {
      this.userprofile();
    }
  }

  render() {
    return (
      <div className="mainPage">
        <Header LogoutStatus={this.state.isLoggedOut} flag={flag} />
        <Switch>
          <Route
            path="/main/userprofile"
            render={props => (
              <UserProfile
                {...props}
                userData={this.state.userData}
                logout={this.logoutCLicked}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
