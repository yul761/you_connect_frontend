import React, { Component } from "react";
import axios from "axios";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

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

  notificationHandler = (success, content) => {
    if (success === false) {
      store.addNotification({
        title: "Opps!",
        // message: "Your two new password inputs are not the same ",
        message: { content },
        type: "default", // 'default', 'success', 'info', 'warning'
        container: "top-center", // where to position the notifications
        animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
        animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
        width: 500,
        dismiss: {
          duration: 3000,
        },
      });
    } else if (success === true) {
      store.addNotification({
        title: "Yes!",
        // message: "Your password is updated ",
        message: { content },
        type: "default", // 'default', 'success', 'info', 'warning'
        container: "top-center", // where to position the notifications
        animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
        animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
        width: 500,
        dismiss: {
          duration: 3000,
        },
      });
    }
  };

  changePasswordHandler = (e) => {
    e.preventDefault();
    let oldPassword = e.target.oldpw.value;
    let newPassword = e.target.newpw.value;
    let confirmNewPassword = e.target.newpwconfirm.value;

    if (newPassword !== confirmNewPassword) {
      console.log("New passwords are not the same");
      this.notificationHandler(
        false,
        "Your two new password inputs are not the same "
      );
    } else {
      var input = { oldpw: oldPassword, newpw: newPassword };
      var postOption = {
        method: "POST",
        url: `${BackendURL}/auth/changepw`,
        data: input,
        headers: {
          "auth-token": window.sessionStorage.getItem("curToken"),
        },
      };

      axios(postOption)
        .then((response) => {
          console.log(response.data);
          this.notificationHandler(true, "Your password is updated ");
        })
        .catch((error) => {
          if (error.response.status === 400) {
            console.log("Old password does not match");
            this.notificationHandler(
              false,
              "Your old password does not match "
            );
          }
        });
    }
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
          <form
            className="changePassword__form"
            onSubmit={(e) => this.changePasswordHandler(e)}
          >
            <div className="changePassword__form--oldPW">
              <label className="changePassword__form--oldPW--label">
                Old Password{" "}
              </label>
              <input
                className="changePassword__form--oldPW--input"
                type="password"
                name="oldpw"
              />
            </div>
            <div className="changePassword__form--newPW">
              <label className="changePassword__form--newPW--label">
                New Password{" "}
              </label>
              <input
                className="changePassword__form--newPW--input"
                type="password"
                name="newpw"
              />
            </div>
            <div className="changePassword__form--newPWConfirm">
              <label className="changePassword__form--newPWConfirm--label">
                Confirm New Password{" "}
              </label>
              <input
                className="changePassword__form--newPWConfirm--input"
                type="password"
                name="newpwconfirm"
              />
            </div>
            <div className="changePassword__form--submit">
              <input
                className="changePassword__form--submit--button"
                type="submit"
                value="Change Password"
              />
            </div>
          </form>
        </div>
      );
    }
  }
}
