render() {
    // Convert messages in state to message JSX elements to render
    return (
      <div className="App">
        <header className="App-header">
          {/* {if true show the registration, else display the instagram page} */}
          {this.state.showRegistration ? (
            <Registration handleSignup={this.signup} handleLogin={this.login} />
          ) : this.state.messages.length <= 0 ? (
            <form>
              Type here:
              <input
                type="text"
                value={this.state.text}
                onChange={this.handleChange}
              />
              <br />
              <br />
              <input
                type="file"
                value={this.state.fileInputValue}
                onChange={(e) =>
                  this.setState({
                    fileInputFile: e.target.files[0],
                    fileInputValue: e.target.value,
                  })
                }
              />
              <br />
              <button onClick={this.writeData}>Send</button>
            </form>
          ) : (
            <NewsFeed />
          )}
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