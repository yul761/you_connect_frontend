import React, { Component } from "react";
import ReactDOM from "react-dom";
import EditProfileTab from "./subcomponents/editProfileTab";
import ChangePassword from "./subcomponents/changePassword";

export default class editProfile extends Component {
  constructor() {
    super();
    this.state = { curTab: undefined };
  }

  componentDidMount() {
    this.sideBarClickHandler();
  }

  sideBarClickHandler = () => {
    var sideBars = document.querySelectorAll(
      ".editProfile__sidebar--list-content"
    );
    var sideContents = document.querySelectorAll(
      ".editProfile__sidebar--list-content"
    );

    sideBars.forEach((element) => {
      element.addEventListener("click", (e) => {
        let curItem = e.currentTarget;

        switch (curItem.innerHTML) {
          case "Edit Profile":
            // Edit profile tab clicked
            ReactDOM.render(
              <EditProfileTab />,
              document.getElementById("editProfile__container")
            );
            // clear underline first everytime
            sideContents.forEach((element) => {
              element.style.borderBottom = "none";
            });
            curItem.style.borderBottom = "thick solid black";
            console.log("load edit profile tab");
            break;
          case "Change Password":
            // Change password section clicked
            ReactDOM.render(
              <ChangePassword />,
              document.getElementById("editProfile__container")
            );
            // clear underline first everytime
            sideContents.forEach((element) => {
              element.style.borderBottom = "none";
            });
            curItem.style.borderBottom = "thick solid black";
            console.log("load Change Password tab");
            break;
          default:
            ReactDOM.render(
              <EditProfileTab />,
              document.getElementById("editProfile__container")
            );
            break;
        }
      });
    });
  };

  openSidebarHandler = () => {
    var sideBar = document.querySelector(".editProfile__sidebar");
    sideBar.classList.toggle("sideBar_active");
    // document.body.classList.toggle("background_active");
    var sideContent = document.querySelector(".editProfile__content");
    sideContent.classList.toggle("sideContent_active");
  };
  render() {
    document.getElementById("tabtitle").innerHTML = "Edit Profile - YouConnect";
    return (
      <div className="editProfile">
        <button
          className="editProfile__callSidebar"
          onClick={this.openSidebarHandler}
        >
          &#9658;&#9658;
        </button>
        <div className="editProfile__sidebar">
          <ul className="editProfile__sidebar--list">
            <ol className="editProfile__sidebar--list-content editProfile__sidebar--list-editProfile">
              Edit Profile
            </ol>
            <ol className="editProfile__sidebar--list-content editProfile__sidebar--list-changePassword">
              Change Password
            </ol>
          </ul>
        </div>
        <div className="editProfile__content" id="editProfile__container">
          <EditProfileTab />
        </div>
      </div>
    );
  }
}
