import styled from 'styled-components';
import { COLOR, MOBILE_FIRST, utilities } from '../../../variables';

const ChooseSport = styled.div`
  margin: 30px 15px;
  display: grid;
  row-gap: 30px;

  @media ${MOBILE_FIRST.md} {
    grid-template-columns: repeat(3, 1fr);
    column-gap: 40px;
  }
`;

const Sport = styled.a`
  text-decoration: none;
  background-color: ${COLOR.secondary};
  color: ${COLOR.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 180px;
  box-shadow: ${utilities.shadow};
  border-radius: ${utilities.borderRadius};
  transition: background-color 0.4s;
  font-weight: bold;
  cursor: pointer;

  @media ${MOBILE_FIRST.lg} {
    height: 200px;
  }

  &:hover {
    background-color: ${COLOR.secondaryDark};
  }

  & svg {
    height: 60px;
    width: 60px;

    @media ${MOBILE_FIRST.lg} {
      height: 80px;
      width: 80px;
    }
  }

  & h5 {
    margin-top: -8px;
    font-size: 3rem;
  }
`;

export const S = {
  ChooseSport,
  Sport,
};
