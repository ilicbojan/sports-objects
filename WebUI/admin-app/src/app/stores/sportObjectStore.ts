import { observable, action, runInAction, toJS } from 'mobx';
import { RootStore } from './rootStore';
import agent from '../api/agent';
import { ISportObject } from '../models/sportObject';
import { toast } from 'react-toastify';
import { history } from '../..';
import { AxiosResponse } from 'axios';

export default class SportObjectStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable sportObjectsRegistry = new Map();
  @observable sportObject: ISportObject | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';
  @observable error: AxiosResponse | null = null;

  @action loadSportObjects = async () => {
    this.loadingInitial = true;
    try {
      const sportObjectsVm = await agent.SportObjects.list();
      const { sportObjects } = sportObjectsVm;
      runInAction('loading sport objects', () => {
        sportObjects.forEach((sportObject) => {
          sportObject.sportId = sportObject.sport.id;
          sportObject.cityId = sportObject.city.id;
          this.sportObjectsRegistry.set(sportObject.id, sportObject);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction('loading sport objects error', () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadSportObject = async (id: number) => {
    let sportObject = this.getSportObject(id);
    if (sportObject) {
      this.sportObject = sportObject;
      return toJS(sportObject);
    } else {
      this.loadingInitial = true;
      try {
        sportObject = await agent.SportObjects.details(id);
        sportObject.sportId = sportObject.sport.id;
        sportObject.cityId = sportObject.city.id;
        runInAction('getting sport object', () => {
          this.sportObject = sportObject;
          this.sportObjectsRegistry.set(sportObject.id, sportObject);
          this.loadingInitial = false;
        });
        return sportObject;
      } catch (error) {
        runInAction('get sport object error', () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  getSportObject = (id: number) => {
    return this.sportObjectsRegistry.get(id);
  };

  @action createSportObject = async (sportObject: ISportObject) => {
    this.submitting = true;
    try {
      sportObject.id = await agent.SportObjects.create(sportObject);
      sportObject.sport = this.rootStore.sportStore.getSport(
        sportObject.sportId
      );
      sportObject.city = this.rootStore.cityStore.getCity(sportObject.cityId);
      sportObject.prices = [];
      sportObject.reviews = [];
      sportObject.reservations = [];
      runInAction(() => {
        this.sportObjectsRegistry.set(sportObject.id, sportObject);
        this.submitting = false;
      });
      history.push(`/sportObjects/details/${sportObject.id}`);
      toast.success('Sport object created');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action editSportObject = async (sportObject: ISportObject) => {
    this.submitting = true;
    try {
      await agent.SportObjects.update(sportObject);
      runInAction('editing sport object', () => {
        this.sportObjectsRegistry.set(sportObject.id, sportObject);
        this.sportObject = sportObject;
        this.submitting = false;
      });
      toast.success('Sport object updated');
    } catch (error) {
      runInAction('edit sport object error', () => {
        this.submitting = false;
        this.error = error;
      });
      toast.error('Problem editing sport object');
      console.log(error);
    }
  };

  @action deleteSportObject = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    id: number
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.title;
    try {
      await agent.SportObjects.delete(id);
      runInAction(() => {
        this.sportObjectsRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      });
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.target = '';
      });
      console.log(error);
    }
  };
}

// export default createContext(new SportObjectStore());

// in Component: var sportObjectStore = useContext(SportOjbectStore)
// and export default observer(Component)
