import React from 'react';
// Styles
import {StyledControl} from './Control.styles';
// Initial state for reset button
import {state as initialState} from '../../config';

const Control = ({id, icon, beepRef, updateClockState, state}) => {
  const {isRunning, inSession} = state;
  return (
    <StyledControl
      onClick={(e) => {
        updateClockState({
          type: e.target.id,
          // If reset control, include payload with initial state and audio ref
          payload:
            id === 'reset'
              ? {
                  initialState: initialState,
                  beep: beepRef,
                }
              : '',
        });
      }}
      // Disable length controls when clock is running
      disabled={id.includes('ment') && isRunning ? true : false}
      // For conditional styling
      inSession={inSession}
    >
      <img src={icon} alt={id} id={id} />
    </StyledControl>
  );
};

export default Control;
