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
  searchField: string;
}
class App extends React.Component<{}, AppState> {
  state: AppState = {
    monsters: [],
    searchField: ""
  };
  searchFieldHandler: React.ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();
    this.setState({ searchField: e.target.value });
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
    const filteredMonsters = this.state.monsters.filter((m) => {
      return m.name.toLowerCase().startsWith(this.state.searchField.toLowerCase());
    });
    return (
      <div className="App">
        <input
          type="search"
          placeholder="search monster"
          onChange={this.searchFieldHandler}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
