import React from "react";
// import logo from "./logo.png";
import "./App.css";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Registration from "./Registration";
import NewsFeed from "./NewsFeed";
import Composer from "./Composer";
import { Routes, Route } from "react-router-dom";

const auth = getAuth();
// Save the Firebase message folder name as a constant to avoid bugs due to misspelling

class App extends React.Component {
  constructor(props) {
    super(props);
    // Initialise empty messages array in state to keep local state in sync with Firebase
    // When Firebase changes, update local state, which will update local UI
    this.state = {
      text: "",
      timeStamp: Date(),
      fileInputValue: "",
      fileInputFile: null,
      link: "",
      name: "",
      likes: 0,
      showRegistration: true,
      isLogin: false,
    };
  }

  signup = (e, email, password) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then(
      console.log("successfully signed up")
    );
  };
  login = (e, email, password) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => this.setState({ showRegistration: false, isLogin: true }))
      .catch((err) => console.log(err));
  };

  logout = () => {
    signOut(auth);
    console.log("logged out");
    this.setState({ showRegistration: true, isLogin: false });
  };
  render() {
    // Convert messages in state to message JSX elements to render
    return (
      <div className="App">
        <header className="App-header">
          {/* testing */}
          {/* {if true show the registration, else display the instagram page} */}
          {/* {this.state.showRegistration ? (
            <div>
              <Registration
                handleSignup={this.signup}
                handleLogin={this.login}
              />
            </div>
          ) : (
            // this.state.fileInputFile !== null ? (
            <div>
              {this.state.isLogin ? <Composer /> : null}
              <NewsFeed />
            </div>
          )} */}

          <Routes>
            <Route path="/" element={Registration} />
            <Route path="/composer" element={Composer} />
            <Route path="/newsfeed" element={NewsFeed} />
          </Routes>

          <br />
          <input
            type="submit"
            onClick={(e) =>
              this.logout(e, this.state.email, this.state.password)
            }
            value="Logout"
          />
        </header>
      </div>
    );
  }
}

export default App;
