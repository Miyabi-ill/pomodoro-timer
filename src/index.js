import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import ProgressBar from './progress-bar';

class ProgressTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      endDate: null,
      remain: props.duration,
      isTicking: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isTicking: !state.isTicking,
      endDate: !state.isTicking ? new Date(new Date().getTime() + state.remain) : null,
    }));
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState(state => ({
      currentDate: new Date(),
      remain: state.isTicking ? state.endDate - new Date() : state.remain,
    }));
  }

  render() {
    return (
      <div>
        <h2>{msToTime(this.state.remain)}</h2>
        <div className='main-progress-bar'>
        <ProgressBar complete={100 - this.state.remain / this.props.duration * 100}/>
        </div>
        <div className='center'>
          <button onClick={this.handleClick}>
            {this.state.isTicking ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>
    );
  }
}

class PomodoroTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isWorking: true,
    }
  }

  render(props) {
    return (
      <ProgressTimer duration={25*60*1000}></ProgressTimer>
    );
  }
}

function msToTime(duration) {
  var seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');

  return hours + ":" + minutes + ":" + seconds;
}

function tick() {
  const element = (
    <div>
      <h1>Pomodoro Timer</h1>
      <PomodoroTimer />
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);