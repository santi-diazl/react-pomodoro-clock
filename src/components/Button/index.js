import React from "react";
// Styles
import { Wrapper } from "./Control.styles";
// Initial state for reset button
import { state as initialState } from "../../config";

const Control = ({
  updateClockState,
  isRunning,
  inSession,
  beepRef,
  icon,
  id,
}) => (
  <Wrapper
    onClick={(e) => {
      updateClockState({
        type: e.target.id,
        payload:
          id === "reset"
            ? {
                initialState: initialState,
                beep: beepRef,
              }
            : "",
      });
    }}
    disabled={isRunning ? true : false}
    inSession={inSession}
  >
    <img src={icon} alt={id} id={id} />
  </Wrapper>
);

export default Control;
