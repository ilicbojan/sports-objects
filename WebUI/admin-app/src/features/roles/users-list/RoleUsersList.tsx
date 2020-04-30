import React, { useContext, Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { Button, Spin, Input, Table } from 'antd';
import { IUser } from '../../../app/models/user';

const RoleUsersList = () => {
  const rootStore = useContext(RootStoreContext);
  const { role, loadingRoles } = rootStore.roleStore;

  const columns: ColumnProps<any>[] = [
    {
      key: 'id',
      title: 'Id',
      dataIndex: 'id',
    },
    {
      key: 'username',
      title: 'Username',
      dataIndex: 'username',
      sorter: (a: IUser, b: IUser) =>
        ('' + a.username).localeCompare(b.username),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'edit',
      title: 'Edit',
      dataIndex: 'id',
      width: '100px',
      render: (dataIndex) => (
        <Link to={`/users/${dataIndex}`}>
          <Button block type='primary'>
            Edit
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <Fragment>
      <Spin spinning={loadingRoles}>
        <Input.Search
          placeholder='Search...'
          size='large'
          style={{ marginBottom: '20px', width: '40%' }}
        />
        <Table
          scroll={{ x: true }}
          rowKey={(record) => record.id!.toString()}
          columns={columns}
          dataSource={role?.users}
        />
      </Spin>
    </Fragment>
  );
};

export default observer(RoleUsersList);
