import React from 'react'
import './Bit.css';

class Bit extends React.Component {

    render() {
      return (
            <div class="bit-container">
                <button class="bit" onClick={() => this.props.flipBit(this.props.index)}> {this.props.on ? '1' : '0'} </button>
            </div>
      )
    }
}

export default Bit;