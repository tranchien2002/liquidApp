import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
const Row = () => {
  return (
    <div className='row colheader'>
      <div className='col-xs-1'>
        <h4>#</h4>
      </div>
      <div className='col-xs-5'>
        <h4>#</h4>
      </div>
      <div className='col-xs-3 recent'>
        <h4>#</h4>
      </div>
      <div className='col-xs-3 alltime'>
        <h4>#</h4>
      </div>
    </div>
  );
};

export default Row;
