import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Field, Form } from 'react-final-form';
import Button from '../../../app/common/button/Button';
import ErrorMessage from '../../../app/common/form/error/ErrorMessage';
import InputSelect from '../../../app/common/form/select/InputSelect';
import InputText from '../../../app/common/form/text/InputText';
import { hours } from '../../../app/common/util/util';
import LoadingSpinner from '../../../app/layout/spinner/LoadingSpinner';
import { IPrice } from '../../../app/models/price';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { required } from '../../../validation';
import PriceConfirmDelete from '../confirm-delete/PriceConfirmDelete';
import PriceCreate from '../create/PriceCreate';
import { S } from './PricesEdit.style';

const PricesEdit = () => {
  const rootStore = useContext(RootStoreContext);
  const { updatePrice, error } = rootStore.priceStore;
  const { mySportObject, loadingMySportObject } = rootStore.sportObjectStore;
  const { openModal } = rootStore.modalStore;

  const handleCreatePrice = (e: any) => {
    e.preventDefault();
    openModal('Kreiraj cenu', <PriceCreate />);
  };

  const handleDeletePrice = (id: number) => {
    openModal('Potvrda', <PriceConfirmDelete id={id} />);
  };

  return (
    <S.PricesEdit>
      <S.Header>
        <h3>Cene</h3>
        <Button type='button' color='primary' onClick={handleCreatePrice}>
          Kreiraj cenu
        </Button>
      </S.Header>
      {loadingMySportObject ? (
        <LoadingSpinner />
      ) : (
        <>
          {error && <ErrorMessage error={error} />}
          {mySportObject?.prices.map((price) => (
            <S.Price key={price.id}>
              <Form
                onSubmit={(values: IPrice) =>
                  updatePrice(mySportObject.id!, values)
                }
                render={({ handleSubmit, submitting }) => (
                  <form onSubmit={handleSubmit}>
                    <S.Fields>
                      <S.StyledField>
                        <Field
                          name='id'
                          type='number'
                          initialValue={price.id}
                          component='input'
                          hidden
                        />
                        <Field
                          name='timeFrom'
                          label='Pocetak'
                          block
                          defaultValue={price.timeFrom}
                          validate={required}
                          component={InputSelect}
                        >
                          {hours.map((hour) => (
                            <option key={hour} value={hour}>
                              {hour.slice(0, -3)}
                            </option>
                          ))}
                        </Field>
                      </S.StyledField>
                      <S.StyledField>
                        <Field
                          name='timeTo'
                          label='Kraj'
                          block
                          defaultValue={price.timeTo}
                          validate={required}
                          component={InputSelect}
                        >
                          {hours.map((hour) => (
                            <option key={hour} value={hour}>
                              {hour.slice(0, -3)}
                            </option>
                          ))}
                        </Field>
                      </S.StyledField>

                      <S.StyledField>
                        <Field
                          name='pricePerHour'
                          label='Cena'
                          type='number'
                          block
                          initialValue={price.pricePerHour.toString()}
                          validate={required}
                          component={InputText}
                        />
                      </S.StyledField>
                    </S.Fields>

                    <S.Buttons>
                      <S.StyledButton
                        disabled={submitting}
                        loading={submitting}
                        type='submit'
                        color='secondary'
                        block
                      >
                        Ažuriraj
                      </S.StyledButton>
                      <S.StyledButton
                        onClick={(e) => handleDeletePrice(price.id)}
                        type='button'
                        color='red'
                        block
                      >
                        Izbriši
                      </S.StyledButton>
                    </S.Buttons>
                  </form>
                )}
              ></Form>
            </S.Price>
          ))}
        </>
      )}
    </S.PricesEdit>
  );
};

export default observer(PricesEdit);
