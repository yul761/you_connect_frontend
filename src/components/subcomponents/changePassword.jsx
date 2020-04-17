import React, { Component } from "react";
import axios from "axios";

const BackendURL = "https://you-connect-backend.herokuapp.com";
export default class changePassword extends Component {
  constructor() {
    super();
    this.state = { curUserData: undefined };
  }

  componentDidMount() {
    this.userprofile();
  }

  userprofile = () => {
    axios
      .get(`${BackendURL}/userInfo`, {
        headers: { "auth-token": window.sessionStorage.getItem("curToken") },
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ curUserData: response.data }, () => {});
      });
  };

  render() {
    if (this.state.curUserData === undefined) {
      return (
        <div className="changePassword">
          <div className="changePassword__loader"></div>
        </div>
      );
    } else {
      return (
        <div className="changePassword">
          <div className="changePassword__username">
            <label className="changePassword__username--label">
              {this.state.curUserData.username}
            </label>
          </div>
          <form className="changePassword__form">
            <div className="changePassword__form--oldPW">
              <label className="changePassword__form--oldPW--label">
                Old Password{" "}
              </label>
              <input
                className="changePassword__form--oldPW--input"
                type="text"
                name="oldpw"
              />
            </div>
            <div className="changePassword__form--newPW">
              <label className="changePassword__form--newPW--label">
                New Password{" "}
              </label>
              <input
                className="changePassword__form--newPW--input"
                type="text"
                name="newpw"
              />
            </div>
            <div className="changePassword__form--newPWConfirm">
              <label className="changePassword__form--newPWConfirm--label">
                Confirm New Password{" "}
              </label>
              <input
                className="changePassword__form--newPWConfirm--input"
                type="text"
                name="newpwconfirm"
              />
            </div>
            <div className="changePassword__form--submit">
              <input
                className="changePassword__form--submit--button"
                type="submit"
                value="Submit"
              />
            </div>
          </form>
        </div>
      );
    }
  }
}
