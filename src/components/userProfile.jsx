import React, { Component } from "react";
import axios from "axios";
import likes from "../assets/Icon-likes.png";
import blackClose from "../assets/blackCloseIcon.png";
import DefaultUserProfileImg from "../assets/defaultUserProfileImg.png";
import Loader from "../components/subcomponents/loader";

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
    this.userprofile();
    // console.log(this.props.userData);
    // this.setState({ userData: this.props.userData });
    console.log(this.props.logout);
    this.getUserPostFromLoggedinUser();
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

  findProfileImgbyID = (postid) => {
    if (this.state.allUserProfile !== null) {
      var matchedUser = this.state.allUserProfile.filter(
        (el) => el._id === postid
      );
      console.log(matchedUser[0]);
      if (matchedUser === null) {
        console.log("Did not find matched user");
        return null;
      } else {
        return matchedUser[0].profileImg === undefined
          ? DefaultUserProfileImg
          : matchedUser[0].profileImg;
      }
    }
  };

  commentsArrayRender = (content, array) => {
    var resultCommentsDOM = [];

    // first comment which is the text part of the post post by the loggedin user
    let userContent = (
      <div className="userProfile__posts--content--comments-content" key={0}>
        <div className="userProfile__posts--content--comments-content-username">
          <div className="userProfile__posts--content--comments-content-username--profileImg">
            <img
              className="userProfile__posts--content--comments-content-username--profileImg--icon"
              alt="this is user profile img"
              src={
                this.state.userData.profileImg === undefined
                  ? DefaultUserProfileImg
                  : this.state.userData.profileImg
              }
            />
          </div>
          <div className="userProfile__posts--content--comments-content-username--label">
            {this.state.userData.username}
          </div>
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
            <div className="userProfile__posts--content--comments-content-username--profileImg">
              <img
                className="userProfile__posts--content--comments-content-username--profileImg--icon"
                alt="this is user profile img"
                src={this.findProfileImgbyID(element.id)}
              />
            </div>
            <div className="userProfile__posts--content--comments-content-username--label">
              {this.findUserProfilebyID(element.id)}
            </div>
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
          <div className="preview--comments-content-username--profileImg">
            <img
              className="preview--comments-content-username--profileImg--icon"
              alt="this is user's profile img"
              src={
                this.state.userData.profileImg === undefined
                  ? DefaultUserProfileImg
                  : this.state.userData.profileImg
              }
            />
          </div>
          <div className="preview--comments-content-username--label">
            {this.state.userData.username}
          </div>
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
            <div className="preview--comments-content-username--profileImg">
              <img
                className="preview--comments-content-username--profileImg--icon"
                alt="this is user's profile img"
                src={this.findProfileImgbyID(element.id)}
              />
            </div>
            <div className="preview--comments-content-username--label">
              {this.findUserProfilebyID(element.id)}
            </div>
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
      this.setState({ allUserProfile: response.data });
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
    if (this.state.userData === null || this.state.userPosts === null) {
      return (
        <div className="userProfile__posts--loader">
          <Loader />
        </div>
      );
    } else if (this.state.userPosts.length === 0) {
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
              <div className="preview--header-username--profileImg">
                <img
                  className="preview--header-username--profileImg--icon"
                  alt="this is user's profile img"
                  src={this.findProfileImgbyID(element.userid)}
                />
              </div>
              <div className="preview--header-username--label">
                {this.findUserProfilebyID(element.userid)}
              </div>
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

  //click 'following : x' to open the friends/followers list
  friendsProfileHandler = (e) => {
    console.log(e.currentTarget);
    var friendLists = document.querySelector(".friendLists");
    friendLists.style.display = "flex";
  };

  // certainFriendClickHandler = (e, element) => {
  //   e.cancelBubble = true;
  //   if (e.stopPropagation()) {
  //     e.stopPropagation();
  //   }

  //   console.log(element);
  // };

  generateFriendLists = () => {
    let resultDOM = [];
    if (this.state.userData.friends.length !== 0) {
      let DOM = this.state.userData.friends.map((element) => {
        return (
          <div
            className="friendLists__content--container"
            onClick={(e) => this.props.FriendClickedHandler(e, element)}
          >
            <div className="friendLists__content--container--profileImg">
              <img
                className="friendLists__content--container--profileImg--icon"
                alt="profileImg"
                src={element.profileImg}
              />
            </div>
            <div className="friendLists__content--container--username">
              <label className="friendLists__content--container--username--label">
                {element.username}
              </label>
            </div>
          </div>
        );
      });
      resultDOM.push(DOM);
    } else {
      let DOM = (
        <div className="friendLists__content--container">
          <div className="friendLists__content--container--nofriends">
            <label className="friendLists__content--container--nofriends--text">
              Follow others to start making connection
            </label>
          </div>
        </div>
      );
      resultDOM.push(DOM);
    }

    return <div className="friendLists__content">{resultDOM}</div>;
  };

  render() {
    console.log(this.state.userData);

    if (this.state.userData === null && this.state.userPosts === null) {
      return (
        <div className="userProfileloading">
          <Loader />
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
        <>
          <div
            className="friendLists"
            onClick={(e) => {
              e.currentTarget.style.display = "none";
            }}
          >
            {this.generateFriendLists()}
          </div>
          <div className="userProfile">
            {this.postLargePreview(this.state.previewContent)}
            <div className="userProfile__userInformation">
              <div className="userProfile__userInformation--username">
                <div className="userProfile__userInformation--username--container">
                  <div className="userProfile__userInformation--username--container--profileImg">
                    <img
                      className="userProfile__userInformation--username--container--profileImg--icon"
                      alt="this is profile img"
                      src={
                        this.state.userData.profileImg === undefined
                          ? DefaultUserProfileImg
                          : this.state.userData.profileImg
                      }
                    />
                  </div>
                  <div className="userProfile__userInformation--username--container--label">
                    {this.state.userData.username}
                  </div>
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

              <div className="tabletDesktopWrapper">
                <div className="tabletDesktopWrapper__subwrapper">
                  <div className="userProfile__userInformation--name">
                    <label className="userProfile__userInformation--name--label">
                      {this.state.userData.name}
                    </label>
                  </div>

                  <div className="userProfile__userInformation--bio">
                    <label className="userProfile__userInformation--bio--label">
                      {this.state.userData.bio}
                    </label>
                  </div>

                  <div
                    className="userProfile__userInformation--followStatus"
                    onClick={this.friendsProfileHandler}
                  >
                    <div className="userProfile__userInformation--followStatus--following">
                      <label className="userProfile__userInformation--followStatus--following-label">
                        Following :
                      </label>
                      <label className="userProfile__userInformation--username--following-text">
                        {this.state.userData.friends.length}
                      </label>
                    </div>
                  </div>
                </div>

                <ul className="userProfile__userInformation--info">
                  <ol className="userProfile__userInformation--info-email">
                    {this.state.userData.email}
                  </ol>
                  <ol className="userProfile__userInformation--info-github">
                    {this.state.userData.github}
                  </ol>
                  <ol className="userProfile__userInformation--info-linkedin">
                    {this.state.userData.linkedin}
                  </ol>
                </ul>
              </div>
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
        </>
      );
    }
  }
}
