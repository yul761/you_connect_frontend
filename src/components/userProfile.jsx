import React, { Component } from "react";
import axios from "axios";
import likes from "../assets/Icon-likes.png";
import blackClose from "../assets/blackCloseIcon.png";

const BackendURL = "http://3.15.233.84:4000";
export default class userProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      isLoggedOut: false,
      userPosts: null,
      allUserProfile: null
    };
  }

  componentDidMount() {
    console.log(this.props.userData);
    this.setState({ userData: this.props.userData });
    console.log(this.props.logout);
    this.getUserPostFromLoggedinUser();
  }

  findUserProfilebyID = postid => {
    if (this.state.allUserProfile !== null) {
      var matchedUser = this.state.allUserProfile.filter(
        el => el._id === postid
      );
      console.log(matchedUser[0]);
      if (matchedUser === null) {
        console.log("Did not find matched user");
        return null;
      } else {
        return matchedUser[0].username;
      }
    }
  };

  commentsArrayRender = array => {
    var resultCommentsDOM = [];
    array.forEach((element, index) => {
      let tempDOM = null;
      tempDOM = (
        <div
          className="userProfile__posts--content--comments-content"
          key={index}
        >
          <div className="userProfile__posts--content--comments-content-username">
            {this.findUserProfilebyID(element.id)}
          </div>
          <div className="userProfile__posts--content--comments-content-text">
            {element.comment}
          </div>
          <div className="userProfile__posts--content--comments-content-more">
            more
          </div>
        </div>
      );
      resultCommentsDOM.push(tempDOM);
    });
    return resultCommentsDOM;
  };

  largeCommentRender = array => {
    var resultCommentsDOM = [];
    array.forEach((element, index) => {
      let tempDOM = null;
      tempDOM = (
        <div className="preview--comments-content" key={index}>
          <div className="preview--comments-content-username">
            {this.findUserProfilebyID(element.id)}
          </div>
          <div className="preview--comments-content-text">
            {element.comment}
          </div>
          <div className="preview--comments-content-more">more</div>
        </div>
      );
      resultCommentsDOM.push(tempDOM);
    });
    return resultCommentsDOM;
  };

  allUserProfile = () => {
    axios.get(`${BackendURL}/alluserInfo`).then(response => {
      console.log(response.data);
      this.setState({ allUserProfile: response.data });
      console.log(this.state.userPosts);
      console.log(this.state.allUserProfile);
    });
  };

  getUserPostFromLoggedinUser = () => {
    axios
      .get(`${BackendURL}/post`, {
        headers: { "auth-token": window.sessionStorage.getItem("curToken") }
      })
      .then(response => {
        console.log(response.data);
        this.setState({ userPosts: response.data });
        this.allUserProfile();
      });
  };

  formatLoggedinUserPosts = () => {
    console.log(this.state.userPosts);
    if (this.state.userPosts === null || this.state.userPosts.length === 0) {
      return (
        <div className="userProfile__posts--empty">Nothing is posted yet</div>
      );
    } else {
      var resultDOM = [];
      this.state.userPosts.forEach((element, index) => {
        var tempDOM = null;
        tempDOM = (
          <div
            className="userProfile__posts--content"
            key={index}
            onClick={e => {
              console.log(e.currentTarget);
              console.log(index);
              console.log(element);
              var previewDOM = document.querySelector(".preview");
              previewDOM.style.display = "block";
            }}
          >
            {this.postLargePreview(element)}
            <div className="userProfile__posts--content--container">
              <img
                className="userProfile__posts--content--container-img"
                alt="This is img section"
              ></img>
              <video
                className="userProfile__posts--content--container-video"
                alt="This is video section"
              ></video>
            </div>
            <div className="userProfile__posts--content--likes">
              <img
                className="userProfile__posts--content--likes-icon"
                src={likes}
                alt="This is like icon"
              />
              <div className="userProfile__posts--content--likes-number">
                {element.likes}
              </div>
            </div>
            <div className="userProfile__posts--content--comments">
              {this.commentsArrayRender(element.comments)}
            </div>
          </div>
        );

        resultDOM.push(tempDOM);
      });
      return resultDOM;
    }
  };

  postLargePreview = element => {
    return (
      <div className="preview">
        <img
          className="preview__close"
          src={blackClose}
          alt="close icon"
          onClick={e => {
            console.log("closebutton clicked");

            if (!e) {
              var e = window.event;
            }
            e.cancelBubble = true;
            if (e.stopPropagation()) {
              e.stopPropagation();
            }

            var preview = document.getElementsByClassName("preview")[0];
            preview.style.display = "none";
            console.log(preview);
            console.log(preview.style);
            console.log("onclick action finished");
          }}
        ></img>
        <div className="preview--header">
          <div className="preview--header-username">
            {this.findUserProfilebyID(element.userid)}
          </div>
          <div className="preview--header-editbutton">
            <div className="preview--header-editbutton-line line1"></div>
            <div className="preview--header-editbutton-line line2"></div>
            <div className="preview--header-editbutton-line line3"></div>
          </div>
        </div>
        <div className="preview--content">
          <img className="preview--content-img" alt="This is img section"></img>
          <video
            className="preview--content-video"
            alt="This is video section"
          ></video>
        </div>
        <div className="preview--likes">
          <img
            className="preview--likes-icon"
            src={likes}
            alt="This is like icon"
          />
          <div className="preview--likes-number">{element.likes}</div>
        </div>
        <div className="preview--comments">
          {this.largeCommentRender(element.comments)}
        </div>
        <div className="preview--addComments">
          <input
            type="text"
            className="preview--addComments--input"
            placeholder="Enter your comment here"
          />
          <div className="preview--addComments--post">
            <button className="preview--addComments--post--button">POST</button>
          </div>
        </div>
      </div>
    );
  };

  render() {
    console.log(this.state.userData);
    if (this.state.userData === null && this.state.userPosts === null) {
      return (
        <div className="userProfileloading">
          <div className="userProfileloading__loader"></div>
        </div>
      );
    } else if (this.state.isLoggedOut) {
      return (
        <div className="userLogOut">
          <div className="userLogOut__information"></div>
        </div>
      );
    } else {
      return (
        <div className="userProfile">
          <div className="userProfile__userInformation">
            <div className="userProfile__userInformation--username">
              <div className="userProfile__userInformation--username-label">
                {this.state.userData.username}
              </div>
            </div>

            <ul className="userProfile__userInformation--info">
              <ol className="userProfile__userInformation--info-email">
                {this.state.userData.email}
              </ol>
              <ol className="userProfile__userInformation--info-github">
                This is github address
              </ol>
              <ol className="userProfile__userInformation--info-linkedin">
                This is linkedIn Address
              </ol>
            </ul>
          </div>

          <div className="userProfile__divideLine">
            <hr />
          </div>

          {/* show user's posts */}
          <div className="userProfile__posts">
            {this.formatLoggedinUserPosts()}
          </div>

          <div className="userProfile__logout">
            <button
              className="userProfile__logout--button"
              onClick={this.props.logout}
            >
              Log Out
            </button>
          </div>
        </div>
      );
    }
  }
}
