import { RootStore } from './rootStore';
import { observable, action, runInAction } from 'mobx';
import { AxiosResponse } from 'axios';
import { IPrice } from '../models/price';
import agent from '../api/agent';
import { toast } from 'react-toastify';

export default class PriceStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable submitting = false;
  @observable submittingEdit = false;
  @observable submittingDelete = false;
  @observable error: AxiosResponse | null = null;
  @observable target = '';

  @action createPrice = async (price: IPrice) => {
    this.submitting = true;
    try {
      price.id = await agent.Prices.create(price);
      runInAction(() => {
        this.rootStore.sportObjectStore.sportObject!.prices.push(price);
        this.submitting = false;
        this.error = null;
      });
      toast.success('Price created');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action editPrice = async (price: IPrice) => {
    this.submittingEdit = true;
    try {
      await agent.Prices.update(price);
      runInAction(() => {
        this.submittingEdit = false;
        this.error = null;
      });
      toast.success('Price updated');
    } catch (error) {
      runInAction(() => {
        this.submittingEdit = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action deletePrice = async (
    price: IPrice,
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    let { prices } = this.rootStore.sportObjectStore.sportObject!;
    this.submittingDelete = true;
    this.target = event.currentTarget.title;
    try {
      await agent.Prices.delete(price.id);
      runInAction(() => {
        const index = prices.indexOf(price);
        if (index > -1) prices.splice(index, 1);
        this.submittingDelete = false;
        this.target = '';
        this.error = null;
      });
      toast.success('Price deleted');
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
