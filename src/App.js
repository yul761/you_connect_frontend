import React, { Component } from "react";
import AuthPage from "./components/authPage";
import MainPage from "./components/mainPage";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  componentDidMount() {}

  // userprofile = () => {
  //   console.log(this.state.curToken);
  //   Axios.get(`${backendUrl}/userInfo`, {
  //     headers: { "auth-token": window.sessionStorage.getItem("curToken") }
  //   }).then(response => {
  //     // this.setState({ curUser: response.data });
  //     console.log(response.data);
  //   });
  // };

  // postOne = () => {
  //   let profile = {
  //     content: "frontend test",
  //     images: "images frontend test",
  //     videos: "video frontend test",
  //     likes: 2
  //   };
  //   Axios.post(`${backendUrl}/post/add`, profile, {
  //     headers: { "auth-token": this.state.curToken }
  //   }).then(response => {
  //     // this.setState({ curUser: response.data });
  //     console.log(response.data);
  //   });
  // };

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/login" component={AuthPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
