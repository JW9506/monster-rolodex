import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CardList from "./components/CardList";
import SearchBox from "./components/SearchBox/index";

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
    const filteredMonsters = this.state.monsters.filter(m => {
      return m.name
        .toLowerCase()
        .includes(this.state.searchField.toLowerCase());
    });
    return (
      <div className="App">
        <h1>Monster Rolodex</h1>
        <SearchBox
          onChangeHandler={this.searchFieldHandler}
          placeholder="search monster"
        />

        <CardList monsters={filteredMonsters} />
        <Link to="/about" style={{color: "#fff"}}>About</Link>
      </div>
    );
  }
}

export default App;
