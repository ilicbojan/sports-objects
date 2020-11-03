import React, { Fragment, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import Table, { ColumnProps } from 'antd/lib/table';
import { Button, Spin } from 'antd';
import Form from 'antd/lib/form/Form';

const SportObjectReservationList = () => {
  const rootStore = useContext(RootStoreContext);
  const { approveReservation, submitting, target } = rootStore.reservationStore;
  const { sportObject } = rootStore.sportObjectStore;

  const columns: ColumnProps<any>[] = [
    {
      key: 'id',
      title: 'Id',
      dataIndex: 'id',
    },
    {
      key: 'user',
      title: 'User',
      dataIndex: ['user', 'username'],
    },
    {
      key: 'startTime',
      title: 'Start time',
      dataIndex: 'startTime',
    },
    {
      key: 'endTime',
      title: 'End time',
      dataIndex: 'endTime',
    },
    {
      key: 'date',
      title: 'Date',
      dataIndex: 'date',
    },
    {
      key: 'approve',
      title: 'Approve',
      dataIndex: 'id',
      width: '100px',
      render: (dataIndex) => (
        <Form>
          <Spin spinning={Number(target) === dataIndex && submitting}>
            <Button
              onClick={(e) => approveReservation(dataIndex, 2)}
              id={dataIndex}
              title={dataIndex}
              block
              type='primary'
              htmlType='submit'
            >
              Approve
            </Button>
          </Spin>
        </Form>
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
              //onClick={(e) => deleteSportObject(e, dataIndex)}
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
      <Table
        scroll={{ x: true }}
        rowKey={(record) => record.id!.toString()}
        columns={columns}
        dataSource={sportObject!.reservations.filter(
          (res) => res.status.status === 'Waiting'
        )}
      />
    </Fragment>
  );
};

export default observer(SportObjectReservationList);
