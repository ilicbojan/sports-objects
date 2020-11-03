import { AxiosResponse } from 'axios';
import { action, observable, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import agent from '../api/agent';
import { IPrice } from '../models/price';
import { RootStore } from './rootStore';

export default class PriceStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable submitting = false;
  @observable submittingDelete = false;
  @observable error: AxiosResponse | null = null;
  @observable target = '';

  @action createPrice = async (sportObjectId: number, price: IPrice) => {
    this.submitting = true;
    try {
      price.id = await agent.Prices.create(sportObjectId, price);
      runInAction(() => {
        this.submitting = false;
        this.rootStore.sportObjectStore.loadMySportObject();
      });
      this.rootStore.modalStore.closeModal();
      toast.success('Uspešno ste kreirali cenu');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action updatePrice = async (sportObjectId: number, price: IPrice) => {
    this.submitting = true;
    try {
      await agent.Prices.update(sportObjectId, price);
      runInAction(() => {
        this.submitting = false;
        this.rootStore.sportObjectStore.loadMySportObject();
      });
      toast.info('Uspešno ste ažurirali cenu');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action deletePrice = async (
    sportObjectId: number,
    priceId: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    this.submittingDelete = true;
    this.target = e.currentTarget.name;
    try {
      await agent.Prices.delete(sportObjectId, priceId);
      runInAction(() => {
        this.submittingDelete = false;
        this.target = '';
        this.rootStore.sportObjectStore.loadMySportObject();
      });
      this.rootStore.modalStore.closeModal();
      toast.warning('Uspešno ste izbrisali cenu');
    } catch (error) {
      runInAction(() => {
        this.submittingDelete = false;
        this.target = '';
        this.error = error;
      });
      console.log(error);
    }
  };
}
