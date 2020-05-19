import React, { Component } from "react";
import Header from "./header";
import UserProfile from "./userProfile";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import PostsPage from "../components/postsPage";
import EditProfile from "../components/editProfile";
import FriendsProfile from "./subcomponents/FriendsProfile";
import BlogPage from "./blogPage";

const BackendURL = "https://you-connect-backend.herokuapp.com";
var flag = false;
export default class mainPage extends Component {
  constructor() {
    super();
    this.state = {
      userData: null,
      isLoggedIn: false,
      isLoggedOut: false,
      selectedFriendData: null,
    };
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

    if (
      window.sessionStorage.getItem("isLoggedIn") === "true" &&
      this.state.userData === null
    ) {
      this.userprofile();
    }
  }

  certainFriendClickHandler = (e, element) => {
    e.cancelBubble = true;
    if (e.stopPropagation()) {
      e.stopPropagation();
    }
    console.log(element);
    this.setState({ selectedFriendData: element });
    this.props.history.push("/main/friendProfile");
  };

  render() {
    console.log(this.state.userData);
    return (
      <div className="mainPage">
        <Header LogoutStatus={this.state.isLoggedOut} flag={flag} />
        <Switch>
          <Route
            path="/main/userprofile"
            exact
            component={(props) => (
              <UserProfile
                {...props}
                userData={this.state.userData}
                logout={this.logoutCLicked}
                FriendClickedHandler={this.certainFriendClickHandler}
              />
            )}
          />
          <Route
            path="/main/friendProfile"
            exact
            component={(props) => (
              <FriendsProfile
                {...props}
                selectedData={this.state.selectedFriendData}
              />
            )}
          />
          <Route
            path="/main"
            exact
            component={(props) => (
              <PostsPage
                {...props}
                userData={this.state.userData}
                LogoutStatus={this.state.isLoggedOut}
              />
            )}
          />
          <Route path="/main/account/edit" exact component={EditProfile} />
          <Route path="/main/blog" exact component={BlogPage} />
        </Switch>
      </div>
    );
  }
}
