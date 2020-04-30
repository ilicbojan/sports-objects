import { configure } from 'mobx';
import { createContext } from 'react';
import SportObjectStore from './sportObjectStore';
import UserStore from './userStore';
import CityStore from './cityStore';
import SportStore from './sportStore';
import CommonStore from './commonStore';
import CountryStore from './countryStore';
import ReviewStore from './reviewStore';
import RoleStore from './roleStore';
import WorkingHourStore from './workingHourStore';

configure({ enforceActions: 'always' });

export class RootStore {
  sportObjectStore: SportObjectStore;
  userStore: UserStore;
  cityStore: CityStore;
  sportStore: SportStore;
  commonStore: CommonStore;
  countryStore: CountryStore;
  reviewStore: ReviewStore;
  roleStore: RoleStore;
  workingHourStore: WorkingHourStore;

  constructor() {
    this.sportObjectStore = new SportObjectStore(this);
    this.userStore = new UserStore(this);
    this.cityStore = new CityStore(this);
    this.sportStore = new SportStore(this);
    this.commonStore = new CommonStore(this);
    this.countryStore = new CountryStore(this);
    this.reviewStore = new ReviewStore(this);
    this.roleStore = new RoleStore(this);
    this.workingHourStore = new WorkingHourStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
