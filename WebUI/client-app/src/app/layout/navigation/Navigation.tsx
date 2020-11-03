import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import LoginForm from '../../../features/users/login/LoginForm';
import RegisterForm from '../../../features/users/register/RegisterForm';
import { RootStoreContext } from '../../stores/rootStore';
import { S } from './Navigation.style';

const Navigation = () => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;
  const { isLoggedIn, isClient, logout } = rootStore.userStore;
  const { mySportObject } = rootStore.sportObjectStore;

  const navRef = useRef<HTMLUListElement>(null);

  const handleNavToggle = (e: any) => {
    e.preventDefault();
    //e.currentTarget.previousElementSibling!.classList.toggle('nav-active');
    navRef.current?.classList.toggle('nav-active');
  };

  // const handleLinkOnClick = (
  //   e: React.MouseEvent<HTMLLIElement, MouseEvent>
  // ) => {
  //   e.preventDefault();
  //   e.currentTarget.parentElement!.classList.toggle('nav-active');
  // };

  const handleOpenLoginModal = (e: any) => {
    e.preventDefault();
    openModal('Dobrodosli', <LoginForm />);
  };

  const handleOpenRegisterModal = (e: any) => {
    e.preventDefault();
    openModal('Dobrodosli', <RegisterForm />);
  };

  return (
    <Fragment>
      <S.Nav>
        <S.Logo>
          <h4>Naziv</h4>
        </S.Logo>
        <S.NavLinks ref={navRef}>
          <li onClick={handleNavToggle}>
            <NavLink to='/'>Pocetna</NavLink>
          </li>
          <li onClick={handleNavToggle}>
            <NavLink to='/fields'>Tereni</NavLink>
          </li>
          <li onClick={handleNavToggle}>
            <NavLink to='/partnership'>Parnerstvo</NavLink>
          </li>
          {isLoggedIn ? (
            <li onClick={handleNavToggle}>
              <NavLink to='/profile'>Moj Profil</NavLink>
            </li>
          ) : (
            <>
              <li onClick={handleNavToggle}>
                <button onClick={handleOpenLoginModal} type='button'>
                  Prijava
                </button>
              </li>
              <li onClick={handleNavToggle}>
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
                <li onClick={handleNavToggle}>
                  <NavLink to={'/fields/' + mySportObject?.id}>
                    Moj teren
                  </NavLink>
                </li>
                <li onClick={handleNavToggle}>
                  <NavLink to='/reservations'>Rezervacije</NavLink>
                </li>
                <li onClick={handleNavToggle}>
                  <NavLink to='/my-sport-object'>Izmeni teren</NavLink>
                </li>
                <li onClick={handleNavToggle}>
                  <NavLink to='/working-hours'>Radno vreme</NavLink>
                </li>
                <li onClick={handleNavToggle}>
                  <NavLink to='/prices'>Cene</NavLink>
                </li>
                <li onClick={handleNavToggle}>
                  <NavLink to='/images'>Slike</NavLink>
                </li>
                <li onClick={handleNavToggle}>
                  <button onClick={logout} type='button'>
                    Odjavi se
                  </button>
                </li>
              </S.SubNavLinks>
            ) : (
              <S.SubNavLinks>
                <li onClick={handleNavToggle}>
                  <NavLink to='/reservations'>Rezervacije</NavLink>
                </li>
                <li onClick={handleNavToggle}>
                  <NavLink to='/favourites'>Omiljeni</NavLink>
                </li>
                <li onClick={handleNavToggle}>
                  <button onClick={logout} type='button'>
                    Odjavi se
                  </button>
                </li>
              </S.SubNavLinks>
            ))}
        </S.NavLinks>
        <S.Burger onClick={handleNavToggle}>
          <div className='line1'></div>
          <div className='line2'></div>
          <div className='line3'></div>
        </S.Burger>
      </S.Nav>
    </Fragment>
  );
};

export default observer(Navigation);
