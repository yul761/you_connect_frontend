import React, { Component } from "react";

export default class userProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      isLoggedOut: false
    };
  }

  componentDidMount() {
    console.log(this.props.userData);
    this.setState({ userData: this.props.userData });
    console.log(this.props.logout);
  }

  logoutClicked = () => {
    window.sessionStorage.clear();
    this.props.history.push("/main");
  };

  render() {
    console.log(this.state.userData);
    if (this.state.userData === null) {
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
            This is the User's posts section
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
