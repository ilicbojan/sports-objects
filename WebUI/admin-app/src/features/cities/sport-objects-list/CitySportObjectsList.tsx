import React, { useContext, Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { Button, Spin, Input, Table } from 'antd';
import { ISportObject } from '../../../app/models/sportObject';

const CitySportObjectsList = () => {
  const rootStore = useContext(RootStoreContext);
  const { city, loadingCities } = rootStore.cityStore;

  const columns: ColumnProps<any>[] = [
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
      key: 'address',
      title: 'Address',
      dataIndex: 'address',
      sorter: (a: ISportObject, b: ISportObject) =>
        ('' + a.address).localeCompare(b.address),
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
      key: 'edit',
      title: 'Edit',
      dataIndex: 'id',
      width: '100px',
      render: (dataIndex) => (
        <Link to={`/sportObjects/${dataIndex}`}>
          <Button block type='primary'>
            Edit
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <Fragment>
      <Spin spinning={loadingCities}>
        <Input.Search
          placeholder='Search...'
          size='large'
          style={{ marginBottom: '20px', width: '40%' }}
        />
        <Table
          scroll={{ x: true }}
          rowKey={(record) => record.id!.toString()}
          columns={columns}
          dataSource={city?.sportObjects}
        />
      </Spin>
    </Fragment>
  );
};

export default observer(CitySportObjectsList);
