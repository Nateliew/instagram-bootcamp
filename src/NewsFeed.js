import { onChildAdded, ref, update } from "firebase/database";
import React from "react";
import Card from "react-bootstrap/Card";
import { database } from "./firebase";
import "bootstrap/dist/css/bootstrap.min.css";

// Save the Firebase message folder name as a constant to avoid bugs due to misspelling
const MESSAGE_FOLDER_NAME = "messages";

class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
    // Initialise empty messages array in state to keep local state in sync with Firebase
    // When Firebase changes, update local state, which will update local UI
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    const messagesRef = ref(database, MESSAGE_FOLDER_NAME);
    // onChildAdded will return data for every child at the reference and every subsequent new child
    onChildAdded(messagesRef, (data) => {
      // Add the subsequent child to local component state, initialising a new array to trigger re-render
      this.setState((state) => ({
        // Store message key so we can use it as a key in our list items when rendering messages
        messages: [...state.messages, { key: data.key, val: data.val() }],
      }));
    });
  }

  handleLikes = (element, i) => {
    console.log(i);
    console.log(element.val);
    console.log(this.state.messages);
    const newMessages = this.state.messages;
    //place what we display in a new object
    const newMessage = {
      // likes: element.val.likes + 1,
      message: newMessages[i].val.message,
      imagelink: newMessages[i].val.imagelink,
      date: newMessages[i].val.date,
      likes: (newMessages[i].val.likes += 1),
    };

    //place the messages in a new array
    const newArray = this.state.messages;
    //target where we have clicked
    newArray[i].val = newMessage;
    newArray[i].key = element.key;

    //set the state of the newArray as the new messages
    this.setState({
      messages: newArray,
    });

    //update the database again
    const updates = {
      [`/messages/${element.key}`]: newMessage,
    };
    return update(ref(database), updates);
  };

  render() {
    // Convert posts in state to post JSX elements to render
    //map out every single element corresponding to its index
    let postCards = this.state.messages.map((element, i) => (
      <div key={element.key}>
        <Card bg="dark" key={element.key} className="Card">
          <Card.Img
            variant="top"
            src={element.val.imagelink}
            className="Card-Img"
            width="30px"
            height="30px"
          />
          {/* <Card.Text>{element.val.authorEmail}</Card.Text> */}
          <Card.Text>{element.val.text}</Card.Text>
          <Card.Text>No.of likes {element.val.likes}</Card.Text>
        </Card>
        <br />
        {/* display the number of likes here, pass in each element with its index */}
        <button
          onClick={(e) => {
            this.handleLikes(element, i);
          }}
        >
          Like
        </button>
      </div>
    ));
    // Reverse the order of posts such that newest posts are on top
    postCards.reverse();
    return postCards;
  }
}

export default NewsFeed;
