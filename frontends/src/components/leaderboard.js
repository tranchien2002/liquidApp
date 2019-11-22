import React from 'react';
import './leaderboard.css';
import Row from './Row';
class LeaderBoard extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='leadheader'>
          <h2>Leaderboard</h2>
        </div>
        <Row />
      </div>
    );
  }
}

export default LeaderBoard;
