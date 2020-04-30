import React, { useContext } from 'react';
import { Comment, Avatar, Col, Row, Rate } from 'antd';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { S } from '../../../styles';

const SportObjectReviewsList = () => {
  const rootStore = useContext(RootStoreContext);
  const { sportObject } = rootStore.sportObjectStore;

  return (
    <Row justify='space-between'>
      {sportObject!.reviews.map((review) => (
        <Col key={review.username} span={11}>
          <S.InnerContainer>
            <Rate disabled value={review.rating} />
            <Comment
              author={
                <Link to={`users/${review.username}`}>{review.username}</Link>
              }
              avatar={
                <Avatar
                  src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                  alt={review.username}
                />
              }
              content={<p>{review.comment}</p>}
            />
          </S.InnerContainer>
        </Col>
      ))}
    </Row>
  );
};

export default observer(SportObjectReviewsList);
