import React, { Component } from "react";
import Header from "./header";
import UserProfile from "./userProfile";
import axios from "axios";
import { Switch, Route } from "react-router-dom";

const BackendURL = "http://3.15.233.84:4000";
export default class mainPage extends Component {
  constructor() {
    super();
    this.state = { userData: null, isLoggedIn: false };
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

  componentDidUpdate(prevProps, prevState) {
    if (
      window.sessionStorage.getItem("isLoggedIn") &&
      this.state.userData === null
    ) {
      this.userprofile();
    }
  }

  render() {
    return (
      <div className="mainPage">
        <Header userData={this.state.userData} />
        <Switch>
          <Route path="/main/userprofile" component={UserProfile} />
        </Switch>
      </div>
    );
  }
}
