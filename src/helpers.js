// Converts seconds into MM(minutes):SS(seconds) format
export const secToMMSS = (seconds) => {
  let mm = Math.floor(seconds / 60);
  let ss = seconds - mm * 60;
  mm = mm > 9 ? mm : '0' + mm;
  ss = ss > 9 ? ss : '0' + ss;

  return `${mm}:${ss}`;
};
