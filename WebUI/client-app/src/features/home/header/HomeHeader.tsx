import React, { useContext } from 'react';
import { Form, Field } from 'react-final-form';
import InputSelect from '../../../app/common/form/select/InputSelect';
import Button from '../../../app/common/button/Button';
import { S } from './HomeHeader.style';
import { ICity } from '../../../app/models/city';
import { ISport } from '../../../app/models/sport';
import { observer } from 'mobx-react-lite';
import { getDate, startHours } from '../../../app/common/util/util';
import { RootStoreContext } from '../../../app/stores/rootStore';

interface IProps {
  cities: ICity[];
  sports: ISport[];
  loading: boolean;
}

const HomeHeader: React.FC<IProps> = ({ cities, sports, loading }) => {
  const rootStore = useContext(RootStoreContext);
  const { nextDates } = rootStore.reservationStore;
  const { setPredicates } = rootStore.sportObjectStore;

  const handleSearch = (values: any) => {
    setPredicates(values);
  };

  return (
    <S.HomeHeader className='fullWidth'>
      <S.FormContainer>
        <h1>
          Pronadji <span>termin</span>
        </h1>
        <Form
          onSubmit={(values: any) => handleSearch(values)}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name='cityId'
                label='Grad'
                block
                disabled={loading}
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
                disabled={loading}
                component={InputSelect}
              >
                {sports.map((sport: ISport) => (
                  <option key={sport.id} value={sport.id}>
                    {sport.name}
                  </option>
                ))}
              </Field>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ width: '45%' }}>
                  <Field
                    name='date'
                    label='Datum'
                    block
                    component={InputSelect}
                  >
                    {nextDates.map((date) => (
                      <option key={date.toString()} value={getDate(date)}>
                        {getDate(date)}
                      </option>
                    ))}
                  </Field>
                </div>
                <div style={{ width: '45%' }}>
                  <Field
                    name='time'
                    label='Vreme'
                    block
                    component={InputSelect}
                  >
                    {startHours.map((hour) => (
                      <option key={hour} value={hour}>
                        {hour.slice(0, -3)}
                      </option>
                    ))}
                  </Field>
                </div>
              </div>

              <Button type='submit' color='primary' block>
                Pronadji
              </Button>
            </form>
          )}
        ></Form>
      </S.FormContainer>
    </S.HomeHeader>
  );
};

export default observer(HomeHeader);
