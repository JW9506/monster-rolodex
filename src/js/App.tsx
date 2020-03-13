import React from "react";

class App extends React.Component {
  state = {
    monsters: [
      { name: "Frankenstein " },
      { name: "Dracula" },
      { name: "Zombie" }
    ]
  };
  render() {
    return (
      <div className="app">
        {this.state.monsters.map(monster => (
          <li key={monster.name}>{monster.name}</li>
        ))}
      </div>
    );
  }
}

export default App;
