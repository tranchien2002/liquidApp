import React, { Component } from 'react';
class Cell extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return <span className='cell'>{''}</span>;
  }
}
export default Cell;
