import { RootStore } from './rootStore';
import { observable, action, runInAction, computed } from 'mobx';
import agent from '../api/agent';
import { AxiosResponse } from 'axios';

export default class SportStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable sportsRegistry = new Map();
  @observable loadingSports = false;
  @observable error: AxiosResponse | null = null;

  @computed get sports() {
    return Array.from(this.sportsRegistry.values());
  }

  @action loadSports = async () => {
    this.loadingSports = true;
    try {
      const sportsVm = await agent.Sports.list();
      const { sports } = sportsVm;
      runInAction('loading sports', () => {
        sports.forEach((sport) => {
          this.sportsRegistry.set(sport.id, sport);
        });
        this.loadingSports = false;
      });
    } catch (error) {
      runInAction('loading sports error', () => {
        this.loadingSports = false;
        this.error = error;
      });
      console.log(error);
    }
  };
}
