import { AxiosResponse } from 'axios';
import {
  action,
  computed,
  observable,
  reaction,
  runInAction,
  toJS,
} from 'mobx';
import { toast } from 'react-toastify';
import { history } from '../..';
import agent from '../api/agent';
import { ISportObject } from '../models/sportObject';
import { RootStore } from './rootStore';

export default class SportObjectStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.predicate.keys(),
      () => {
        this.sportObjectRegistry.clear();
        this.loadSportObjects();
      }
    );
  }

  @observable sportObjectRegistry = new Map();
  @observable featuredSportObjects: ISportObject[] = [];
  @observable sportObject: ISportObject | null = null;
  @observable mySportObject: ISportObject | null = null;
  @observable loadingSportObjects = false;
  @observable loadingMySportObject = false;
  @observable submitting = false;
  @observable error: AxiosResponse | null = null;
  @observable predicate = new Map();

  @computed get sportObjects() {
    return Array.from(this.sportObjectRegistry.values());
  }

  @computed get workingHours() {
    const openTimes: number[] = [];
    this.sportObject?.workingHours.forEach((wh) => {
      openTimes.push(Number(wh.openTime.substring(0, 2)));
    });
    const minTime = Math.min(...openTimes);

    const closeTimes: number[] = [];
    this.sportObject?.workingHours.forEach((wh) => {
      closeTimes.push(Number(wh.closeTime.substring(0, 2)));
    });
    var maxTime = Math.min(...closeTimes);
    if (maxTime === 0) {
      maxTime = 23;
    } else {
      maxTime = Math.max(...closeTimes);
    }

    var workingHours: number[] = [];
    for (var i = minTime; i <= maxTime; i++) {
      workingHours.push(i);
    }

    return workingHours;
  }

  @computed get axiosParams() {
    const params = new URLSearchParams();
    this.predicate.forEach((value, key) => {
      params.append(key, value);
    });

    return params;
  }

  @action setPredicate = (predicate: string, value: string) => {
    this.predicate.clear();
    this.predicate.set(predicate, value);
    history.push('/fields');
  };

  @action setPredicates = (values: any) => {
    this.predicate.clear();
    for (var key in values) {
      this.predicate.set(key, values[key]);
    }
    history.push('/fields');
  };

  @action loadSportObjects = async () => {
    this.loadingSportObjects = true;
    try {
      const sportObjectsVm = await agent.SportObjects.list(this.axiosParams);
      const { sportObjects } = sportObjectsVm;
      runInAction(() => {
        sportObjects.forEach((sportObject) => {
          this.sportObjectRegistry.set(sportObject.id, sportObject);
        });
        this.loadingSportObjects = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingSportObjects = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action loadFeaturedSportObjects = async () => {
    this.loadingSportObjects = true;
    this.featuredSportObjects = [];
    try {
      const sportObjectsVm = await agent.SportObjects.featuredList();
      const { sportObjects } = sportObjectsVm;
      runInAction(() => {
        sportObjects.forEach((sportObject) => {
          this.featuredSportObjects.push(sportObject);
        });
        this.loadingSportObjects = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingSportObjects = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action loadSportObject = async (id: number) => {
    let sportObject: ISportObject = this.getSportObject(id);
    if (sportObject) {
      this.sportObject = sportObject;
      return toJS(sportObject);
    } else {
      this.loadingSportObjects = true;
      try {
        sportObject = await agent.SportObjects.details(id);
        runInAction(() => {
          this.sportObject = sportObject;
          this.sportObjectRegistry.set(sportObject.id, sportObject);
          this.loadingSportObjects = false;
        });
        return sportObject;
      } catch (error) {
        runInAction(() => {
          this.loadingSportObjects = false;
          this.error = error;
        });
        console.log(error);
      }
    }
  };

  getSportObject = (id: number): ISportObject => {
    return this.sportObjectRegistry.get(id);
  };

  @action loadMySportObject = async () => {
    this.loadingMySportObject = true;
    try {
      const sportObject = await agent.SportObjects.myDetails();
      runInAction(() => {
        this.mySportObject = sportObject;
        this.loadingMySportObject = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingMySportObject = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action updateSportObject = async (sportObject: ISportObject) => {
    this.submitting = true;
    try {
      await agent.SportObjects.update(sportObject);
      runInAction('editing sport object', () => {
        this.sportObjectRegistry.set(sportObject.id, sportObject);
        this.sportObject = sportObject;
        this.submitting = false;
      });
      toast.info('Sportski objekat je izmenjen');
    } catch (error) {
      runInAction('edit sport object error', () => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };
}
