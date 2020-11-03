import { configure } from 'mobx';
import { createContext } from 'react';
import CityStore from './cityStore';
import CommonStore from './commonStore';
import ContactStore from './contactStore';
import CountryStore from './countryStore';
import FavouriteStore from './favouriteStore';
import ImageStore from './imageStore';
import ModalStore from './modalStore';
import PriceStore from './priceStore';
import ReservationStore from './reservationStore';
import ReviewStore from './reviewStore';
import SportObjectStore from './sportObjectStore';
import SportStore from './sportStore';
import UserStore from './userStore';
import WorkingHourStore from './workingHourStore';

configure({ enforceActions: 'always' });

export class RootStore {
  cityStore: CityStore;
  commonStore: CommonStore;
  contactStore: ContactStore;
  countryStore: CountryStore;
  favouriteStore: FavouriteStore;
  imageStore: ImageStore;
  modalStore: ModalStore;
  priceStore: PriceStore;
  reservationStore: ReservationStore;
  reviewStore: ReviewStore;
  sportObjectStore: SportObjectStore;
  sportStore: SportStore;
  userStore: UserStore;
  workingHourStore: WorkingHourStore;

  constructor() {
    this.cityStore = new CityStore(this);
    this.commonStore = new CommonStore(this);
    this.contactStore = new ContactStore(this);
    this.countryStore = new CountryStore(this);
    this.favouriteStore = new FavouriteStore(this);
    this.imageStore = new ImageStore(this);
    this.modalStore = new ModalStore(this);
    this.priceStore = new PriceStore(this);
    this.reservationStore = new ReservationStore(this);
    this.reviewStore = new ReviewStore(this);
    this.sportObjectStore = new SportObjectStore(this);
    this.sportStore = new SportStore(this);
    this.userStore = new UserStore(this);
    this.workingHourStore = new WorkingHourStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
