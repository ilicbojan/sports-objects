import { RootStore } from './rootStore';
import { observable, action, runInAction, toJS } from 'mobx';
import agent from '../api/agent';
import { ISport } from '../models/sport';
import { AxiosResponse } from 'axios';
import { history } from '../..';
import { toast } from 'react-toastify';

export default class SportStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable sportsRegistry = new Map();
  @observable sport: ISport | null = null;
  @observable loadingInitial = false;
  @observable submittingDelete = false;
  @observable submitting = false;
  @observable target = '';
  @observable error: AxiosResponse | null = null;

  @action loadSports = async () => {
    this.loadingInitial = true;
    try {
      const sportsVm = await agent.Sports.list();
      const { sports } = sportsVm;
      runInAction('loading sports', () => {
        sports.forEach((sport) => {
          this.sportsRegistry.set(sport.id, sport);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction('loading sports error', () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadSport = async (id: number) => {
    let sport = this.getSport(id);
    if (sport) {
      this.sport = sport;
      return toJS(sport);
    } else {
      this.loadingInitial = true;
      try {
        sport = await agent.Sports.details(id);
        runInAction(() => {
          this.sport = sport;
          this.sportsRegistry.set(sport.id, sport);
          this.loadingInitial = false;
        });
        return sport;
      } catch (error) {
        runInAction(() => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  @action getSport = (id: number) => {
    return this.sportsRegistry.get(id);
  };

  @action createSport = async (sport: ISport) => {
    this.submitting = true;
    try {
      sport.id = await agent.Sports.create(sport);
      runInAction(() => {
        this.sportsRegistry.set(sport.id, sport);
        this.submitting = false;
        this.error = null;
      });
      history.push(`/sports/${sport.id}`);
      toast.success('Sport created');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action editSport = async (sport: ISport) => {
    this.submitting = true;
    try {
      await agent.Sports.update(sport);
      runInAction(() => {
        this.sport = sport;
        this.sportsRegistry.set(sport.id, sport);
        this.submitting = false;
        this.error = null;
      });
      toast.success('Sport updated');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      toast.error('Problem editting sport');
      console.log(error);
    }
  };

  @action deleteSport = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    id: number
  ) => {
    this.submittingDelete = true;
    this.target = event.currentTarget.title;
    try {
      await agent.Sports.delete(id);
      runInAction(() => {
        this.sportsRegistry.delete(id);
        this.target = '';
        this.submittingDelete = false;
      });
    } catch (error) {
      runInAction(() => {
        this.target = '';
        this.submittingDelete = false;
      });
      console.log(error);
    }
  };
}
