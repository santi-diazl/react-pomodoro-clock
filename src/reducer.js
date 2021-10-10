export const init = (initialState) => {
  return initialState;
};

// Updates session/break minutes and total seconds accordingly
export const setClockLength = (state, type) => {
  const {inSession, secondsLeft} = state;
  const [clock, action] = type.split('-');
  const clockMin = clock + 'Min';
  let minutes = state[clockMin];
  const newTimer = {};

  if (action === 'increment') {
    if (minutes < 60) {
      minutes += 1;
    }
  } else {
    if (minutes > 1) {
      minutes -= 1;
    }
  }
  newTimer[clockMin] = minutes;
  newTimer.secondsLeft =
    (inSession && clock === 'session') || (!inSession && clock === 'break')
      ? minutes * 60
      : secondsLeft;
  return newTimer;
};

// Resets audio component
const resetBeep = (beep) => {
  beep.current.pause();
  beep.current.currentTime = 0;
};

export const reducer = (state, {type, payload}) => {
  const {breakMin, sessionMin, secondsLeft, inSession, isRunning} = state;
  let newState;
  switch (type) {
    case 'session-decrement':
    case 'session-increment':
    case 'break-decrement':
    case 'break-increment':
      newState = {...setClockLength(state, type)};
      break;
    case 'start_stop':
      newState = {isRunning: !isRunning ? true : false};
      break;
    case 'countDown':
      newState = {secondsLeft: secondsLeft - 1};
      break;
    case 'switchClock':
      newState = {
        inSession: inSession ? false : true,
        secondsLeft: inSession ? breakMin * 60 : sessionMin * 60,
        isRunning: false,
      };
      break;
    case 'reset':
      resetBeep(payload.beep);
      return init(payload.initialState);
    default:
      return {...state};
  }
  return {...state, ...newState};
};
