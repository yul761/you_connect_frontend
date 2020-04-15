import React, { Component } from "react";
import axios from "axios";
import likes from "../assets/Icon-likes.png";
import blackClose from "../assets/blackCloseIcon.png";

const BackendURL = "https://you-connect-backend.herokuapp.com";
export default class userProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      isLoggedOut: false,
      userPosts: null,
      allUserProfile: null,
      previewContent: null,
    };
  }

  componentDidMount() {
    console.log(this.props.userData);
    this.setState({ userData: this.props.userData });
    console.log(this.props.logout);
    this.getUserPostFromLoggedinUser();
  }

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

  commentsArrayRender = (content, array) => {
    var resultCommentsDOM = [];

    // first comment which is the text part of the post post by the loggedin user
    let userContent = (
      <div className="userProfile__posts--content--comments-content" key={0}>
        <div className="userProfile__posts--content--comments-content-username">
          {this.state.userData.username}
        </div>
        <div className="userProfile__posts--content--comments-content-text">
          {content}
        </div>
        <div
          className="userProfile__posts--content--comments-content-more"
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
        <div
          className="userProfile__posts--content--comments-content"
          key={index + 1}
        >
          <div className="userProfile__posts--content--comments-content-username">
            {this.findUserProfilebyID(element.id)}
          </div>
          <div className="userProfile__posts--content--comments-content-text">
            {element.comment}
          </div>
          <div
            className="userProfile__posts--content--comments-content-more"
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
      resultCommentsDOM.push(tempDOM);
    });
    return resultCommentsDOM;
  };

  largeCommentRender = (content, array) => {
    var resultCommentsDOM = [];
    // first comment which is the text part of the post post by the loggedin user
    let userContent = (
      <div className="preview--comments-content" key={0}>
        <div className="preview--comments-content-username">
          {this.state.userData.username}
        </div>
        <div className="preview--comments-content-text">{content}</div>
        <div
          className="preview--comments-content-more"
          onClick={(e) => {
            console.log(e.currentTarget.parentElement);
            var contentElement = e.currentTarget.parentElement;
            var text = contentElement.children[1];
            var moreButton = e.currentTarget;
            text.style.whiteSpace = "normal";
            contentElement.style.height = "50%";
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
        <div className="preview--comments-content" key={index + 1}>
          <div className="preview--comments-content-username">
            {this.findUserProfilebyID(element.id)}
          </div>
          <div className="preview--comments-content-text">
            {element.comment}
          </div>
          <div
            className="preview--comments-content-more"
            onClick={(e) => {
              console.log(e.currentTarget.parentElement);
              var contentElement = e.currentTarget.parentElement;
              var text = contentElement.children[1];
              var moreButton = e.currentTarget;
              text.style.whiteSpace = "normal";
              contentElement.style.height = "50%";
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

  allUserProfile = () => {
    axios.get(`${BackendURL}/alluserInfo`).then((response) => {
      console.log(response.data);
      this.setState({ allUserProfile: response.data });
      console.log(this.state.userPosts);
      console.log(this.state.allUserProfile);
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
      this.getUserPostFromLoggedinUser();
    });
    console.log(input.value);
    input.value = "";
  };

  getUserPostFromLoggedinUser = () => {
    axios
      .get(`${BackendURL}/post`, {
        headers: { "auth-token": window.sessionStorage.getItem("curToken") },
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ userPosts: response.data });
        this.allUserProfile();
      });
  };

  manageVideoImgSection = (imagesElements, videoElements) => {
    var images = document.querySelectorAll(imagesElements);
    var videos = document.querySelectorAll(videoElements);
    //iterate through images to determine which should be hidden
    images.forEach((element) => {
      console.log("Image source is : ");
      console.log(element.src);
      if (element.src === "") {
        element.style.display = "none";
      } else {
        element.style.display = "flex";
      }
    });

    //iterate through videos to determine which should be hidden
    videos.forEach((element) => {
      console.log("Video source is : ");
      console.log(element.src);
      if (element.src === "") {
        element.style.display = "none";
      } else {
        element.style.display = "flex";
      }
    });
  };

  moreButtonManageHandler = (contentElements) => {
    var allContents = document.querySelectorAll(contentElements);
    console.log(allContents);
    allContents.forEach((element) => {
      let text = element.children[1];
      let more = element.children[2];
      console.log(text);
      console.log(more);
      // if true means not overflowing
      console.log(text.scrollWidth);
      console.log(text.clientWidth);
      if (text.scrollWidth === text.clientWidth) {
        more.style.display = "none";
      }
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
            onClick={(e) => {
              console.log(e.currentTarget);
              console.log(index);
              console.log(element);
              this.setState({ previewContent: element }, () => {
                /* preview section */
                this.manageVideoImgSection(
                  ".preview--content-img",
                  ".preview--content-video"
                );
                /* manage visiablity of more button, does not return any DOM element */
                this.moreButtonManageHandler(".preview--comments-content");
              });
              var previewDOM = document.querySelector(".preview");
              previewDOM.style.display = "block";
            }}
          >
            <div className="userProfile__posts--content--container">
              <img
                className="userProfile__posts--content--container-img"
                alt="This is img section"
                src={element.images}
              ></img>
              <video
                className="userProfile__posts--content--container-video"
                alt="This is video section"
                src={element.videos}
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
              {this.commentsArrayRender(element.content, element.comments)}
            </div>
          </div>
        );

        resultDOM.push(tempDOM);
      });
      // normal post section
      this.manageVideoImgSection(
        ".userProfile__posts--content--container-img",
        ".userProfile__posts--content--container-video"
      );
      /* manage visiablity of more button, does not return any DOM element */
      this.moreButtonManageHandler(
        ".userProfile__posts--content--comments-content"
      );

      return resultDOM;
    }
  };

  componentDidUpdate(prevProps, prevState) {
    // if (prevState.previewContent !== this.state.preview) {
    //   //reset style for comments content
    //   var contents = document.querySelectorAll(".preview--comments-content");
    //   var text = document.querySelectorAll(".preview--comments-content-text");
    //   var more = document.querySelectorAll(".preview--comments-content-more");
    //   contents.forEach((el) => {
    //     el.style.height = "30%";
    //   });
    //   text.forEach((el) => {
    //     el.style.whiteSpace = "nowrap";
    //   });
    //   more.forEach((el) => {
    //     el.style.display = "flex";
    //   });
    // }
  }
  postLargePreview = (element) => {
    if (this.state.previewContent === null) {
      return (
        <div className="preview">
          <div className="preview__loader"></div>
        </div>
      );
    } else {
      return (
        <div className="preview">
          <img
            className="preview__close"
            src={blackClose}
            alt="close icon"
            onClick={(e) => {
              console.log("closebutton clicked");
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
            <img
              className="preview--content-img"
              alt="This is img section"
              src={element.images}
            ></img>
            <video
              className="preview--content-video"
              alt="This is video section"
              src={element.videos}
              controls
              autoPlay
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
            {this.largeCommentRender(element.content, element.comments)}
          </div>
          <div className="preview--addComments">
            <textarea
              type="text"
              className="preview--addComments--input"
              placeholder="Enter your comment here"
            />
            <div className="preview--addComments--post">
              <button
                className="preview--addComments--post--button"
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
    }
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
      /***************Change Tab title*********************/
      document.getElementById("tabtitle").innerHTML =
        "@" + this.state.userData.username + " - YouConnect";
      return (
        <div className="userProfile">
          {this.postLargePreview(this.state.previewContent)}
          <div className="userProfile__userInformation">
            <div className="userProfile__userInformation--username">
              <div className="userProfile__userInformation--username-label">
                {this.state.userData.username}
              </div>
              <div className="userProfile__userInformation--username--profileEdit">
                <button
                  className="userProfile__userInformation--username--profileEdit--button"
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.history.push("/main/account/edit");
                  }}
                >
                  Edit
                </button>
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
