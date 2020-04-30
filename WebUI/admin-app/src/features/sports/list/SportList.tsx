import React, { Fragment, useContext } from 'react';
import { Table, Button, Form, Spin, Input } from 'antd';
import { ISport } from '../../../app/models/sport';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';

const SportList = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    submittingDelete,
    sportsRegistry,
    deleteSport,
    target,
    loadingInitial,
  } = rootStore.sportStore;

  const columns: ColumnProps<ISport>[] = [
    {
      key: 'id',
      title: 'Id',
      dataIndex: 'id',
      width: '20px',
    },
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      sorter: (a: ISport, b: ISport) => ('' + a.name).localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'edit',
      title: 'Edit',
      dataIndex: 'id',
      width: '100px',
      render: (dataIndex) => (
        <Link to={`/sports/${dataIndex}`}>
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
          <Spin spinning={Number(target) === dataIndex && submittingDelete}>
            <Button
              onClick={(e) => deleteSport(e, dataIndex)}
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
      <Spin spinning={loadingInitial}>
        <Input.Search
          placeholder='Search...'
          size='large'
          style={{ marginBottom: '20px', width: '40%' }}
        />
        <Table<ISport>
          scroll={{ x: true }}
          rowKey={(record) => record.id!.toString()}
          columns={columns}
          dataSource={Array.from(sportsRegistry.values())}
        />
      </Spin>
    </Fragment>
  );
};

export default observer(SportList);
