import React, { Component } from "react";
import PersonList from "./component/PersonList";

class App extends Component {
  state = {people: []}
  render() {
    return (
      <div className="App">
        <PersonList />
      </div>
    );
  }
}

export default App;
