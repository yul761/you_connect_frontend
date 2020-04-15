import React, { Component } from "react";

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

    sideBars.forEach((element) => {
      element.addEventListener("click", (e) => {
        let curItem = e.currentTarget;
        switch (curItem.innerHTML) {
          case "Edit Profile":
            // Edit profile tab clicked
            console.log("load edit profile tab");
            break;
          case "Change Password":
            // Change password section clicked
            console.log("load Change Password tab");
            break;
          default:
            console.log("No Matched tabs");
            break;
        }
      });
    });
  };

  openSidebarHandler = () => {
    var sideBar = document.querySelector(".editProfile__sidebar");
    sideBar.classList.toggle("sideBar_active");
    document.body.classList.toggle("background_active");
    var sideContent = document.querySelector(".editProfile__content");
    // sideContent.classList.toggle("sideContent_marginChange");
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
          open side bar
        </button>
        <div className="editProfile__sidebar">
          <ul className="editProfile__sidebar--list">
            <ol className="editProfile__sidebar--list-content">Edit Profile</ol>
            <ol className="editProfile__sidebar--list-content">
              Change Password
            </ol>
          </ul>
        </div>
        <div className="editProfile__content"></div>
      </div>
    );
  }
}
