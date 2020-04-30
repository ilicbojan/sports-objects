import React, { useContext, Fragment } from 'react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Link } from 'react-router-dom';
import { IReview } from '../../../app/models/review';
import { observer } from 'mobx-react-lite';
import { ColumnProps } from 'antd/lib/table';
import { Button, Spin, Input, Table, Form } from 'antd';

const ReviewList = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadingReviews, reviewsRegistry } = rootStore.reviewStore;

  const columns: ColumnProps<IReview>[] = [
    {
      key: 'sportObject',
      title: 'Sport object',
      dataIndex: ['sportObject', 'name'],
      sorter: (a: IReview, b: IReview) =>
        ('' + a.sportObject.name).localeCompare(b.sportObject.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'username',
      title: 'User',
      dataIndex: 'username',
      sorter: (a: IReview, b: IReview) =>
        ('' + a.username).localeCompare(b.username),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'rating',
      title: 'Rating',
      dataIndex: 'rating',
      sorter: (a: IReview, b: IReview) => a.rating - b.rating,
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'date',
      title: 'Date created',
      dataIndex: 'createdAt',
    },
    {
      key: 'edit',
      title: 'Edit',
      dataIndex: 'id',
      width: '100px',
      render: (dataIndex) => (
        <Link to={`/countries/${dataIndex}`}>
          <Button block type='primary'>
            Edit
          </Button>
        </Link>
      ),
    },
    {
      key: 'delete',
      title: 'Delete',
      dataIndex: 'id',
      width: '100px',
      render: (dataIndex) => (
        <Form>
          <Spin>
            <Button
              id={dataIndex}
              title={dataIndex}
              block
              danger
              type='primary'
              htmlType='submit'
            >
              Delete
            </Button>
          </Spin>
        </Form>
      ),
    },
  ];

  return (
    <Fragment>
      <Spin spinning={loadingReviews}>
        <Input.Search
          placeholder='Search...'
          size='large'
          style={{ marginBottom: '20px', width: '40%' }}
        />
        <Table<IReview>
          scroll={{ x: true }}
          rowKey={(record) => record.username + record.sportObject.id}
          columns={columns}
          dataSource={Array.from(reviewsRegistry.values())}
        />
      </Spin>
    </Fragment>
  );
};

export default observer(ReviewList);
