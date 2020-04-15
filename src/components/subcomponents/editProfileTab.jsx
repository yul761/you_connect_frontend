import React, { Component } from "react";

const BackendURL = "https://you-connect-backend.herokuapp.com";
export default class editProfileTab extends Component {
  constructor() {
    super();
    this.state = { curUserData: undefined };
  }

  userprofile = () => {
    axios
      .get(`${BackendURL}/userInfo`, {
        headers: { "auth-token": window.sessionStorage.getItem("curToken") },
      })
      .then((response) => {
        // this.setState({ curUser: response.data });
        console.log(response.data);
        this.setState({ curUserData: response.data });
      });
  };
  render() {
    return <div className="editProfileTab"></div>;
  }
}
