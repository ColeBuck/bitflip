import React from 'react';
import Bit from './components/Bit'
import './App.css';

class App extends React.Component {

  constructor() {
    super();
    var startingDifficulty = "Easy"
    this.state = {
      bits: [],
      decimal: 0,
      difficulty: startingDifficulty,
      goal: this.generateGoal(startingDifficulty),
      score: 0
    };
  }

  addBits(amount) {
    var newBits = this.state.bits.slice();
    for(let i=0; i < amount; i++) {
      newBits.push(false);
    }
    this.setState({
      bits: newBits
    }, this.calculateDecimal);
  }

  removeBits(amount) {
    var newBits = this.state.bits.slice();
    newBits.splice(this.state.bits.length-amount, this.state.bits.length);
    this.setState({
      bits: newBits,
    }, this.calculateDecimal);
  }

  flipBit(index) {
    var newBits = this.state.bits.slice();
    newBits[index] = !newBits[index]
    this.setState({
      bits: newBits,
    }, this.calculateDecimal);
  }

  calculateDecimal() {
    var temp = 0
    for(let i=0; i < this.state.bits.length; i++) {
      if(this.state.bits[i] == true) {
        temp += Math.pow(2, i)
      }
    }

    this.setState({
      decimal: temp
    }, this.checkForGoal);
  }

  checkForGoal() {
    if(this.state.decimal == this.state.goal) {
      var newGoal = this.generateGoal(this.state.difficulty)
      // re-generate new goal until it's different than the current decimal value
      while(newGoal == this.state.decimal) {
        newGoal = this.generateGoal(this.state.difficulty)
      }

      this.setState({
        goal: newGoal,
        score: this.state.score + 1
      });
    }
  }

  generateGoal(difficulty) {
    switch(difficulty) {
      case "Easy":
        return Math.floor(Math.random() * 16)
      case "Medium":
        return Math.floor(Math.random() * 32) + 16
      case "Hard":
        return Math.floor(Math.random() * 64) + 48
      case "Super Hard":
        return Math.floor(Math.random() * 2048) + 2048
    }
  }

  changeDifficulty() {
    this.setState({
      difficulty: document.getElementById("difficulty-select").value,
      goal: this.generateGoal(document.getElementById("difficulty-select").value)
    });
  }

  render() {
    return <div className="App">
      <h1>BitFlip</h1>

      <label for="difficulty-select">Difficulty: </label>
      <select id="difficulty-select" onChange={() => this.changeDifficulty()}>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
        <option value="Super Hard">Super Hard</option>
      </select>

      <p>Current Bits: {this.state.bits.length}</p>

      <div class="nav-row">
        <button onClick={() => this.addBits(1)}>Add Bit</button>
        <button onClick={() => this.removeBits(1)}>Remove Bit</button>
      </div>

      <div class="nav-row">
        <button onClick={() => this.addBits(8)}>Add 8 Bits</button>
        <button onClick={() => this.removeBits(8)}>Remove 8 Bits</button>
      </div>

      <p>Decimal = {this.state.decimal}</p>
      <p>Goal: {this.state.goal}</p>
      <h3>Score: {this.state.score}</h3>

      {this.state.bits.map((bit, index) => <Bit index={index} on={bit} flipBit={this.flipBit.bind(this)} />)}
    </div>
  }
}

export default App;
