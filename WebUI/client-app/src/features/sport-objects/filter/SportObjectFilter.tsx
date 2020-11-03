import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Field, Form } from 'react-final-form';
import Button from '../../../app/common/button/Button';
import InputSelect from '../../../app/common/form/select/InputSelect';
import { getDate, startHours } from '../../../app/common/util/util';
import { ICity } from '../../../app/models/city';
import { ISport } from '../../../app/models/sport';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Style } from '../../../style';
import { S } from './SportObjectFilter.style';

interface IProps {
  setFilter: (filter: boolean) => void;
}

const SportObjectFilter: React.FC<IProps> = ({ setFilter }) => {
  const rootStore = useContext(RootStoreContext);
  const { sports, loadingSports } = rootStore.sportStore;
  const { cities, loadingCities } = rootStore.cityStore;
  const { nextDates } = rootStore.reservationStore;
  const { setPredicates, setPredicate } = rootStore.sportObjectStore;

  const handleSearch = (values: any) => {
    setPredicates(values);
    setFilter(false);
  };

  return (
    <S.SportObjectFilter>
      <Style.SportObjectDetailsCard className='filter'>
        <div className='header'>
          <h3>Filter</h3>
        </div>
        <div className='body'>
          <Form
            onSubmit={(values: any) => handleSearch(values)}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name='cityId'
                  label='Grad'
                  block
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
                  disabled={loadingSports}
                  component={InputSelect}
                >
                  {sports.map((sport: ISport) => (
                    <option key={sport.id} value={sport.id}>
                      {sport.name}
                    </option>
                  ))}
                </Field>

                <Field name='date' label='Datum' block component={InputSelect}>
                  {nextDates.map((date) => (
                    <option key={date.toString()} value={getDate(date)}>
                      {getDate(date)}
                    </option>
                  ))}
                </Field>

                <Field name='time' label='Vreme' block component={InputSelect}>
                  {startHours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour.slice(0, -3)}
                    </option>
                  ))}
                </Field>
                <div className='btns'>
                  <Button type='submit' color='primary' block>
                    Pronadji
                  </Button>
                  <Button
                    color='secondary'
                    type='button'
                    onClick={() => setPredicate('', '')}
                  >
                    Svi tereni
                  </Button>
                </div>
              </form>
            )}
          ></Form>
        </div>
      </Style.SportObjectDetailsCard>
    </S.SportObjectFilter>
  );
};

export default observer(SportObjectFilter);
