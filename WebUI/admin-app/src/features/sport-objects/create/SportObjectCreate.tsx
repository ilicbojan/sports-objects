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
import { S } from '../../../styles';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';
import TextArea from 'antd/lib/input/TextArea';
import { observer } from 'mobx-react-lite';
import ErrorMessage from '../../../app/common/form/ErrorMessage';

const SportObjectCreate = () => {
  const rootStore = useContext(RootStoreContext);
  const { createSportObject, submitting, error } = rootStore.sportObjectStore;
  const { loadCities, citiesRegistry } = rootStore.cityStore;
  const { loadSports, sportsRegistry } = rootStore.sportStore;

  const [form] = Form.useForm();

  const { Option } = Select;

  useEffect(() => {
    loadCities();
    loadSports();
  }, [loadCities, loadSports]);

  const handleFinish = (values: any) => {
    let newSportObject = { ...values };
    createSportObject(newSportObject);
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Row justify='center'>
      <Col span={24}>
        <S.HeaderContainer>
          <h2>Create sport object</h2>
        </S.HeaderContainer>
        <S.ContentContainer>
          <Form layout='vertical' form={form} onFinish={handleFinish}>
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
                  label='Adress'
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
                <Form.Item
                  label='City'
                  name='cityId'
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
              </Col>
              <Col span={7}>
                <Form.Item
                  label='Description'
                  name='description'
                  rules={[
                    { required: true, message: 'Description is required' },
                  ]}
                >
                  <TextArea
                    style={{ minHeight: '165px', maxHeight: '165px' }}
                  />
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
              <Link to='/sportobjects/list'>
                <Button size='large' type='default'>
                  List
                </Button>
              </Link>
            </Space>
          </Form>
        </S.ContentContainer>
      </Col>
    </Row>
  );
};

export default observer(SportObjectCreate);
