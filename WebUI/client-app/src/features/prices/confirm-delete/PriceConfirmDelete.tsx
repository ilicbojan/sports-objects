import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import Button from '../../../app/common/button/Button';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Style } from '../../../style';

interface IProps {
  id: number;
}

const PriceConfirmDelete: React.FC<IProps> = ({ id }) => {
  const rootStore = useContext(RootStoreContext);
  const { deletePrice, submittingDelete, target } = rootStore.priceStore;
  const { mySportObject } = rootStore.sportObjectStore;
  const { closeModal } = rootStore.modalStore;

  return (
    <Style.ConfirmModal>
      <div>Da li ste sigurni da zelite da izbrisete izabranu cenu?</div>
      <div className='buttons'>
        <Button
          name={id}
          type='button'
          color='red'
          onClick={(e) => deletePrice(mySportObject?.id!, id, e)}
          loading={submittingDelete && id === Number(target)}
        >
          Izbrisi
        </Button>
        <Button type='button' color='primary' onClick={closeModal} block>
          Zatvori
        </Button>
      </div>
    </Style.ConfirmModal>
  );
};

export default observer(PriceConfirmDelete);
