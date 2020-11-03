import styled from 'styled-components';
import { COLOR, MOBILE_FIRST } from '../../../variables';

const FeaturedSportObjects = styled.div`
  margin: 15px 15px 30px 15px;
  position: relative;
  min-height: 200px;

  & h3 {
    display: flex;
    align-items: center;
    font-size: 2.2rem;

    & svg {
      margin-right: 10px;
      fill: ${COLOR.secondary};
      height: 20px;
      width: 20px;
    }
  }
`;

const List = styled.div`
  margin-top: 15px;
  display: grid;
  row-gap: 30px;

  @media ${MOBILE_FIRST.sm} {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 20px;
  }

  @media ${MOBILE_FIRST.lg} {
    grid-template-columns: repeat(3, 1fr);
    margin-top: 0;
  }
`;

export const S = {
  FeaturedSportObjects,
  List,
};
