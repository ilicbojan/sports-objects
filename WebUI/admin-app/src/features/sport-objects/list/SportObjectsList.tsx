import React, { useContext, useEffect, Fragment } from 'react';
import { Table, Button, Input, Row, Form, Spin } from 'antd';
import { ISportObject } from '../../../app/models/sportObject';
import { ColumnProps } from 'antd/lib/table';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { S } from '../../../styles';

const SportObjectsList = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    sportObjectsRegistry,
    loadingInitial,
    loadSportObjects,
    submitting,
    deleteSportObject,
    target,
  } = rootStore.sportObjectStore;

  useEffect(() => {
    loadSportObjects();
  }, [loadSportObjects]);

  const columns: ColumnProps<ISportObject>[] = [
    {
      key: 'id',
      title: 'Id',
      dataIndex: 'id',
    },
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      sorter: (a: ISportObject, b: ISportObject) =>
        ('' + a.name).localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
      sorter: (a: ISportObject, b: ISportObject) =>
        ('' + a.email).localeCompare(b.email),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'isPayed',
      title: 'Payed',
      dataIndex: 'isPayed',
      render: (dataIndex) => (dataIndex ? 'Yes' : 'No'),
      sorter: (a: ISportObject, b: ISportObject) =>
        Number(b.isPayed) - Number(a.isPayed),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'isPremium',
      title: 'Premium',
      dataIndex: 'isPremium',
      render: (dataIndex) => (dataIndex ? 'Yes' : 'No'),
      sorter: (a: ISportObject, b: ISportObject) =>
        Number(b.isPremium) - Number(a.isPremium),
      sortDirections: ['ascend', 'descend'],
    },

    {
      key: 'phone',
      title: 'Phone',
      dataIndex: 'phone',
      sorter: (a: ISportObject, b: ISportObject) =>
        ('' + a.phone).localeCompare(b.phone),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'sport',
      title: 'Sport',
      dataIndex: ['sport', 'name'],
      sorter: (a: ISportObject, b: ISportObject) =>
        ('' + a.sport).localeCompare('' + b.sport),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'city',
      title: 'City',
      dataIndex: ['city', 'name'],
      sorter: (a: ISportObject, b: ISportObject) =>
        ('' + a.city).localeCompare('' + b.city),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'view',
      title: 'View',
      dataIndex: 'id',
      width: '100px',
      render: (dataIndex) => (
        <Link to={`/sportobjects/${dataIndex}`}>
          <Button block ghost type='primary'>
            View
          </Button>
        </Link>
      ),
    },
    {
      key: 'edit',
      title: 'Edit',
      dataIndex: 'id',
      width: '100px',
      render: (dataIndex) => (
        <Link to={`/sportobjects/details/${dataIndex}`}>
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
          <Spin spinning={Number(target) === dataIndex && submitting}>
            <Button
              onClick={(e) => deleteSportObject(e, dataIndex)}
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
      <S.HeaderContainer>
        <h2>Sport objects list</h2>
      </S.HeaderContainer>
      <S.ContentContainer>
        <Row justify='space-between'>
          <Input.Search
            placeholder='Search...'
            size='large'
            style={{ marginBottom: '20px', width: '40%' }}
          />
          <Link to='/sportobjects/create'>
            <Button type='primary' size='large'>
              Create new
            </Button>
          </Link>
        </Row>
        <Table<ISportObject>
          scroll={{ x: true }}
          loading={loadingInitial}
          rowKey={(record) => record.id!.toString()}
          columns={columns}
          dataSource={Array.from(sportObjectsRegistry.values())}
        />
      </S.ContentContainer>
    </Fragment>
  );
};

export default observer(SportObjectsList);
