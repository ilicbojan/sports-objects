import { observable } from 'mobx';
import { RootStore } from './rootStore';

export default class SportObjectStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable title = 'Hello from mobx';
}

// export default createContext(new SportObjectStore());

// in Component: var sportObjectStore = useContext(SportOjbectStore)
// and export default observer(Component)
