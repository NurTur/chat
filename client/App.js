import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class App extends Component {
  state = {
    endpoint: "http://localhost:4001",
    arr: []
  };

  input = React.createRef();

  componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);
    socket.on("enter message", col => {
      this.setState(prevState => ({ arr: [...prevState.arr, col] }));
    });
  }

  handleSubmit(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const socket = socketIOClient(this.state.endpoint);
      socket.emit("enter message", this.input.current.value);
      this.input.current.value = "";
    }
  }

  render() {
    console.log("ffff");
    return (
      <div>
        <ul id="messages">
          {this.state.arr.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>

        <form id="form">
          <label for="message">&gt;</label>
          <input
            id="input"
            defaultValue=""
            ref={this.input}
            onKeyDown={this.handleSubmit.bind(this)}
          />
        </form>
      </div>
    );
  }
}
export default App;
