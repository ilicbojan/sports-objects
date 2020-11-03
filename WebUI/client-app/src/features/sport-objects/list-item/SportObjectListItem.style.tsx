import styled from 'styled-components';
import { COLOR, utilities } from '../../../variables';

const SportObjectListItem = styled.div`
  background-color: ${COLOR.white};
  padding: 10px 20px 5px 20px;
  margin-bottom: 20px;
  border: 2px solid ${COLOR.secondary};
  border-radius: ${utilities.borderRadius};

  & h2 {
    color: ${COLOR.secondaryDark};
    font-size: 2rem;
  }
`;

const Header = styled.div`
  display: flex;
`;

const HeaderImage = styled.img`
  width: 50%;
  height: auto;
`;

const HeaderText = styled.div`
  padding: 0 10px;
  font-size: 1.6rem;

  & span {
    font-weight: bold;
    display: none;
  }

  & h5 {
    color: ${COLOR.secondaryDark};
  }
`;

const Body = styled.div`
  font-size: 1.6rem;
  padding: 10px 0 0 0;
`;

const Column = styled.div`
  width: 50%;

  & span {
    font-weight: bold;
    display: none;
  }
`;

export const S = {
  SportObjectListItem,
  Header,
  HeaderImage,
  HeaderText,
  Body,
  Column,
};
