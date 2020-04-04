import React, { Component } from "react";
import axios from "axios";
import likes from "../assets/Icon-likes.png";

const BackendURL = "http://3.15.233.84:4000";
export default class postsPage extends Component {
  constructor() {
    super();
    this.state = { allUserPosts: null, allUserProfile: null };
  }

  componentDidMount() {
    this.allUserPosts();
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

  findUserNameforComment = generatedID => {
    if (this.state.allUserProfile !== null) {
      var matchedUser = this.state.allUserProfile.filter(
        el => el._id === generatedID
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
    axios.get(`${BackendURL}/alluserInfo`).then(response => {
      console.log(response.data);
      this.setState({ allUserProfile: response.data });
      console.log(this.state.allUserPosts);
      console.log(this.state.allUserProfile);
    });
  };

  commentsArrayRender = array => {
    var resultCommentsDOM = [];
    array.forEach((element, index) => {
      let tempDOM = null;
      tempDOM = (
        <div className="postPage__posts--comments-content" key={index}>
          <div className="postPage__posts--comments-content-username">
            {this.findUserProfilebyID(element.id)}
          </div>
          <div className="postPage__posts--comments-content-text">
            {element.comment}
          </div>
          <div className="postPage__posts--comments-content-more">more</div>
        </div>
      );
      resultCommentsDOM.push(tempDOM);
    });
    return resultCommentsDOM;
  };

  allUserPosts = () => {
    axios.get(`${BackendURL}/post/allposts`).then(response => {
      console.log(response.data);
      this.setState({ allUserPosts: response.data });
      this.allUserProfile();
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
            ></img>
            <video
              className="postPage__posts--content-video"
              alt="This is video section"
            ></video>
          </div>
          <div className="postPage__posts--likes">
            <img
              className="postPage__posts--likes-icon"
              src={likes}
              alt="This is like icon"
            />
            <div className="postPage__posts--likes-number">{element.likes}</div>
          </div>
          <div className="postPage__posts--comments">
            {this.commentsArrayRender(element.comments)}
          </div>
          <div className="postPage__posts--addComments">
            <input
              type="text"
              className="postPage__posts--addComments--input"
              placeholder="Enter your comment here"
            />
            <div className="postPage__posts--addComments--post">
              <button className="postPage__posts--addComments--post--button">
                POST
              </button>
            </div>
          </div>
        </div>
      );
      resultDOM.push(tempDOM);
    });
    return resultDOM;
  };
  render() {
    if (
      this.state.allUserPosts === null &&
      this.state.allUserProfile === null
    ) {
      return <div className="postPage">Loading ... </div>;
    } else {
      return <div className="postPage">{this.postSectionRender()}</div>;
    }
  }
}
