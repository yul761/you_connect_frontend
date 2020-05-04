import React, { Component } from "react";
import ChatBox from "../../assets/chatbox-outline.svg";
import Draggable from "react-draggable";
import axios from "axios";
import { Link } from "react-router-dom";

const BackendURL = "https://you-connect-backend.herokuapp.com";

export default class messagePanel extends Component {
  constructor() {
    super();
    this.state = {
      activeDrags: 0,
      isLoggedIn: undefined,
      userData: undefined,
      allUserProfile: undefined,
    };
  }

  componentDidMount() {
    this.setState({ isLoggedIn: window.sessionStorage.getItem("isLoggedIn") });
    this.userprofile();
    this.allUserProfile();
  }

  /***********************Axios Method*************************/
  userprofile = () => {
    axios
      .get(`${BackendURL}/userInfo`, {
        headers: { "auth-token": window.sessionStorage.getItem("curToken") },
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ userData: response.data });
      });
  };

  allUserProfile = () => {
    axios.get(`${BackendURL}/alluserInfo`).then((response) => {
      console.log(response.data);
      this.setState({ allUserProfile: response.data });
    });
  };

  /***********************End of Axios Method******************/

  /***********************Open message part******************************/

  messagePortHandler = (e, element) => {
    console.log(e.currentTarget);
    console.log(element);
  };

  /***********************End of message part******************************/

  /*********************Generate Friends lists**************************/

  generateFriendList = () => {
    let resultDOM = [];
    console.log(this.state.isLoggedIn !== "true");
    if (this.state.isLoggedIn !== "true") {
      let DOM = (
        <div className="messagePanel__container--left--friendLists--notlogin">
          <Link
            className="messagePanel__container--left--friendLists--notlogin--link"
            to="/login"
          >
            <label className="messagePanel__container--left--friendLists--notlogin--link--text">
              Log in now to start making connections
            </label>
          </Link>
        </div>
      );
      resultDOM.push(DOM);
    } else if (this.state.userData !== undefined) {
      if (this.state.userData.friends.length !== 0) {
        let DOM = this.state.userData.friends.map((element) => {
          return (
            <div
              className="messagePanel__container--left--friendLists--content"
              onClick={(e) => this.messagePortHandler(e, element)}
            >
              <div className="messagePanel__container--left--friendLists--content--profilePhoto">
                <img
                  className="messagePanel__container--left--friendLists--content--profilePhoto--img"
                  src={element.profileImg}
                  alt="profilephoto"
                />
              </div>
              <div className="messagePanel__container--left--friendLists--content--name">
                <label className="messagePanel__container--left--friendLists--content--name--text">
                  {element.username}
                </label>
              </div>
            </div>
          );
        });
        resultDOM.push(DOM);
      } else {
        let DOM = (
          <div className="messagePanel__container--left--friendLists--nofollow">
            <label className="messagePanel__container--left--friendLists--nofollow--text">
              Follow others to start making connection
            </label>
          </div>
        );
        resultDOM.push(DOM);
      }
    }
    return (
      <div className="messagePanel__container--left--friendLists">
        {resultDOM}
      </div>
    );
  };
  /*********************End of Generate Friends lists******************/
  /************************Draggable Item Method***************/
  onStart = () => {
    this.setState({ activeDrags: this.state.activeDrags + 1 });
  };

  onStop = () => {
    this.setState({ activeDrags: this.state.activeDrags - 1 });
  };

  /************************End of Draggable Item Method********/

  messageBoxHandler = () => {
    console.log("control button clicked");
    var msgBox = document.querySelector(".messagePanel");
    msgBox.style.display === ""
      ? (msgBox.style.display = "flex")
      : (msgBox.style.display = "");
  };
  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };

    return (
      <>
        <Draggable
          {...dragHandlers}
          onMouseDown={() => {
            this.messageBoxHandler();
          }}
        >
          <button className="controlbutton">
            <img
              className="controlbutton__img"
              src={ChatBox}
              alt="this is chatbox"
            />
          </button>
        </Draggable>
        <div className="messagePanel">
          <div className="messagePanel__container">
            <div className="messagePanel__container--left">
              {this.generateFriendList()}
            </div>
            <div className="messagePanel__container--right"></div>
          </div>
        </div>
      </>
    );
  }
}
