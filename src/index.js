import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import ProgressBar from './progress-bar';

function ProgressTimer(props) {
  return (
    <div>
      <h2>{msToTime(props.remain)}</h2>
      <div className='main-progress-bar'>
        <ProgressBar complete={100 - props.remain / props.duration * 100}/>
      </div>
    </div>
  );
}

class PomodoroTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isWorking: true,
      currentDate: new Date(),
      endDate: null,
      remain: props.workDuration,
      isTicking: false,
    }

    this.toggleStartStop = this.toggleStartStop.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  toggleStartStop() {
    this.setState(state => ({
      isTicking: !state.isTicking,
      endDate: !state.isTicking ? new Date(new Date().getTime() + state.remain) : null,
    }));
  }

  resetTimer() {
    this.setState(state => ({
      isTicking: false,
      endDate: null,
      isWorking: !state.isWorking,
      remain: !state.isWorking ? this.props.workDuration : this.props.restDuration,
    }));
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      10,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    if (this.state.remain > 0) {
      this.setState(state => ({
        currentDate: new Date(),
        remain: state.isTicking ? state.endDate - new Date() : state.remain,
      }));
    }
    else {
      // 一度停止してから再開
      this.setState(state => ({
        isTicking: false,
        endDate: null,
        isWorking: !state.isWorking,
        remain: !state.isWorking ? this.props.workDuration : this.props.restDuration,
      }));

      this.toggleStartStop();
    }
  }

  render(props) {
    return (
      <div>
        <ProgressTimer remain={this.state.remain}
          duration={this.state.isWorking ? this.props.workDuration : this.props.restDuration} />
        <div className='center'>
          <button onClick={this.toggleStartStop}>
            {this.state.isTicking ? 'Stop' : 'Start'}
          </button>
          <button onClick={this.resetTimer}>
            Reset
          </button>
        </div>
      </div>
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
      <PomodoroTimer workDuration={10*1000} restDuration={3*1000} />
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);