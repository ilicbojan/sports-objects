import { AxiosResponse } from 'axios';
import { action, computed, observable, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import agent from '../api/agent';
import { ISportObject } from '../models/sportObject';
import { RootStore } from './rootStore';

export default class FavouriteStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable favouriteRegistry = new Map();
  @observable loadingFavourites = false;
  @observable submitting = false;
  @observable error: AxiosResponse | null = null;

  @computed get favourites() {
    return Array.from(this.favouriteRegistry.values());
  }

  @action loadFavourites = async () => {
    this.loadingFavourites = true;
    try {
      const favouritesVm = await agent.Favourites.list();
      const { favourites } = favouritesVm;
      runInAction(() => {
        favourites.forEach((favourite) => {
          this.favouriteRegistry.set(
            favourite.sportObject.id,
            favourite.sportObject
          );
          this.loadingFavourites = false;
        });
      });
    } catch (error) {
      runInAction(() => {
        this.loadingFavourites = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action addToFavourites = async (sportObject: ISportObject) => {
    this.submitting = true;
    try {
      //let favourite: Favourite = new Favourite();
      //favourite.id = await agent.Favourites.add(id);
      //favourite.sportObjectId = id;
      await agent.Favourites.add(sportObject.id!);
      runInAction(() => {
        sportObject.isFavourite = true;
        this.rootStore.sportObjectStore.sportObjectRegistry.set(
          sportObject.id,
          sportObject
        );
        this.rootStore.sportObjectStore.sportObject!.isFavourite = true;
        this.favouriteRegistry.set(sportObject.id!, sportObject);
        this.submitting = false;
      });
      toast.success('Usesno ste dodali teren u omiljene');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action removeFromFavourites = async (sportObject: ISportObject) => {
    this.submitting = true;
    try {
      await agent.Favourites.remove(sportObject.id!);
      runInAction(() => {
        sportObject.isFavourite = false;
        this.rootStore.sportObjectStore.sportObjectRegistry.set(
          sportObject.id,
          sportObject
        );
        this.rootStore.sportObjectStore.sportObject!.isFavourite = false;
        this.favouriteRegistry.delete(sportObject.id!);
        this.submitting = false;
      });
      toast.warning('Usesno ste izbacili teren iz omiljenih');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };
}
