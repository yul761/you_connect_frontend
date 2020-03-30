import React, { Component } from "react";
import Axios from "axios";

var backendUrl = "http://3.15.233.84:4000";

class App extends Component {
  constructor() {
    super();
    this.state = {
      curUser: undefined,
      curToken: undefined
    };
  }
  componentDidMount() {}

  signupForm = e => {
    e.preventDefault();
    console.log(e.target.username.value);
    let username = e.target.username.value;
    let email = e.target.email.value;
    let password = e.target.password.value;
    let profile = {
      username: username,
      email: email,
      password: password
    };

    Axios.post(`${backendUrl}/auth/signup`, profile).then(response => {
      console.log(response);
    });
  };

  loginForm = e => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    let profile = {
      email: email,
      password: password
    };

    Axios.post(`${backendUrl}/auth/login`, profile).then(response => {
      console.log(response);
      this.setState({ curToken: response.data.accesstoken });
    });
  };

  userprofile = () => {
    console.log(this.state.curToken);
    Axios.get(`${backendUrl}/userInfo`, {
      headers: { "auth-token": this.state.curToken }
    }).then(response => {
      // this.setState({ curUser: response.data });
      console.log(response.data);
    });
  };

  postOne = () => {
    let profile = {
      content: "frontend test",
      images: "images frontend test",
      videos: "video frontend test",
      likes: 2
    };
    Axios.post(`${backendUrl}/post/add`, profile, {
      headers: { "auth-token": this.state.curToken }
    }).then(response => {
      // this.setState({ curUser: response.data });
      console.log(response.data);
    });
  };
  render() {
    return (
      <div>
        <form
          onSubmit={e => {
            this.signupForm(e);
          }}
        >
          <label>
            UserName :<input type="text" name="username"></input>
          </label>
          <label>
            Email :<input type="email" name="email"></input>
          </label>
          <label>
            password :<input type="password" name="password"></input>
          </label>

          <input type="submit" value="Submit" />
        </form>

        <form
          onSubmit={e => {
            this.loginForm(e);
          }}
        >
          <label>
            Email :<input type="email" name="email"></input>
          </label>
          <label>
            password :<input type="password" name="password"></input>
          </label>

          <input type="submit" value="Submit" />
        </form>

        <button onClick={() => this.userprofile()}>check user profile</button>
        <button onClick={() => this.postOne()}>post one post</button>
      </div>
    );
  }
}

export default App;
