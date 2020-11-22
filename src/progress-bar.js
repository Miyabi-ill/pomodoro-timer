import React from 'react';

function ProgressBar(props) {
  const fillerStyles = {
    width: `${Math.round(props.complete * 100) / 100}%`,
  }
  return (
    <div className='progress-bar-container'>
      <div className='progress-bar-filler' style={fillerStyles}>
      </div>
    </div>
  );
}

//<span className='progress-bar-label'>{Math.round(props.complete * 100) / 100}%</span>

export default ProgressBar;