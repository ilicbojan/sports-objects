import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import Button from '../../../app/common/button/Button';
import Table from '../../../app/common/table/Table';
import { getDate } from '../../../app/common/util/util';
import { IReservation } from '../../../app/models/reservation';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { S } from './ReservationListClient.style';
import LoadingSpinner from '../../../app/layout/spinner/LoadingSpinner';
import ReservationConfirmDelete from '../confirm-delete/ReservationConfirmDelete';

const ReservationListClient = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    reservations,
    loadingReservations,
    approveReservation,
    target,
    submitting,
    predicate,
  } = rootStore.reservationStore;
  const { openModal } = rootStore.modalStore;

  const handleDelete = (id: number) => {
    openModal('Potvrda', <ReservationConfirmDelete id={id} />);
  };

  return (
    <S.ReservationListClient>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Datum</th>
            <th>Pocetak</th>
            <th>Kraj</th>
            <th>Cena</th>
            <th>User</th>
            {predicate.get('status') === 'pending' && <th>Odobri</th>}
            <th>Otkazi</th>
          </tr>
        </thead>
        <tbody>
          {loadingReservations ? (
            <tr>
              <td>
                <LoadingSpinner />
              </td>
            </tr>
          ) : (
            reservations.map((res: IReservation) => (
              <tr key={res.id}>
                <td>{res.id}</td>
                <td>{getDate(res.date)}</td>
                <td>{res.startTime.slice(0, -3)}</td>
                <td>{res.endTime.slice(0, -3)}</td>
                <td>{res.price} RSD</td>
                <td>{res.user.username}</td>
                {res.status.status === 'pending' && (
                  <td>
                    <Button
                      name={res.id}
                      disabled={Number(target) === res.id && submitting}
                      loading={Number(target) === res.id && submitting}
                      onClick={(e) => approveReservation(res.id, e)}
                      type='button'
                      color='primary'
                    >
                      Odobri
                    </Button>
                  </td>
                )}
                <td>
                  <Button
                    onClick={(e) => handleDelete(res.id)}
                    type='button'
                    color='red'
                  >
                    {res.status.status === 'pending' ? 'Izbrisi' : 'Otkazi'}
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </S.ReservationListClient>
  );
};

export default observer(ReservationListClient);
