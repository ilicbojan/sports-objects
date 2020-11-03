import styled from 'styled-components';
import Button from '../../../app/common/button/Button';
import { COLOR, MOBILE_FIRST, utilities } from '../../../variables';

const PricesEdit = styled.div`
  padding: 15px;

  @media ${MOBILE_FIRST.lg} {
    width: 60%;
    margin: 0 auto;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Price = styled.div`
  padding: 10px;
  margin-bottom: 20px;
  border: 2px solid ${COLOR.secondary};
  border-radius: ${utilities.borderRadius};

  @media ${MOBILE_FIRST.lg} {
    padding: 20px;
  }
`;

const Fields = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledField = styled.div`
  flex: 0 0 30%;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  flex: 0 0 45%;
`;

export const S = {
  PricesEdit,
  Header,
  Price,
  Fields,
  StyledField,
  Buttons,
  StyledButton,
};
