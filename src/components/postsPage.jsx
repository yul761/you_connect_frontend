import React, { Component } from "react";
import axios from "axios";
import likes from "../assets/Icon-likes.png";
import { Link } from "react-router-dom";
import AddComment from "./addComment";

const BackendURL = "http://3.15.233.84:4000";
export default class postsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { allUserPosts: null, allUserProfile: null, userData: null };
  }

  componentDidMount() {
    this.setState({ userData: this.props.userData });
    console.log(this.props.userData);
    this.allUserPosts();
  }

  userprofile = () => {
    axios
      .get(`${BackendURL}/userInfo`, {
        headers: { "auth-token": window.sessionStorage.getItem("curToken") },
      })
      .then((response) => {
        // this.setState({ curUser: response.data });
        console.log(response.data);
        this.setState({ userData: response.data });
      });
  };

  // static getDerivedStateFromProps(props, state) {
  //   console.log("alskdfhalskjdfhalskdjfhalskdjfhalskdjfhalskdfjah");
  //   return { userData: props.userData };
  // }

  componentDidUpdate(prevProps, prevState) {
    if (
      window.sessionStorage.getItem("isLoggedIn") === "true" &&
      this.state.userData === null &&
      this.props.userData === null
    ) {
      this.userprofile();
    }
  }

  moreButtonManageHandler = () => {
    var allContents = document.querySelectorAll(
      ".postPage__posts--comments-content"
    );
    allContents.forEach((element) => {
      let text = element.children[1];
      let more = element.children[2];
      console.log(text);
      console.log(more);
      // if true means not overflowing
      if (text.scrollWidth === text.clientWidth) {
        more.style.display = "none";
      }
    });
  };

  findUserProfilebyID = (postid) => {
    if (this.state.allUserProfile !== null) {
      var matchedUser = this.state.allUserProfile.filter(
        (el) => el._id === postid
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

  findUserNameforComment = (generatedID) => {
    if (this.state.allUserProfile !== null) {
      var matchedUser = this.state.allUserProfile.filter(
        (el) => el._id === generatedID
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

  allUserProfile = () => {
    axios.get(`${BackendURL}/alluserInfo`).then((response) => {
      console.log(response.data);
      this.setState({ allUserProfile: response.data });
      console.log(this.state.allUserPosts);
      console.log(this.state.allUserProfile);
    });
  };

  commentsArrayRender = (posterID, content, array) => {
    var resultCommentsDOM = [];
    // first comment which is the text part of the post post by the loggedin user
    let userContent = (
      <div className="postPage__posts--comments-content" key={0}>
        <div className="postPage__posts--comments-content-username">
          {this.findUserProfilebyID(posterID)}
        </div>
        <div className="postPage__posts--comments-content-text">{content}</div>
        <div
          className="postPage__posts--comments-content-more"
          onClick={(e) => {
            console.log(e.currentTarget.parentElement);
            var contentElement = e.currentTarget.parentElement;
            var text = contentElement.children[1];
            var moreButton = e.currentTarget;
            text.style.whiteSpace = "normal";
            contentElement.style.height = "45%";
            moreButton.style.display = "none";
          }}
        >
          more
        </div>
      </div>
    );
    resultCommentsDOM.push(userContent);

    array.forEach((element, index) => {
      let tempDOM = null;
      tempDOM = (
        <div className="postPage__posts--comments-content" key={index + 1}>
          <div className="postPage__posts--comments-content-username">
            {this.findUserProfilebyID(element.id)}
          </div>
          <div className="postPage__posts--comments-content-text">
            {element.comment}
          </div>
          <div
            className="postPage__posts--comments-content-more"
            onClick={(e) => {
              console.log(e.currentTarget.parentElement);
              var contentElement = e.currentTarget.parentElement;
              var text = contentElement.children[1];
              var moreButton = e.currentTarget;
              text.style.whiteSpace = "normal";
              // check if text is overflowing

              contentElement.style.height = "45%";

              moreButton.style.display = "none";
            }}
          >
            more
          </div>
        </div>
      );
      resultCommentsDOM.push(tempDOM);
    });
    return resultCommentsDOM;
  };

  allUserPosts = () => {
    axios.get(`${BackendURL}/post/allposts`).then((response) => {
      console.log(response.data);
      this.setState({ allUserPosts: response.data });
      this.allUserProfile();
    });
  };
  addCommentSubmitHandler = (e, postID) => {
    var input = e.currentTarget.parentElement.parentElement.children[0];
    var comment = {
      comment: input.value,
    };
    var putOption = {
      method: "PUT",
      url: `${BackendURL}/post/comment/${postID}`,
      data: comment,
      headers: {
        "auth-token": window.sessionStorage.getItem("curToken"),
      },
    };

    axios(putOption).then((response) => {
      console.log(response.data);
      this.allUserPosts();
    });
    console.log(input.value);
    input.value = "";
  };

  likeButtonHandler = (e, postID) => {
    var likeNumbers = e.currentTarget.parentElement.children[1];
    likeNumbers.innerHTML = (Number(likeNumbers.innerHTML) + 1).toString();
    var putOption = {
      method: "PUT",
      url: `${BackendURL}/post/likes/${postID}`,
    };
    axios(putOption).then((response) => {
      console.log(response.data);
      this.allUserPosts();
    });
  };

  postSectionRender = () => {
    var resultDOM = [];
    this.state.allUserPosts.forEach((element, index) => {
      var tempDOM = null;
      tempDOM = (
        <div className="postPage__posts" key={index}>
          <div className="postPage__posts--header">
            <div className="postPage__posts--header-username">
              {this.findUserProfilebyID(element.userid)}
            </div>
            <div className="postPage__posts--header-editbutton">
              <div className="postPage__posts--header-editbutton-line line1"></div>
              <div className="postPage__posts--header-editbutton-line line2"></div>
              <div className="postPage__posts--header-editbutton-line line3"></div>
            </div>
          </div>
          <div className="postPage__posts--content">
            <img
              className="postPage__posts--content-img"
              alt="This is img section"
              src={element.images}
            ></img>
            <video
              className="postPage__posts--content-video"
              src={element.videos}
              controls
              autoPlay
            >
              Your browser does not support this video
            </video>
          </div>
          <div className="postPage__posts--likes">
            <img
              className="postPage__posts--likes-icon"
              src={likes}
              alt="This is like icon"
              onClick={(e) => {
                this.likeButtonHandler(e, element._id);
              }}
            />
            <div className="postPage__posts--likes-number">{element.likes}</div>
          </div>
          <div className="postPage__posts--comments">
            {this.commentsArrayRender(
              element.userid,
              element.content,
              element.comments
            )}
          </div>
          <div className="postPage__posts--addComments">
            <textarea
              type="text"
              className="postPage__posts--addComments--input"
              placeholder="Enter your comment here"
            />
            <div className="postPage__posts--addComments--post">
              <button
                className="postPage__posts--addComments--post--button"
                onClick={(e) => {
                  this.addCommentSubmitHandler(e, element._id);
                }}
              >
                POST
              </button>
            </div>
          </div>
        </div>
      );
      resultDOM.push(tempDOM);
    });
    this.manageVideoImgSection();
    return resultDOM;
  };

  manageVideoImgSection = () => {
    var images = document.querySelectorAll(".postPage__posts--content-img");
    var videos = document.querySelectorAll(".postPage__posts--content-video");
    //iterate through images to determine which should be hidden
    images.forEach((element) => {
      if (element.src === "") {
        element.style.display = "none";
      }
    });

    //iterate through videos to determine which should be hidden
    videos.forEach((element) => {
      console.log(element.src);
      if (element.src === "") {
        element.style.display = "none";
      }
    });
  };

  userProfileOnMain = () => {
    if (this.state.userData === null || this.props.LogoutStatus === true) {
      return (
        <div className="postPage__userProfile">
          <Link className="postPage__userProfile--signin" to="/login">
            Sign In Now
          </Link>
        </div>
      );
    } else {
      return (
        <div className="postPage__userProfile">
          <div className="postPage__userProfile--userInformation">
            <div className="postPage__userProfile--userInformation--username">
              <div className="postPage__userProfile--userInformation--username-label">
                {this.state.userData.username}
              </div>
            </div>

            <ul className="postPage__userProfile--userInformation--info">
              <ol className="postPage__userProfile--userInformation--info-email">
                {this.state.userData.email}
              </ol>
              <ol className="postPage__userProfile--userInformation--info-github">
                This is github address
              </ol>
              <ol className="postPage__userProfile--userInformation--info-linkedin">
                This is linkedIn Address
              </ol>
            </ul>
          </div>
        </div>
      );
    }
  };
  render() {
    console.log(this.props);
    console.log(this.state.userData);
    if (
      this.state.allUserPosts === null &&
      this.state.allUserProfile === null
    ) {
      return <div className="postPage">Loading ... </div>;
    } else {
      return (
        <div className="postPage">
          <div className="desktop__wrapper">
            <AddComment />
            {this.postSectionRender()}
          </div>
          {this.userProfileOnMain()}
          {/* manage visiablity of more button, does not return any DOM element */}
          {this.moreButtonManageHandler()}
        </div>
      );
    }
  }
}
