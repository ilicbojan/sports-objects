import React, { useContext, useEffect } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  Space,
  Spin,
} from 'antd';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';
import TextArea from 'antd/lib/input/TextArea';
import { observer } from 'mobx-react-lite';
import ErrorMessage from '../../../app/common/form/ErrorMessage';

const SportObjectEdit = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    sportObject,
    editSportObject,
    submitting,
    error,
  } = rootStore.sportObjectStore;
  const { citiesRegistry, loadingCities } = rootStore.cityStore;
  const {
    sportsRegistry,
    loadingInitial: loadingSports,
  } = rootStore.sportStore;

  const [form] = Form.useForm();

  const { Option } = Select;

  useEffect(() => {
    form.resetFields();
  });

  const handleFinish = (values: any) => {
    let updatedSportObject = { ...values };
    updatedSportObject.id = sportObject!.id;
    editSportObject(updatedSportObject);
  };

  return (
    <Row justify='center'>
      <Col span={24}>
        <Form
          layout='vertical'
          initialValues={sportObject!}
          form={form}
          onFinish={handleFinish}
        >
          <Row justify='space-between'>
            <Col span={7}>
              <Form.Item
                label='Name'
                name='name'
                rules={[{ required: true, message: 'Name is required' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Email'
                name='email'
                rules={[{ required: true, message: 'Email is required' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Address'
                name='address'
                rules={[{ required: true, message: 'Address is required' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                label='Phone'
                name='phone'
                rules={[{ required: true, message: 'Phone is required' }]}
              >
                <Input />
              </Form.Item>
              <Spin spinning={loadingSports}>
                <Form.Item
                  label='Sport'
                  name='sportId'
                  rules={[{ required: true, message: 'Sport is required' }]}
                >
                  <Select placeholder='Select sport' allowClear>
                    {Array.from(sportsRegistry.values()).map((sport) => (
                      <Option key={sport.id} value={sport.id}>
                        {sport.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Spin>
              <Spin spinning={loadingCities}>
                <Form.Item
                  name='cityId'
                  label='City'
                  rules={[{ required: true, message: 'City is required' }]}
                >
                  <Select placeholder='Select city' allowClear>
                    {Array.from(citiesRegistry.values()).map((city) => (
                      <Option key={city.id} value={city.id}>
                        {city.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Spin>
            </Col>
            <Col span={7}>
              <Form.Item
                label='Description'
                name='description'
                rules={[{ required: true, message: 'Description is required' }]}
              >
                <TextArea style={{ minHeight: '165px', maxHeight: '165px' }} />
              </Form.Item>
              <Row justify='space-between'>
                <Form.Item name='isPayed' valuePropName='checked'>
                  <Checkbox>Payed</Checkbox>
                </Form.Item>
                <Form.Item name='isPremium' valuePropName='checked'>
                  <Checkbox>Premium</Checkbox>
                </Form.Item>
              </Row>
            </Col>
          </Row>
          {error && <ErrorMessage error={error} />}
          <Space size='middle'>
            <Spin spinning={submitting}>
              <Button size='large' type='primary' htmlType='submit'>
                Update
              </Button>
            </Spin>
            <Link to='/sportobjects/list'>
              <Button size='large' type='default'>
                List
              </Button>
            </Link>
          </Space>
        </Form>
      </Col>
    </Row>
  );
};

export default observer(SportObjectEdit);
