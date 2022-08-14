import React from "react";

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  render() {
    return (
      <div>
        <form>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={(e) => {
              this.setState({ email: e.target.value });
            }}
          />
          <br />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={(e) => {
              this.setState({ password: e.target.value });
            }}
          />
          <br />
          <input
            type="submit"
            value="Signup"
            onClick={(e) =>
              this.props.handleSignup(e, this.state.email, this.state.password)
            }
          />
        </form>
        <input
          type="submit"
          onClick={(e) =>
            this.props.handleLogin(e, this.state.email, this.state.password)
          }
          value="Login"
        />
      </div>
    );
  }
}
