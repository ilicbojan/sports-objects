import React, { Fragment, useContext } from 'react';
import { Form, Select, Button, Spin, Space } from 'antd';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { IReservation } from '../../../app/models/reservation';
import { useForm } from 'antd/lib/form/util';
import { ISportObject } from '../../../app/models/sportObject';

const ReservationCreate = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    createReservation,
    loadFreeTerms,
    getFreeTermHoursForDate,
    emptyFreeDates,
    emptyFreeHours,
    freeDates,
    freeHours,
    submitting,
    loading,
  } = rootStore.reservationStore;
  const { sportObjectsRegistry } = rootStore.sportObjectStore;

  const [form] = useForm();

  const { Option } = Select;

  // const handleChange = (value: any, dateString: string) => {
  //   const date: Moment = value._d;
  //   console.log(dateString);
  // };

  const handleSportObjectChange = (value: any) => {
    loadFreeTerms(value);
  };

  const handleDateChange = (value: any) => {
    emptyFreeHours();
    getFreeTermHoursForDate(value);
  };

  const handleFinish = (values: any) => {
    const newReservation: IReservation = values;
    // newReservation.date = values.date._d.toISOString().slice(0, 10);
    createReservation(newReservation);
    handleReset();
  };

  const handleReset = () => {
    form.resetFields();
    emptyFreeDates();
    emptyFreeHours();
  };

  return (
    <Fragment>
      <Form form={form} onFinish={handleFinish} layout='vertical'>
        <Form.Item
          label='Sport Object'
          name='sportObjectId'
          rules={[{ required: true, message: 'Sport object id is required' }]}
        >
          <Select
            placeholder='Select sport object'
            onChange={handleSportObjectChange}
            allowClear
          >
            {Array.from(sportObjectsRegistry.values())
              .filter((so: ISportObject) => so.isPremium && so.isPayed)
              .map((so: ISportObject) => (
                <Option key={so.id} value={so.id!}>
                  {so.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label='Date'
          name='date'
          rules={[{ required: true, message: 'Date is required' }]}
        >
          {/* <DatePicker
            disabledDate={(date) => moment().subtract(1, 'days') > date}
            onChange={handleChange}
          /> */}
          <Spin spinning={loading}>
            <Select
              placeholder='Select date'
              onChange={handleDateChange}
              allowClear
            >
              {freeDates.map((date) => (
                <Option key={date} value={date}>
                  {date}
                </Option>
              ))}
            </Select>
          </Spin>
        </Form.Item>
        <Form.Item
          label='Start time'
          name='startTime'
          rules={[{ required: true, message: 'Start time is required' }]}
        >
          <Select placeholder='Select time' allowClear>
            {freeHours.map((hour) => (
              <Option key={hour} value={hour}>
                {hour}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Space size='middle'>
          <Spin spinning={submitting}>
            <Button size='large' type='primary' htmlType='submit'>
              Create
            </Button>
          </Spin>
          <Button
            size='large'
            ghost
            type='primary'
            htmlType='reset'
            onClick={handleReset}
          >
            Reset
          </Button>
        </Space>
      </Form>
    </Fragment>
  );
};

export default observer(ReservationCreate);
