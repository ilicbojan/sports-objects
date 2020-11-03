import React, { Fragment, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Form, Input, Row, Col, Button, Spin, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { IPrice } from '../../../app/models/price';

const PricesEdit = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    deletePrice,
    editPrice,
    submittingDelete,
    submittingEdit,
    target,
  } = rootStore.priceStore;
  const { sportObject } = rootStore.sportObjectStore;

  const { Option } = Select;

  const handleFinish = (values: any) => {
    const price: IPrice = values;
    editPrice(price);
  };

  const handleClick = (price: any, e: any) => {
    let priceToDelete: IPrice = price;
    deletePrice(priceToDelete, e);
  };

  const hours = [
    '08:00:00',
    '09:00:00',
    '10:00:00',
    '11:00:00',
    '12:00:00',
    '13:00:00',
    '14:00:00',
    '15:00:00',
    '16:00:00',
    '17:00:00',
    '18:00:00',
    '19:00:00',
    '20:00:00',
    '21:00:00',
    '22:00:00',
    '23:00:00',
    '00:00:00',
    '01:00:00',
    '02:00:00',
  ];

  return (
    <Fragment>
      {sportObject?.prices.map((price) => (
        <Form
          key={price.id}
          onFinish={handleFinish}
          initialValues={price}
          layout='vertical'
        >
          <Row justify='space-between'>
            <Form.Item name='id' style={{ display: 'none' }}>
              <Input />
            </Form.Item>
            <Col span={6}>
              <FormItem
                label='Time from'
                name='timeFrom'
                rules={[{ required: true, message: 'Time from is required' }]}
              >
                <Select placeholder='Select time from' allowClear>
                  {hours.map((hour) => (
                    <Option key={hour} value={hour}>
                      {hour}
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                label='Time to'
                name='timeTo'
                rules={[{ required: true, message: 'Time to is required' }]}
              >
                <Select placeholder='Select time to' allowClear>
                  {hours.map((hour) => (
                    <Option key={hour} value={hour}>
                      {hour}
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                label='Price per hour'
                name='pricePerHour'
                rules={[{ required: true, message: 'Price is required' }]}
              >
                <Input />
              </FormItem>
            </Col>
            <Col span={2}>
              <Spin spinning={submittingEdit}>
                <Button
                  style={{ marginTop: '40px' }}
                  type='primary'
                  htmlType='submit'
                  block
                >
                  Update
                </Button>
              </Spin>
            </Col>
            <Col span={2}>
              <Form>
                <Spin
                  spinning={Number(target) === price.id && submittingDelete}
                >
                  <Button
                    style={{ marginTop: '40px' }}
                    onClick={(e) => handleClick(price, e)}
                    title={'' + price.id}
                    type='danger'
                    htmlType='submit'
                    block
                  >
                    Delete
                  </Button>
                </Spin>
              </Form>
            </Col>
          </Row>
        </Form>
      ))}
    </Fragment>
  );
};

export default observer(PricesEdit);
