import React, { Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { Row, Col } from 'antd';
import { S } from '../../../styles';
import PricesEdit from './PricesEdit';
import PricesCreate from './PricesCreate';

const PricesDashboard = () => {
  return (
    <Fragment>
      <Row justify='space-between'>
        <Col span={16}>
          <S.InnerContainer>
            <PricesEdit />
          </S.InnerContainer>
        </Col>
        <Col span={7}>
          <S.InnerContainer>
            <PricesCreate />
          </S.InnerContainer>
        </Col>
      </Row>
    </Fragment>
  );
};

export default observer(PricesDashboard);
