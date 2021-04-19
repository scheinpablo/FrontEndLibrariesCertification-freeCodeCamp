const { Provider, connect } = ReactRedux;
const { applyMiddleware, createStore, combineReducers, bindActionCreators } = Redux;
const INCREMENT_SESSION = 'INCREMENT_SESSION';
const DECREMENT_SESSION = 'DECREMENT_SESSION';
const INCREMENT_BREAK = 'INCREMENT_BREAK';
const DECREMENT_BREAK = 'DECREMENT_BREAK';
const TOGGLE_PLAY_PAUSE = 'TOGGLE_PLAY_PAUSE';
const NEW_COUNTDOWN_STEP = 'NEW_COUNTDOWN_STEP';
const RESET = 'RESET';


const setTimer = () => {
  setTimeout(
  () => {store.dispatch(newCountDownStepAction());},
  1000);

};

const countdown = (state = { playing: false, value: 25 * 60, onBreak: false, sessionLength: 25 * 60, breakLength: 5 * 60 }, action) => {
  switch (action.type) {
    case TOGGLE_PLAY_PAUSE:
      if (!state.playing) {
        setTimer();
      }
      return { ...state, playing: !state.playing };
    case NEW_COUNTDOWN_STEP:
      if (state.playing) {
        setTimer();
        if (state.value == 0) {
          document.getElementById('beep').play();
          return { ...state, onBreak: !state.onBreak, value: state.onBreak ? state.sessionLength : state.breakLength };
        }
        return { ...state, value: state.value - 1 };
      }
      return state;
    case RESET:
      document.getElementById('beep').pause();
      document.getElementById('beep').currentTime = 0;
      return { playing: false, value: 25 * 60, onBreak: false, sessionLength: 25 * 60, breakLength: 5 * 60 };
    case INCREMENT_SESSION:
      if (state.sessionLength < 60 * 60) return { ...state, sessionLength: state.sessionLength + 60, value: state.sessionLength + 60 };
      return state;
    case INCREMENT_BREAK:
      if (state.breakLength < 60 * 60) return { ...state, breakLength: state.breakLength + 60 };
      return state;
    case DECREMENT_BREAK:
      if (state.breakLength > 60) return { ...state, breakLength: state.breakLength - 60 };
      return state;
    case DECREMENT_SESSION:
      if (state.sessionLength > 60) return { ...state, sessionLength: state.sessionLength - 60, value: state.sessionLength - 60 };
      return state;
    default:
      return state;}

};

const incrementSessionAction = () => {
  return {
    type: INCREMENT_SESSION };

};
const decrementSessionAction = () => {
  return {
    type: DECREMENT_SESSION };

};

const incrementBreakAction = () => {
  return {
    type: INCREMENT_BREAK };

};

const decrementBreakAction = () => {
  return {
    type: DECREMENT_BREAK };

};

const togglePlayPauseAction = () => {
  return {
    type: TOGGLE_PLAY_PAUSE };

};

const resetAction = () => {
  return {
    type: RESET };

};

const newCountDownStepAction = () => {
  return {
    type: NEW_COUNTDOWN_STEP };

};

const AppWrapper = props => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "app-wrapper" }, /*#__PURE__*/
    React.createElement(Provider, { store: store }, /*#__PURE__*/
    React.createElement(ClockWidget, null))));



};

const ClockWidget = props => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "clock-widget" }, /*#__PURE__*/
    React.createElement("h1", null, "25 + 5 Clock"), /*#__PURE__*/
    React.createElement(LengthControlsContainer, null), /*#__PURE__*/
    React.createElement(CountdownContainer, null), /*#__PURE__*/
    React.createElement(PlayerControlsContainer, null)));


};

const LengthControls = props => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "length-controls" }, /*#__PURE__*/
    React.createElement(LengthControl, { title: "Break Length", name: "break", value: props.breakLength, onInc: props.incrementBreak, onDec: props.decrementBreak, enabled: props.enabled }), /*#__PURE__*/
    React.createElement(LengthControl, { title: "Session Length", name: "session", value: props.sessionLength, onInc: props.incrementSession, onDec: props.decrementSession, enabled: props.enabled })));


};

const mapStateToLengthControlsProps = state => {
  return { sessionLength: state.sessionLength, breakLength: state.breakLength, enabled: !state.playing };
};

const mapDispatchToLengthControlsProps = dispatch => {
  return {
    incrementSession: () => {
      dispatch(incrementSessionAction());
    },
    decrementSession: () => {
      dispatch(decrementSessionAction());
    },
    incrementBreak: () => {
      dispatch(incrementBreakAction());
    },
    decrementBreak: () => {
      dispatch(decrementBreakAction());
    } };

};

const LengthControlsContainer = connect(mapStateToLengthControlsProps, mapDispatchToLengthControlsProps)(LengthControls);

const LengthControl = props => {
  var enabledString = props.enabled ? '' : ' disabled';
  return /*#__PURE__*/(
    React.createElement("div", { className: "length-control" }, /*#__PURE__*/
    React.createElement("h5", { id: props.name + "-label" }, props.title), /*#__PURE__*/
    React.createElement("div", { className: "inc-dec-control" }, /*#__PURE__*/
    React.createElement("button", { onClick: props.onDec, id: props.name + '-decrement', className: "inc-dec-button" + enabledString }, /*#__PURE__*/
    React.createElement("i", { className: "fas fa-arrow-down" })), /*#__PURE__*/

    React.createElement("div", { id: props.name + '-length' }, props.value / 60), /*#__PURE__*/
    React.createElement("button", { onClick: props.onInc, id: props.name + '-increment', className: "inc-dec-button" + enabledString }, /*#__PURE__*/
    React.createElement("i", { className: "fas fa-arrow-up" })))));




};

const Countdown = props => {
  const secondsToMMSSString = totalSeconds => {
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    var minutesString = minutes.toString();
    if (minutes < 10) minutesString = '0' + minutesString;
    var secondsString = seconds.toString();
    if (seconds < 10) secondsString = '0' + secondsString;

    return minutesString + ':' + secondsString;
  };
  var endingString = '';
  if (props.countdown < 60) endingString = ' ending';
  return /*#__PURE__*/(
    React.createElement("div", { className: 'countdown' + endingString }, /*#__PURE__*/
    React.createElement("div", { id: "timer-label" }, props.onBreak ? 'Break' : 'Session'), /*#__PURE__*/
    React.createElement("div", { id: "time-left" }, secondsToMMSSString(props.countdown)), /*#__PURE__*/
    React.createElement("audio", { id: "beep", preload: "auto", src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" })));


};

const mapStateToCountdownProps = state => {
  return { countdown: state.value, breakLength: state.breakLength, sessionLength: state.sessionLength, onBreak: state.onBreak };
};

const CountdownContainer = connect(mapStateToCountdownProps)(Countdown);

const PlayerControls = props => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "player-controls" }, /*#__PURE__*/
    React.createElement("button", { id: "start_stop", onClick: props.togglePlayPause }, /*#__PURE__*/
    React.createElement("i", { className: "fas fa-play" }), /*#__PURE__*/
    React.createElement("i", { className: "fas fa-pause" })), /*#__PURE__*/

    React.createElement("button", { id: "reset", onClick: props.reset }, /*#__PURE__*/
    React.createElement("i", { className: "fas fa-sync-alt" }))));



};

const mapDispatchToPlayerControlsProps = dispatch => {
  return {
    togglePlayPause: () => {
      dispatch(togglePlayPauseAction());
    },
    reset: () => {
      dispatch(resetAction());
    } };

};
const PlayerControlsContainer = connect(null, mapDispatchToPlayerControlsProps)(PlayerControls);
const store = createStore(
countdown);


ReactDOM.render( /*#__PURE__*/React.createElement(AppWrapper, null), document.getElementById('app'));