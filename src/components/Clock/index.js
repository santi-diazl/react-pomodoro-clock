import React, { useEffect, useReducer, useRef } from "react";
// Styles
import { Wrapper } from "./Clock.styles";
// Components
import Control from "../Control";
import Display from "../Display";
import Beep from "../Beep";
// Config
import { state as initialState } from "../../config";
import beepSource from "../../beep.wav";
import startIcon from "../../svgs/play-circle-solid.svg";
import pauseIcon from "../../svgs/pause-circle-solid.svg";
import decrementIcon from "../../svgs/minus-circle-solid.svg";
import incrementIcon from "../../svgs/plus-circle-solid.svg";
import resetIcon from "../../svgs/history-solid.svg";
// Helpers
import { secToMMSS } from "../../helpers";
// Reducer
import { reducer } from "../../reducer";

const Clock = () => {
  const [clockState, setClockState] = useReducer(reducer, initialState);
  const { breakMin, sessionMin, secondsLeft, inSession, isRunning } =
    clockState;
  const interval = useRef(0);
  const beep = useRef();

  // Plays alert sound when 0 seconds left
  useEffect(() => {
    if (secondsLeft) {
      return;
    }
    const alert = beep.current;
    alert.play();
    return () => {
      // Pause and cleanup
      alert.pause();
      alert.currentTime = 0;
    };
  }, [secondsLeft]);

  // Starts counting down
  useEffect(() => {
    if (!isRunning) {
      interval.current = 0;
      return;
    }
    interval.current = setInterval(() => {
      if (secondsLeft > 0) {
        setClockState({ type: "countDown" });
      } else {
        // Once time is up, toggle clocks and start new countdown
        setClockState({ type: "switchClock" });
        setClockState({ type: "start_stop" });
      }
    }, 1000);
    return () => {
      // Cleanup
      clearInterval(interval.current);
      interval.current = 0;
    };
  }, [clockState, isRunning, secondsLeft]);

  const stateProps = {
    updateClockState: setClockState,
    state: clockState,
  };

  return (
    <>
      <Wrapper inSession={inSession}>
        <Display timeLeft={secToMMSS(secondsLeft)} />
        <div className="sessionBreakControls">
          <div className="controlWrapper">
            <span id="session-length">{sessionMin}</span>
            <div className="controlPair">
              <Control
                id="session-decrement"
                icon={decrementIcon}
                {...stateProps}
              />
              <Control
                id="session-increment"
                icon={incrementIcon}
                {...stateProps}
              />
            </div>
            <span id="session-label">Session</span>
          </div>
          <div className="controlWrapper">
            <span id="break-length">{breakMin}</span>
            <div className="controlPair">
              <Control
                id="break-decrement"
                icon={decrementIcon}
                {...stateProps}
              />
              <Control
                id="break-increment"
                icon={incrementIcon}
                {...stateProps}
              />
            </div>
            <span id="break-label">Break</span>
          </div>
        </div>
        <div className="controlWrapper">
          <div className="controlPair">
            <Control
              id="start_stop"
              icon={!isRunning ? startIcon : pauseIcon}
              {...stateProps}
            />
            <Control
              id="reset"
              icon={resetIcon}
              beepRef={beep}
              {...stateProps}
            />
          </div>
        </div>
        <span id="timer-label">{inSession ? "In session" : "On break"}</span>
      </Wrapper>
      <Beep source={beepSource} ref={beep} />
    </>
  );
};

export default Clock;
