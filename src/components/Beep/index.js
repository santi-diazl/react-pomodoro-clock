import React from 'react';

const Beep = React.forwardRef(({source}, ref) => (
  <audio controls id="beep" ref={ref}>
    <source src={source} type="audio/wav" />
    Your browser does not support the audio tag.
  </audio>
));

Beep.displayName = 'Alarm';

export default Beep;
