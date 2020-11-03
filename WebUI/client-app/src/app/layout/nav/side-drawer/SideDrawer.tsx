import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { S } from './SideDrawer.style';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../stores/rootStore';
import LoginForm from '../../../../features/users/login/LoginForm';
import RegisterForm from '../../../../features/users/register/RegisterForm';
import {
  FaHandshake,
  FaHome,
  FaLandmark,
  FaSignInAlt,
  FaUserPlus,
} from 'react-icons/fa';

interface IProps {
  show: boolean;
  click: () => void;
}

const SideDrawer: React.FC<IProps> = ({ show, click }) => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;
  const { isLoggedIn, isClient, logout } = rootStore.userStore;
  const { mySportObject } = rootStore.sportObjectStore;

  const handleOpenLoginModal = (e: any) => {
    e.preventDefault();
    openModal('Dobrodosli', <LoginForm />);
  };

  const handleOpenRegisterModal = (e: any) => {
    e.preventDefault();
    openModal('Dobrodosli', <RegisterForm />);
  };

  return (
    <S.SideDrawer show={show}>
      <ul>
        <li onClick={click}>
          <FaHome />
          <NavLink to='/'>Pocetna</NavLink>
        </li>
        <li onClick={click}>
          <FaLandmark />
          <NavLink to='/fields'>Tereni</NavLink>
        </li>
        <li onClick={click}>
          <FaHandshake />
          <NavLink to='/partnership'>Parnerstvo</NavLink>
        </li>
        {!isLoggedIn && (
          <>
            <li onClick={click}>
              <FaSignInAlt />
              <button onClick={handleOpenLoginModal} type='button'>
                Prijava
              </button>
            </li>
            <li onClick={click}>
              <FaUserPlus />
              <button onClick={handleOpenRegisterModal} type='button'>
                Registracija
              </button>
            </li>
          </>
        )}
        {isLoggedIn && <hr />}

        {isLoggedIn &&
          (isClient ? (
            <S.SubNavLinks>
              <li onClick={click}>
                <NavLink to={'/fields/' + mySportObject?.id}>Moj teren</NavLink>
              </li>
              <li onClick={click}>
                <NavLink to='/reservations'>Rezervacije</NavLink>
              </li>
              <li onClick={click}>
                <NavLink to='/my-sport-object'>Izmeni teren</NavLink>
              </li>
              <li onClick={click}>
                <NavLink to='/working-hours'>Radno vreme</NavLink>
              </li>
              <li onClick={click}>
                <NavLink to='/prices'>Cene</NavLink>
              </li>
              <li onClick={click}>
                <NavLink to='/images'>Slike</NavLink>
              </li>
              <li onClick={click}>
                <button onClick={logout} type='button'>
                  Odjavi se
                </button>
              </li>
            </S.SubNavLinks>
          ) : (
            <S.SubNavLinks>
              <li onClick={click}>
                <NavLink to='/reservations'>Rezervacije</NavLink>
              </li>
              <li onClick={click}>
                <NavLink to='/favourites'>Omiljeni</NavLink>
              </li>
              <li onClick={click}>
                <NavLink to='/profile/edit'>Izmeni profil</NavLink>
              </li>
              <li onClick={click}>
                <button onClick={logout} type='button'>
                  Odjavi se
                </button>
              </li>
            </S.SubNavLinks>
          ))}
      </ul>
    </S.SideDrawer>
  );
};

export default observer(SideDrawer);
