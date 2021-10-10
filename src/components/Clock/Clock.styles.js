import styled from 'styled-components';

export const StyledClock = styled.div`
  background-color: ${({inSession}) =>
    inSession ? 'var(--red)' : 'var(--green)'};
  font-family: 'Noto Sans Display', sans-serif;
  margin: auto;
  height: auto;
  padding: 25px;
  text-align: center;
  color: white;

  #time-left {
    font-size: 8em;
  }

  #timer-label {
    font-size: 2em;
  }

  .controlWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 25px;
    font-size: 2em;
  }

  .controlPair {
    display: flex;
    margin: 0px auto;
    justify-content: center;
  }

  .sessionBreakControls {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (min-width: 576px) {
    width: 400px;
  }

  @media screen and (max-width: 575.98px) {
    height: 100%;
    width: 100%;
    padding: 45% 25px;
    .controlWrapper {
      padding: 10px;
      font-size: 1.5em;
    }
    #time-left {
      font-size: 6em;
      padding-bottom: 50px;
    }
  }
`;
