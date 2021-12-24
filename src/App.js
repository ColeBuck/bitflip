import React from 'react';
import Bit from './components/Bit'
import './App.css';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      bits: [],
      decimal: 0
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
    });
  }

  render() {
    return <div className="App">
      <h1>BitFlip</h1>

      <div class="nav-row">
        <button onClick={() => this.addBits(1)}>Add Bit</button>
        <button onClick={() => this.removeBits(1)}>Remove Bit</button>
      </div>

      <div class="nav-row">
        <button onClick={() => this.addBits(8)}>Add 8 Bits</button>
        <button onClick={() => this.removeBits(8)}>Remove 8 Bits</button>
      </div>

      <p>Current Bits: {this.state.bits.length}</p>
      <p>Decimal = {this.state.decimal}</p>

      {this.state.bits.map((bit, index) => <Bit index={index} on={bit} flipBit={this.flipBit.bind(this)} />)}
    </div>
  }
}

export default App;
