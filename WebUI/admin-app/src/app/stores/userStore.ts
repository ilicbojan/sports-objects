import { RootStore } from './rootStore';
import { observable, computed, action, runInAction } from 'mobx';
import { IUser, IUserFormValues } from '../models/user';
import agent from '../api/agent';
import { history } from '../..';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

export default class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable user: IUser | null = null;
  @observable submitting = false;
  @observable error: AxiosResponse | null = null;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: IUserFormValues) => {
    this.submitting = true;
    try {
      const user = await agent.Users.login(values);
      runInAction(() => {
        this.user = user;
        this.submitting = false;
      });
      this.rootStore.commonStore.setToken(user.token);
      history.push('/dashboard');
      toast.info(`Hello ${user.username}`);
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action getUser = async () => {
    try {
      const user = await agent.Users.current();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push('/');
    toast.info('You are logged out');
  };
}
