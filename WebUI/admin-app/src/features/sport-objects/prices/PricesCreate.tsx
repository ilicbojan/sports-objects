import React, { Fragment, useContext } from 'react';
import { Form, Input, Button, Select, Spin } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { observer } from 'mobx-react-lite';
import { useForm } from 'antd/lib/form/util';
import { IPrice } from '../../../app/models/price';
import { RootStoreContext } from '../../../app/stores/rootStore';

const PricesCreate = () => {
  const rootStore = useContext(RootStoreContext);
  const { createPrice, submitting } = rootStore.priceStore;
  const { sportObject } = rootStore.sportObjectStore;

  const [form] = useForm();

  const { Option } = Select;

  const handleFinish = (values: any) => {
    const newPrice: IPrice = values;
    newPrice.sportObjectId = sportObject?.id!;
    createPrice(newPrice);
  };

  return (
    <Fragment>
      <Form form={form} layout='vertical' onFinish={handleFinish}>
        <FormItem
          label='Price per hour'
          name='pricePerHour'
          rules={[{ required: true, message: 'Price is required' }]}
        >
          <Input />
        </FormItem>
        <Spin spinning={submitting}>
          <Button type='primary' htmlType='submit' block>
            Create
          </Button>
        </Spin>
      </Form>
    </Fragment>
  );
};

export default observer(PricesCreate);
