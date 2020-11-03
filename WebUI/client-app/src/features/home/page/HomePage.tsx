import React, { useContext } from 'react';
import ChooseSport from '../choose-sport/ChooseSport';
import ContactForm from '../../partnership/contact-form/ContactForm';
import ContactInfo from '../contact-info/ContactInfo';
import HomeHeader from '../header/HomeHeader';
import Process from '../process/Process';
import Social from '../social/Social';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { S } from './HomePage.styles';
import FeaturedSportObjects from '../featured/FeaturedSportObjects';
import ProcessDescription from '../process-description/ProcessDescription';

const HomePage = () => {
  const rootStore = useContext(RootStoreContext);
  const { cities, loadingCities } = rootStore.cityStore;
  const { sports } = rootStore.sportStore;

  return (
    <S.HomePage>
      <HomeHeader cities={cities} sports={sports} loading={loadingCities} />
      <Process />
      <FeaturedSportObjects />
      <ProcessDescription />
      <ChooseSport />
      <ContactInfo />
      <ContactForm />
      <Social />
    </S.HomePage>
  );
};

export default observer(HomePage);
