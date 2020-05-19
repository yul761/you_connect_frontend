import React, { useState, useEffect } from "react";
import axios from "axios";
import likesIcon from "../../assets/Icon-likes.png";
import DefaultUserProfileImg from "../../assets/defaultUserProfileImg.png";
import blackClose from "../../assets/blackCloseIcon.png";

const BackendURL = "https://you-connect-backend.herokuapp.com";
export default function FriendsProfile(props) {
  const [friendprofile, setProfile] = useState(null);
  const [friendPost, setpost] = useState(null);
  const [allProfile, setAllProfile] = useState(null);
  const [previewElement, setPreview] = useState(null);
  console.log(props.selectedData);

  const moreContent = document.querySelectorAll(
    ".friendProfile__posts--content--comments-content"
  );

  const previewMore = document.querySelectorAll(
    ".preview__friends--comments-content"
  );

  console.log(friendprofile);
  useEffect(() => {
    setProfile(props.selectedData);
    let getoption = {
      method: "GET",
      url: `${BackendURL}/post/allposts`,
    };

    console.log(props.selectedData);
    console.log(friendprofile);

    axios(getoption).then((response) => {
      console.log(response.data);
      let result = response.data.filter(
        (element) => element.userid === props.selectedData._id
      );
      console.log(result);
      setpost(result);
    });

    axios.get(`${BackendURL}/alluserInfo`).then((response) => {
      setAllProfile(response.data);
    });
  }, [props.selectedData]);

  useEffect(() => {
    moreButtonManageHandler(".friendProfile__posts--content--comments-content");
  }, [moreContent]);

  useEffect(() => {
    moreButtonManageHandler(".preview__friends--comments-content");
  }, [previewMore]);

  const post = () => {
    let resultDOM = [];
    friendPost === null
      ? resultDOM.push(<div>loading...</div>)
      : friendPost.forEach((element, index) => {
          let DOM = null;
          if (element.images === null) {
            DOM = (
              <div
                className="friendProfile__posts--content"
                key={index}
                onClick={() => {
                  setPreview(element);
                  console.log("post content clicked");
                  var previewDOM = document.querySelector(".preview");
                  previewDOM.style.display = "block";
                }}
              >
                <div className="friendProfile__posts--content--container">
                  <video
                    className="friendProfile__posts--content--container-video"
                    alt="This is video section"
                    src={element.videos}
                  ></video>
                </div>
                <div className="friendProfile__posts--content--likes">
                  <img
                    className="friendProfile__posts--content--likes-icon"
                    src={likesIcon}
                    alt="This is like icon"
                  />
                  <div className="friendProfile__posts--content--likes-number">
                    {element.likes}
                  </div>
                </div>
                <div className="friendProfile__posts--content--comments">
                  {commentsArrayRender(element.content, element.comments)}
                </div>
              </div>
            );
          } else if (element.videos === null) {
            DOM = (
              <div
                className="friendProfile__posts--content"
                key={index}
                onClick={() => {
                  setPreview(element);
                  console.log("post content clicked");
                  var previewDOM = document.querySelector(".preview");
                  previewDOM.style.display = "block";
                }}
              >
                <div className="friendProfile__posts--content--container">
                  <img
                    className="friendProfile__posts--content--container-img"
                    alt="This is img section"
                    src={element.images}
                  ></img>
                </div>
                <div className="friendProfile__posts--content--likes">
                  <img
                    className="friendProfile__posts--content--likes-icon"
                    src={likesIcon}
                    alt="This is like icon"
                  />
                  <div className="friendProfile__posts--content--likes-number">
                    {element.likes}
                  </div>
                </div>
                <div className="friendProfile__posts--content--comments">
                  {commentsArrayRender(element.content, element.comments)}
                </div>
              </div>
            );
          }
          resultDOM.push(DOM);
        });

    // moreButtonManageHandler(".friendProfile__posts--content--comments-content");
    return <div className="friendProfile__posts">{resultDOM}</div>;
  };

  const moreButtonManageHandler = (contentElements) => {
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

  const commentsArrayRender = (content, array) => {
    var resultCommentsDOM = [];
    // first comment which is the text part of the post post by the loggedin user
    let userContent = (
      <div className="friendProfile__posts--content--comments-content" key={0}>
        <div className="friendProfile__posts--content--comments-content-username">
          <div className="friendProfile__posts--content--comments-content-username--profileImg">
            <img
              className="friendProfile__posts--content--comments-content-username--profileImg--icon"
              alt="this is user profile img"
              src={
                friendprofile.profileImg === undefined
                  ? DefaultUserProfileImg
                  : friendprofile.profileImg
              }
            />
          </div>
          <div className="friendProfile__posts--content--comments-content-username--label">
            {friendprofile.username}
          </div>
        </div>
        <div className="friendProfile__posts--content--comments-content-text">
          {content}
        </div>
        <div
          className="friendProfile__posts--content--comments-content-more"
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
          className="friendProfile__posts--content--comments-content"
          key={index + 1}
        >
          <div className="friendProfile__posts--content--comments-content-username">
            <div className="friendProfile__posts--content--comments-content-username--profileImg">
              <img
                className="friendProfile__posts--content--comments-content-username--profileImg--icon"
                alt="this is user profile img"
                src={findProfileImgbyID(element.id)}
              />
            </div>
            <div className="friendProfile__posts--content--comments-content-username--label">
              {findUserProfilebyID(element.id)}
            </div>
          </div>
          <div className="friendProfile__posts--content--comments-content-text">
            {element.comment}
          </div>
          <div
            className="friendProfile__posts--content--comments-content-more"
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

  const postLargePreview = (element) => {
    if (previewElement === null) {
      return (
        <div className="preview">
          <div className="preview__friends__loader"></div>
        </div>
      );
    } else {
      if (element.images === null) {
        return (
          <div className="preview">
            <img
              className="preview__friends__close"
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
            <div className="preview__friends--header">
              <div className="preview__friends--header-username">
                <div className="preview__friends--header-username--profileImg">
                  <img
                    className="preview__friends--header-username--profileImg--icon"
                    alt="this is user's profile img"
                    src={findProfileImgbyID(element.userid)}
                  />
                </div>
                <div className="preview__friends--header-username--label">
                  {findUserProfilebyID(element.userid)}
                </div>
              </div>
              <div className="preview__friends--header-editbutton">
                <div className="preview__friends--header-editbutton-line line1"></div>
                <div className="preview__friends--header-editbutton-line line2"></div>
                <div className="preview__friends--header-editbutton-line line3"></div>
              </div>
            </div>
            <div className="preview__friends--content">
              <video
                className="preview__friends--content-video"
                alt="This is video section"
                src={element.videos}
                controls
                autoPlay
              ></video>
            </div>
            <div className="preview__friends--likes">
              <img
                className="preview__friends--likes-icon"
                src={likesIcon}
                alt="This is like icon"
              />
              <div className="preview__friends--likes-number">
                {element.likes}
              </div>
            </div>
            <div className="preview__friends--comments">
              {largeCommentRender(element.content, element.comments)}
            </div>
          </div>
        );
      } else if (element.videos === null) {
        return (
          <div className="preview">
            <img
              className="preview__friends__close"
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
            <div className="preview__friends--header">
              <div className="preview__friends--header-username">
                <div className="preview__friends--header-username--profileImg">
                  <img
                    className="preview__friends--header-username--profileImg--icon"
                    alt="this is user's profile img"
                    src={findProfileImgbyID(element.userid)}
                  />
                </div>
                <div className="preview__friends--header-username--label">
                  {findUserProfilebyID(element.userid)}
                </div>
              </div>
              <div className="preview__friends--header-editbutton">
                <div className="preview__friends--header-editbutton-line line1"></div>
                <div className="preview__friends--header-editbutton-line line2"></div>
                <div className="preview__friends--header-editbutton-line line3"></div>
              </div>
            </div>
            <div className="preview__friends--content">
              <img
                className="preview__friends--content-img"
                alt="This is img section"
                src={element.images}
              ></img>
            </div>
            <div className="preview__friends--likes">
              <img
                className="preview__friends--likes-icon"
                src={likesIcon}
                alt="This is like icon"
              />
              <div className="preview__friends--likes-number">
                {element.likes}
              </div>
            </div>
            <div className="preview__friends--comments">
              {largeCommentRender(element.content, element.comments)}
            </div>
          </div>
        );
      }
    }
  };

  const largeCommentRender = (content, array) => {
    var resultCommentsDOM = [];
    // first comment which is the text part of the post post by the loggedin user
    let userContent = (
      <div className="preview__friends--comments-content" key={0}>
        <div className="preview__friends--comments-content-username">
          <div className="preview__friends--comments-content-username--profileImg">
            <img
              className="preview__friends--comments-content-username--profileImg--icon"
              alt="this is user's profile img"
              src={
                friendprofile.profileImg === undefined
                  ? DefaultUserProfileImg
                  : friendprofile.profileImg
              }
            />
          </div>
          <div className="preview__friends--comments-content-username--label">
            {friendprofile.username}
          </div>
        </div>
        <div className="preview__friends--comments-content-text">{content}</div>
        <div
          className="preview__friends--comments-content-more"
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
        <div className="preview__friends--comments-content" key={index + 1}>
          <div className="preview__friends--comments-content-username">
            <div className="preview__friends--comments-content-username--profileImg">
              <img
                className="preview__friends--comments-content-username--profileImg--icon"
                alt="this is user's profile img"
                src={findProfileImgbyID(element.id)}
              />
            </div>
            <div className="preview__friends--comments-content-username--label">
              {findUserProfilebyID(element.id)}
            </div>
          </div>
          <div className="preview__friends--comments-content-text">
            {element.comment}
          </div>
          <div
            className="preview__friends--comments-content-more"
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

  const findUserProfilebyID = (postid) => {
    if (allProfile !== null) {
      var matchedUser = allProfile.filter((el) => el._id === postid);
      console.log(matchedUser[0]);
      if (matchedUser === null) {
        console.log("Did not find matched user");
        return null;
      } else {
        return matchedUser[0].username;
      }
    }
  };

  const findProfileImgbyID = (postid) => {
    if (allProfile !== null) {
      var matchedUser = allProfile.filter((el) => el._id === postid);
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

  if (friendprofile === null) {
    return <div className="friendProfile">Loading...</div>;
  } else {
    document.getElementById("tabtitle").innerHTML =
      "@" + friendprofile.username + " - YouConnect";
    return (
      <>
        {postLargePreview(previewElement)}
        <div className="friendProfile">
          <div className="friendProfile__contentTop">
            {/* left */}
            <div className="friendProfile__contentTop--left">
              <div className="friendProfile__contentTop--left--profilePhoto">
                <img
                  className="friendProfile__contentTop--left--profilePhoto--icon"
                  src={friendprofile.profileImg}
                  alt="profileImg"
                />
              </div>
              <div className="friendProfile__contentTop--left--username">
                <label className="friendProfile__contentTop--left--username--label">
                  {friendprofile.username}
                </label>
              </div>
            </div>
            {/* right */}
            <div className="friendProfile__contentTop--followStatus">
              <label className="friendProfile__contentTop--followStatus--label">
                Following :
              </label>
              <label className="friendProfile__contentTop--followStatus--number">
                {friendprofile.friends.length}
              </label>
            </div>
          </div>

          <div className="friendProfile__contentBottom">
            {/* name and bio */}
            <div className="friendProfile__contentBottom--left">
              <div className="friendProfile__contentBottom--left--name">
                <label className="friendProfile__contentBottom--left--name--label">
                  {friendprofile.name}
                </label>
              </div>

              <div className="friendProfile__contentBottom--left--bio">
                <label className="friendProfile__contentBottom--left--bio--label">
                  {friendprofile.bio}
                </label>
              </div>
            </div>
            {/* github email and linkedin */}
            <div className="friendProfile__contentBottom--right">
              <div className="friendProfile__contentBottom--right--email">
                <label className="friendProfile__contentBottom--right--email--label">
                  {friendprofile.email}
                </label>
              </div>
              <div className="friendProfile__contentBottom--right--github">
                <label className="friendProfile__contentBottom--right--github--label">
                  {friendprofile.github}
                </label>
              </div>

              <div className="friendProfile__contentBottom--right--linkedin">
                <label className="friendProfile__contentBottom--right--linkedin--label">
                  {friendprofile.linkedin}
                </label>
              </div>
            </div>
          </div>

          {post()}
        </div>
      </>
    );
  }
}
