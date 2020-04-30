import React, { useContext, useEffect, Fragment } from 'react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Row, Col } from 'antd';
import { S } from '../../../styles';
import { observer } from 'mobx-react-lite';
import ReviewList from '../list/ReviewList';

const ReviewDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadReviews } = rootStore.reviewStore;

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  return (
    <Fragment>
      <S.HeaderContainer>
        <h2>Reviews</h2>
      </S.HeaderContainer>
      <Row justify='space-between'>
        <Col span={16}>
          <S.ContentContainer>
            <ReviewList />
          </S.ContentContainer>
        </Col>
        <Col span={7}>
          <S.ContentContainer>s</S.ContentContainer>
        </Col>
      </Row>
    </Fragment>
  );
};

export default observer(ReviewDashboard);
