import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Field, Form } from 'react-final-form';
import Button from '../../../app/common/button/Button';
import ErrorMessage from '../../../app/common/form/error/ErrorMessage';
import InputSelect from '../../../app/common/form/select/InputSelect';
import InputTextArea from '../../../app/common/form/text-area/InputTextArea';
import InputText from '../../../app/common/form/text/InputText';
import { ICity } from '../../../app/models/city';
import { ISport } from '../../../app/models/sport';
import { ISportObject } from '../../../app/models/sportObject';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { required } from '../../../validation';
import { S } from './SportObjectEdit.style';

const SportObjectEdit = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    mySportObject,
    updateSportObject,
    submitting,
    error,
  } = rootStore.sportObjectStore;
  const { sports, loadingSports } = rootStore.sportStore;
  const { cities, loadingCities } = rootStore.cityStore;

  const handleUpdateSportObject = (values: ISportObject) => {
    values.id = mySportObject?.id;
    values.email = mySportObject!.email;
    values.isPayed = mySportObject!.isPayed;
    values.isPremium = mySportObject!.isPremium;

    updateSportObject(values);
  };

  return (
    <S.SportObjectEdit>
      <h2>Ažuriraj sportski objekat</h2>
      <Form
        onSubmit={(values: ISportObject) => handleUpdateSportObject(values)}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name='name'
              label='Naziv'
              type='text'
              block
              initialValue={mySportObject?.name}
              validate={required}
              component={InputText}
            />
            {/* <Field
              name='email'
              label='Email'
              type='email'
              block
              initialValue={mySportObject?.email}
              validate={required}
              component={InputText}
            /> */}
            <Field
              name='address'
              label='Adresa'
              type='text'
              block
              initialValue={mySportObject?.address}
              validate={required}
              component={InputText}
            />
            <Field
              name='phone'
              label='Broj telefona'
              type='text'
              block
              initialValue={mySportObject?.phone}
              validate={required}
              component={InputText}
            />
            <Field
              name='cityId'
              label='Grad'
              block
              initialValue={mySportObject?.city.id.toString()}
              validate={required}
              disabled={loadingCities}
              component={InputSelect}
            >
              {cities.map((city: ICity) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </Field>
            <Field
              name='sportId'
              label='Sport'
              block
              initialValue={mySportObject?.sport.id.toString()}
              validate={required}
              disabled={loadingSports}
              component={InputSelect}
            >
              {sports.map((sport: ISport) => (
                <option key={sport.id} value={sport.id}>
                  {sport.name}
                </option>
              ))}
            </Field>
            <Field
              name='description'
              label='Opis'
              rows='5'
              block
              initialValue={mySportObject?.description}
              validate={required}
              component={InputTextArea}
            />
            {error && <ErrorMessage error={error} />}

            <Button
              disabled={submitting}
              loading={submitting}
              type='submit'
              color='primary'
              block
            >
              Ažuriraj
            </Button>
          </form>
        )}
      ></Form>
    </S.SportObjectEdit>
  );
};

export default observer(SportObjectEdit);
