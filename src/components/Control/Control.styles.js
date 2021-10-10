import styled from 'styled-components';

export const StyledControl = styled.button`
  cursor: pointer;
  height: 80px;
  width: 80px;
  border-style: none;
  // Change button's background color when on break or in session
  background-color: ${({inSession}) =>
    inSession ? 'var(--red)' : 'var(--green)'};
`;
