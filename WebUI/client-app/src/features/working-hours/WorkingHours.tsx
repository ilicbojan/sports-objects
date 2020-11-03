import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import LoadingSpinner from '../../app/layout/spinner/LoadingSpinner';
import { RootStoreContext } from '../../app/stores/rootStore';
import WorkingHoursCreate from './create/WorkingHoursCreate';
import WorkingHoursEdit from './edit/WorkingHoursEdit';

const WorkingHours = () => {
  const rootStore = useContext(RootStoreContext);
  const { mySportObject, loadingMySportObject } = rootStore.sportObjectStore;

  if (loadingMySportObject) return <LoadingSpinner />;

  return (
    <div>
      {mySportObject?.workingHours === undefined ||
      mySportObject?.workingHours.length === 0 ? (
        <WorkingHoursCreate />
      ) : (
        <WorkingHoursEdit />
      )}
    </div>
  );
};

export default observer(WorkingHours);
