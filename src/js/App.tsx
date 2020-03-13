import React from "react";
import axios from "axios";
import CardList from "./components/CardList";

export interface Monster {
  id: number;
  name: string;
  email: string;
}
interface AppState {
  monsters: Monster[];
}
class App extends React.Component<{}, AppState> {
  state: AppState = {
    monsters: []
  };
  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => response.data)
      .then(data => {
        this.setState({ monsters: data });
      });
  }
  render() {
    return (
      <div className="App">
        <CardList monsters={this.state.monsters} />
      </div>
    );
  }
}

export default App;
