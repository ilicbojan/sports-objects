import { configure } from 'mobx';
import { createContext } from 'react';
import SportObjectStore from './sportObjectStore';

configure({ enforceActions: 'always' });

export class RootStore {
  sportObjectStore: SportObjectStore;

  constructor() {
    this.sportObjectStore = new SportObjectStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
