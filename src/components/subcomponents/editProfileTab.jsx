import React, { Component } from "react";
import axios from "axios";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import DefaultUserProfileImg from "../../assets/defaultUserProfileImg.png";
import $ from "jquery";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const BackendURL = "https://you-connect-backend.herokuapp.com";
export default class editProfileTab extends Component {
  constructor() {
    super();
    this.state = {
      curUserData: undefined,
      photoURL: undefined,
      crop: {
        unit: "%",
        width: 30,
        aspect: 16 / 9,
      },
    };
  }
  componentDidMount() {
    this.userprofile();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.curUserData !== undefined) {
      this.updateProfilePhotoHandler();
    }
  }

  notificationHandler = () => {
    store.addNotification({
      title: "Yeah!",
      message: "Your Profile is updated successfully",
      type: "default", // 'default', 'success', 'info', 'warning'
      container: "top-center", // where to position the notifications
      animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
      animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
      width: 500,
      dismiss: {
        duration: 3000,
      },
    });
  };

  userprofile = () => {
    axios
      .get(`${BackendURL}/userInfo`, {
        headers: { "auth-token": window.sessionStorage.getItem("curToken") },
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ curUserData: response.data }, () => {
          this.profileInputModifyHandler();
        });
      });
  };

  profileInputModifyHandler = () => {
    var inputs = document.querySelectorAll(
      ".editProfileTab__form--content--input"
    );
    var submit = document.querySelector(
      ".editProfileTab__form--submit--button"
    );
    console.log(inputs);
    inputs.forEach((element) => {
      console.log(element);
      element.addEventListener("input", () => {
        console.log(element.value);
        submit.disabled = false;
        submit.style.opacity = "1";
      });
      // for IE
      element.addEventListener("propertychange", () => {
        console.log(element.value);
        submit.disabled = false;
        submit.style.opacity = "1";
      });
    });
  };

  editUserprofileHandler = (e) => {
    e.preventDefault();
    var input = {
      name: e.target.name.value,
      username: e.target.username.value,
      bio: e.target.bio.value,
      email: e.target.email.value,
      github: e.target.github.value,
      linkedin: e.target.linkedin.value,
      phonenumber: e.target.phonenumber.value,
    };
    console.log(input);

    var postOption = {
      method: "POST",
      url: `${BackendURL}/userInfo/edit`,
      data: input,
      headers: {
        "auth-token": window.sessionStorage.getItem("curToken"),
      },
    };
    axios(postOption).then((response) => {
      console.log(response.data);
      this.notificationHandler();
    });
  };

  updateProfilePhotoHandler = () => {
    console.log("Execute updatePhotoHandler");
    var photo = document.querySelector(
      ".editProfileTab__form--profileImg--img--icon"
    );

    var input = document.querySelector("#photoInput");
    input.addEventListener("change", () => {
      let receivedInput = input.files[0];

      let reader = new FileReader();

      reader.addEventListener("load", (e) => {
        photo.src = reader.result;
        this.setState({ photoURL: reader.result });
      });

      if (receivedInput) {
        reader.readAsDataURL(receivedInput);
      }
    });
  };
  render() {
    if (this.state.curUserData === undefined) {
      return (
        <div className="editProfileTab">
          <div className="editProfileTab__loader"></div>
        </div>
      );
    } else {
      return (
        <div className="editProfileTab">
          <form
            className="editProfileTab__form"
            onSubmit={(e) => {
              this.editUserprofileHandler(e);
            }}
          >
            <div className="editProfileTab__form--profileImg">
              <div className="editProfileTab__form--profileImg--img">
                <img
                  className="editProfileTab__form--profileImg--img--icon editProfileTab__form--content--img--icon"
                  alt="this is user profile img"
                  src={DefaultUserProfileImg}
                />
              </div>
              <div className="editProfileTab__form--profileImg--container editProfileTab__form--content--container">
                <div className="editProfileTab__form--profileImg--container--username editProfileTab__form--content--container--username">
                  <div className="editProfileTab__form--profileImg--container--username--label editProfileTab__form--content--container--username--label">
                    {this.state.curUserData.username}
                  </div>
                </div>
                <div className="editProfileTab__form--profileImg--container--updateImg editProfileTab__form--content--container--updateImg">
                  <label
                    className="editProfileTab__form--profileImg--container--updateImg--button editProfileTab__form--content--container--updateImg--button"
                    onClick={() => {
                      console.log("Label is clicked");
                      $("#photoInput").trigger("click");
                    }}
                  >
                    Update Profile Photo
                  </label>
                  <input id="photoInput" type="file" />
                </div>
              </div>
            </div>
            <div className="editProfileTab__form--name editProfileTab__form--content">
              <div className="editProfileTab__form--name--label editProfileTab__form--content--label">
                Name{" "}
              </div>
              <input
                className="editProfileTab__form--name--input editProfileTab__form--content--input"
                type="text"
                name="name"
                placeholder="Enter your name here"
                defaultValue={this.state.curUserData.name}
              />
            </div>
            <div className="editProfileTab__form--userName editProfileTab__form--content">
              <div className="editProfileTab__form--userName--label editProfileTab__form--content--label">
                User Name{" "}
              </div>
              <input
                className="editProfileTab__form--userName--input editProfileTab__form--content--input"
                type="text"
                name="username"
                placeholder="Enter your user name here"
                defaultValue={this.state.curUserData.username}
              />
            </div>
            <div className="editProfileTab__form--bio editProfileTab__form--content">
              <div className="editProfileTab__form--bio--label editProfileTab__form--content--label">
                Bio{" "}
              </div>
              <textarea
                className="editProfileTab__form--bio--input editProfileTab__form--content--input"
                type="text"
                name="bio"
                placeholder="Enter your bio here"
                defaultValue={this.state.curUserData.bio}
              />
            </div>
            <div className="editProfileTab__form--email editProfileTab__form--content">
              <div className="editProfileTab__form--email--label editProfileTab__form--content--label">
                Email{" "}
              </div>
              <input
                className="editProfileTab__form--email--input editProfileTab__form--content--input"
                type="email"
                name="email"
                placeholder="Enter your email here"
                defaultValue={this.state.curUserData.email}
              />
            </div>
            <div className="editProfileTab__form--github editProfileTab__form--content">
              <div className="editProfileTab__form--github--label editProfileTab__form--content--label">
                Github{" "}
              </div>
              <input
                className="editProfileTab__form--github--input editProfileTab__form--content--input"
                type="text"
                name="github"
                placeholder="Enter your github here"
                defaultValue={this.state.curUserData.github}
              />
            </div>
            <div className="editProfileTab__form--linkedin editProfileTab__form--content">
              <div className="editProfileTab__form--linkedin--label editProfileTab__form--content--label">
                LinkedIn{" "}
              </div>
              <input
                className="editProfileTab__form--linkedin--input editProfileTab__form--content--input"
                type="text"
                name="linkedin"
                placeholder="Enter your linkedin here"
                defaultValue={this.state.curUserData.linkedin}
              />
            </div>
            <div className="editProfileTab__form--phoneNumber editProfileTab__form--content">
              <div className="editProfileTab__form--phoneNumber--label editProfileTab__form--content--label">
                Phone Number{" "}
              </div>
              <input
                className="editProfileTab__form--phoneNumber--input editProfileTab__form--content--input"
                type="text"
                name="phonenumber"
                placeholder="Enter your phone number here"
                defaultValue={this.state.curUserData.phonenumber}
              />
            </div>
            <div className="editProfileTab__form--submit">
              <input
                className="editProfileTab__form--submit--button"
                type="submit"
                value="Submit"
                disabled
              />
            </div>
          </form>
        </div>
      );
    }
  }
}
