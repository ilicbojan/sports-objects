import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Field, Form } from 'react-final-form';
import Button from '../../../app/common/button/Button';
import InputText from '../../../app/common/form/text/InputText';
import { IPrice } from '../../../app/models/price';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { required } from '../../../validation';

const PriceCreate = () => {
  const rootStore = useContext(RootStoreContext);
  const { createPrice } = rootStore.priceStore;
  const { mySportObject } = rootStore.sportObjectStore;

  return (
    <div>
      <Form
        onSubmit={(values: IPrice) => createPrice(mySportObject?.id!, values)}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name='pricePerHour'
              label='Cena'
              type='number'
              block
              validate={required}
              component={InputText}
            />

            <Button
              disabled={submitting}
              loading={submitting}
              type='submit'
              color='primary'
              block
            >
              Kreiraj
            </Button>
          </form>
        )}
      ></Form>
    </div>
  );
};

export default observer(PriceCreate);
