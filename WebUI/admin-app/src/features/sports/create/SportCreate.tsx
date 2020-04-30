import React, { Fragment, useContext } from 'react';
import { Input, Form, Button, Spin } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ErrorMessage from '../../../app/common/form/ErrorMessage';

const SportCreate = () => {
  const rootStore = useContext(RootStoreContext);
  const { createSport, submitting, error } = rootStore.sportStore;

  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    let newSport = { ...values };
    createSport(newSport);
    form.resetFields();
  };

  return (
    <Fragment>
      <Form form={form} layout='vertical' onFinish={handleFinish}>
        <FormItem
          label='Name'
          name='name'
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input />
        </FormItem>
        {error && <ErrorMessage error={error} />}
        <Spin spinning={submitting}>
          <Button type='primary' htmlType='submit' block>
            Create
          </Button>
        </Spin>
      </Form>
    </Fragment>
  );
};

export default observer(SportCreate);
