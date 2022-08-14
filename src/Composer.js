import { getDownloadURL, ref as sRef, uploadBytes } from "firebase/storage";
import React from "react";
import { push, ref, set } from "firebase/database";
import { database, storage } from "./firebase";

// Save the Firebase message folder name as a constant to avoid bugs due to misspelling
const MESSAGE_FOLDER_NAME = "messages";

class Composer extends React.Component {
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
    };
  }

  // Note use of array fields syntax to avoid having to manually bind this method to the class
  writeData = (e) => {
    e.preventDefault();
    const messageListRef = ref(database, MESSAGE_FOLDER_NAME);
    const newMessageRef = push(messageListRef);

    //reference to storage
    e.preventDefault();
    const storageRef = sRef(storage, `${this.state.fileInputFile.name}`);
    console.log(this.state.fileInputFile);

    uploadBytes(storageRef, this.state.fileInputFile).then((snapshot) => {
      console.log("Uploaded a blob or file!");

      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);

        set(newMessageRef, {
          date: this.state.timeStamp,
          message: this.state.text,
          imagelink: downloadURL,
          likes: this.state.likes,
        });
      });
    });
  };

  handleChange = (e) => {
    this.setState({
      text: e.target.value,
      timeStamp: new Date().toLocaleTimeString(),
    });
  };

  render() {
    return (
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
    );
  }
}

export default Composer;
