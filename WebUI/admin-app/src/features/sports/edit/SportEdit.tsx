import React, { Fragment, useContext, useEffect } from 'react';
import { Input, Form, Button, Spin } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ErrorMessage from '../../../app/common/form/ErrorMessage';

const SportEdit = () => {
  const rootStore = useContext(RootStoreContext);
  const { editSport, sport, submitting, error } = rootStore.sportStore;

  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  });

  const handleFinish = (values: any) => {
    let updatedSport = { ...values };
    updatedSport.id = sport!.id;
    editSport(updatedSport);
  };

  return (
    <Fragment>
      <Form
        initialValues={sport!}
        form={form}
        layout='vertical'
        onFinish={handleFinish}
      >
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
            Update
          </Button>
        </Spin>
      </Form>
    </Fragment>
  );
};

export default observer(SportEdit);
