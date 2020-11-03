import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import LoadingSpinner from '../../../app/layout/spinner/LoadingSpinner';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ContactInfo from '../../home/contact-info/ContactInfo';
import Description from './description/Description';
import FreeTerms from './free-terms/FreeTerms';
import Images from './images/Images';
import Prices from './prices/Prices';
import { S } from './SportObjectDetails.style';
import WorkingHours from './working-hours/WorkingHours';
import Reviews from './reviews/Reviews';
import Heading from './heading/Heading';
import Information from './information/Information';

interface IProps {
  id: string;
}

const SportObjectDetails: React.FC<RouteComponentProps<IProps>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadSportObject,
    sportObject,
    loadingSportObjects,
  } = rootStore.sportObjectStore;

  useEffect(() => {
    loadSportObject(Number.parseInt(match.params.id));
  }, [loadSportObject, match.params.id, history]);

  if (loadingSportObjects) return <LoadingSpinner />;
  else if (!sportObject) return <h2>Trazeni teren ne postoji</h2>;

  return (
    <S.SportObjectDetails>
      <S.Left>
        <Heading sportObject={sportObject} />
        <Images sportObject={sportObject} />
      </S.Left>
      <FreeTerms sportObject={sportObject} />
      <S.Contact>
        <ContactInfo sportObject={sportObject} />
      </S.Contact>
      <S.Right>
        <Information sportObject={sportObject} />
        <WorkingHours sportObject={sportObject} />
        <Prices sportObject={sportObject} />
      </S.Right>
      <Description description={sportObject.description} />
      <Reviews sportObject={sportObject} />
    </S.SportObjectDetails>
  );
};

export default observer(SportObjectDetails);
