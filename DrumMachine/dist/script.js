const { Provider, connect } = ReactRedux;
const { applyMiddleware, createStore, combineReducers, bindActionCreators } = Redux;
const CHANGE_VOLUME = 'CHANGE_VOLUME';
const TOGGLE_POWER = 'TOGGLE_POWER';
const TOGGLE_BANK = 'TOGGLE_BANK';
const CLICKED_KEY = 'CLICKED_KEY';

const volume = (state = 50, action) => {
  switch (action.type) {
    case CHANGE_VOLUME:
      return action.newValue;
    default:
      return state;}

};

const power = (state = true, action) => {
  switch (action.type) {
    case TOGGLE_POWER:
      return !state;
    default:
      return state;}

};

const togglePowerAction = newValue => {
  return {
    type: TOGGLE_POWER,
    newValue: newValue };

};

const toggleBankAction = newValue => {
  return {
    type: TOGGLE_BANK,
    newValue: newValue };

};

const changeVolumeAction = newValue => {
  return {
    type: CHANGE_VOLUME,
    newValue: newValue };

};

const clickedKeyAction = key => {
  return {
    type: CLICKED_KEY,
    key: key };

};


const bank = (state = true, action) => {
  switch (action.type) {
    case TOGGLE_BANK:
      return !state;
    default:
      return state;}

};

const display = (state = '', action) => {
  switch (action.type) {
    case CHANGE_VOLUME:
      return 'Volume: ' + action.newValue.toString();
    case TOGGLE_BANK:
      if (action.newValue) {
        return 'Smooth Piano Kit';
      }
      return 'Heater Kit';
    case CLICKED_KEY:
      return action.key;
    case TOGGLE_POWER:
      if (!action.newValue) return '';
      return state;
    default:
      return state;}

};


class AppWrapper extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { class: "app-wrapper" }, /*#__PURE__*/
      React.createElement(Provider, { store: store }, /*#__PURE__*/
      React.createElement(DrumMachine, null))));



  }}


const DrumMachine = props => {
  return /*#__PURE__*/(
    React.createElement("div", { id: "drum-machine" }, /*#__PURE__*/
    React.createElement("div", { id: "machine-title" }, /*#__PURE__*/
    React.createElement("h6", null, "FCC ", /*#__PURE__*/React.createElement("i", { id: "freecodecamp-icon", className: "fab fa-free-code-camp" }, "   "), " ")), /*#__PURE__*/

    React.createElement("div", { id: "machine-body" }, /*#__PURE__*/
    React.createElement(MachineKeysContainer, null), /*#__PURE__*/
    React.createElement(MachineControls, null))));



};

const MachineKeys = props => {
  const bankOnSoundNames = ['Chord-1', 'Chord-2', 'Chord-3', 'Shaker', 'Open-HH', 'Closed-HH', 'Puchy-Kick', 'Side-Stick', 'Snare'];
  const bankOffSoundNames = ['Heater-1', 'Heater-2', 'Heater-3', 'Heater-4', 'Clap', 'Open-HH', 'Kick-N-Hat', 'Kick', 'Closed-HH'];

  const bankOnSoundUrls = ['https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3', 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3',
  'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3',
  'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3',
  'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3',
  'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3',
  'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
  'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
  'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'];

  const bankOffSoundUrls = ['https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'];



  const soundNames = props.bank ? bankOnSoundNames : bankOffSoundNames;

  const soundUrls = props.bank ? bankOnSoundUrls : bankOffSoundUrls;

  const escFunction = React.useCallback(event => {
    console.log(event.keyCode.toString());
    if (event.keyCode === 27) {
      console.log('esc');
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);
  const vol = props.volume / 100;

  return /*#__PURE__*/(
    React.createElement("div", { id: "machine-keys" }, /*#__PURE__*/
    React.createElement(KeyButton, { soundUrl: soundUrls[0], soundName: soundNames[0], keyCode: 81, onClick: () => {props.clickedKey(soundNames[0]);}, power: props.power, volume: vol }, "Q"), /*#__PURE__*/
    React.createElement(KeyButton, { soundUrl: soundUrls[1], soundName: soundNames[1], keyCode: 87, onClick: () => {props.clickedKey(soundNames[1]);}, power: props.power, volume: vol }, "W"), /*#__PURE__*/
    React.createElement(KeyButton, { soundUrl: soundUrls[2], soundName: soundNames[2], keyCode: 69, onClick: () => {props.clickedKey(soundNames[2]);}, power: props.power, volume: vol }, "E"), /*#__PURE__*/
    React.createElement(KeyButton, { soundUrl: soundUrls[3], soundName: soundNames[3], keyCode: 65, onClick: () => {props.clickedKey(soundNames[3]);}, power: props.power, volume: vol }, "A"), /*#__PURE__*/
    React.createElement(KeyButton, { soundUrl: soundUrls[4], soundName: soundNames[4], keyCode: 83, onClick: () => {props.clickedKey(soundNames[4]);}, power: props.power, volume: vol }, "S"), /*#__PURE__*/
    React.createElement(KeyButton, { soundUrl: soundUrls[5], soundName: soundNames[5], keyCode: 68, onClick: () => {props.clickedKey(soundNames[5]);}, power: props.power, volume: vol }, "D"), /*#__PURE__*/
    React.createElement(KeyButton, { soundUrl: soundUrls[6], soundName: soundNames[6], keyCode: 90, onClick: () => {props.clickedKey(soundNames[6]);}, power: props.power, volume: vol }, "Z"), /*#__PURE__*/
    React.createElement(KeyButton, { soundUrl: soundUrls[7], soundName: soundNames[7], keyCode: 88, onClick: () => {props.clickedKey(soundNames[7]);}, power: props.power, volume: vol }, "X"), /*#__PURE__*/
    React.createElement(KeyButton, { soundUrl: soundUrls[8], soundName: soundNames[8], keyCode: 67, onClick: () => {props.clickedKey(soundNames[8]);}, power: props.power, volume: vol }, "C")));


};

const KeyButton = props => {
  const [active, setActive] = React.useState(false);
  var activeString = active ? 'active' : '';

  const keyDownFunction = React.useCallback(event => {
    if (event.keyCode === props.keyCode) {
      onButtonClicked();
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener("keydown", keyDownFunction, false);

    return () => {
      document.removeEventListener("keydown", keyDownFunction, false);
    };
  }, []);


  const activateButton = () => {
    setActive(true);
    setTimeout(
    () => setActive(false),
    100);

  };
  const onButtonClicked = () => {
    console.log(props.volume);
    document.getElementById(props.children).volume = props.volume;
    document.getElementById(props.children).play();
    activateButton();
    props.onClick();
  };

  const disabledString = !props.power ? 'disabled-button' : '';

  return /*#__PURE__*/(
    React.createElement("button", { className: 'drum-pad ' + disabledString + activeString, id: props.soundName, onClick: onButtonClicked },
    props.children, /*#__PURE__*/
    React.createElement("audio", { id: props.children, className: "clip", src: props.soundUrl, preload: "auto" })));

};

const mapStateToMachineProps = state => {
  return { power: state.power, bank: state.bank, volume: state.volume };
};

const mapDispatchToMachineProps = dispatch => {
  return {
    clickedKey: key => {
      dispatch(clickedKeyAction(key));
    } };

};

const MachineKeysContainer = connect(mapStateToMachineProps, mapDispatchToMachineProps)(MachineKeys);

const MachineControls = props => {
  return /*#__PURE__*/(
    React.createElement("div", { id: "machine-controls" }, /*#__PURE__*/
    React.createElement("div", null), /*#__PURE__*/
    React.createElement(PowerSwitcherContainer, null), /*#__PURE__*/
    React.createElement(DisplayContainer, null), /*#__PURE__*/
    React.createElement(VolumeSliderContainer, null), /*#__PURE__*/
    React.createElement(BankSwitcherContainer, null), /*#__PURE__*/
    React.createElement("div", null)));


};

const Display = props => {
  return /*#__PURE__*/(
    React.createElement("div", { id: "display" },
    props.power ? props.displayMessage : ''));


};

const mapDisplayStateToProps = state => {
  return { displayMessage: state.display, power: state.power };
};

const DisplayContainer = connect(mapDisplayStateToProps)(Display);

const PowerSwitcher = props => {
  return /*#__PURE__*/(
    React.createElement(SwitcherWidget, { title: "Power", onToggle: () => {props.togglePower(!props.power);}, value: props.power }));

};

const mapStateToPowerProps = state => {
  return { power: state.power };
};

const mapDispatchToPowerProps = dispatch => {
  return {
    togglePower: newValue => {
      dispatch(togglePowerAction(newValue));
    } };

};

const PowerSwitcherContainer = connect(mapStateToPowerProps, mapDispatchToPowerProps)(PowerSwitcher);

const BankSwitcher = props => {

  const onBankSwitcherToggle = () => {
    if (props.power) {
      props.toggleBank(!props.bank);
    }
  };

  return /*#__PURE__*/(
    React.createElement(SwitcherWidget, { title: "Bank", onToggle: onBankSwitcherToggle, value: props.bank }));

};
const mapStateToBankProps = state => {
  return { bank: state.bank, power: state.power };
};

const mapDispatchToBankProps = dispatch => {
  return {
    toggleBank: newValue => {
      dispatch(toggleBankAction(newValue));
    } };

};

const BankSwitcherContainer = connect(mapStateToBankProps, mapDispatchToBankProps)(BankSwitcher);

const SwitcherWidget = props => {
  const toggleSwitcher = () => {
    props.onToggle();
  };
  var isOnString = props.value ? 'switch-on' : 'switch-off';
  return /*#__PURE__*/(
    React.createElement("div", { id: "switcher-control" }, /*#__PURE__*/
    React.createElement("h6", null, props.title), /*#__PURE__*/
    React.createElement("div", { className: 'switcher-widget ' + isOnString }, /*#__PURE__*/
    React.createElement("button", { className: "switch-option", id: "off", onClick: toggleSwitcher }), /*#__PURE__*/

    React.createElement("button", { className: "switch-option", id: "on", onClick: toggleSwitcher }))));




};

const VolumeSlider = props => {
  const onVolumeChange = event => {
    if (props.power) {
      props.changeVolume(event.target.value);
    }
  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "slider-container" }, /*#__PURE__*/
    React.createElement("input", { type: "range", min: "1", max: "100", value: props.volume, onChange: onVolumeChange, className: "slider", id: "volume-slider" })));


};

const mapStateToVolumeProps = state => {
  return { volume: state.volume, power: state.power };
};

const mapDispatchToVolumeProps = dispatch => {
  return {
    changeVolume: newValue => {
      dispatch(changeVolumeAction(newValue));
    } };

};

const VolumeSliderContainer = connect(mapStateToVolumeProps, mapDispatchToVolumeProps)(VolumeSlider);


const store = createStore(combineReducers({
  volume,
  power,
  bank,
  display }));


ReactDOM.render( /*#__PURE__*/React.createElement(AppWrapper, null), document.getElementById('app'));