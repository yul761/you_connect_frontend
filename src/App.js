import React, { Component } from "react";
import AuthPage from "./components/authPage";
import MainPage from "./components/mainPage";
import { Switch, Route, Redirect } from "react-router-dom";
import ReactNotifications from "react-notifications-component";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ReactNotifications />
        <Redirect from="/" to="/main" />
        <Switch>
          <Route path="/main" component={MainPage} />
          <Route path="/login" component={AuthPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
