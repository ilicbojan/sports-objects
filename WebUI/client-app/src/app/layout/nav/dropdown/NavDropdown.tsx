import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RootStoreContext } from '../../../stores/rootStore';
import { S } from './NavDropdown.style';

const NavDropdown = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, isClient, logout } = rootStore.userStore;

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <S.NavDropdown
      onClick={handleClick}
      className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
    >
      {isLoggedIn &&
        (isClient ? (
          <>
            <li onClick={() => setClick(false)}>
              <NavLink to='/reservations'>Rezervacije</NavLink>
            </li>
            <li onClick={() => setClick(false)}>
              <NavLink to='/my-sport-object'>Izmeni teren</NavLink>
            </li>
            <li onClick={() => setClick(false)}>
              <NavLink to='/working-hours'>Radno vreme</NavLink>
            </li>
            <li onClick={() => setClick(false)}>
              <NavLink to='/prices'>Cene</NavLink>
            </li>
            <li onClick={() => setClick(false)}>
              <NavLink to='/images'>Slike</NavLink>
            </li>
            <li onClick={() => setClick(false)}>
              <button onClick={logout} type='button'>
                Odjavi se
              </button>
            </li>
          </>
        ) : (
          <>
            <li onClick={() => setClick(false)}>
              <NavLink to='/reservations'>Rezervacije</NavLink>
            </li>
            <li onClick={() => setClick(false)}>
              <NavLink to='/favourites'>Omiljeni</NavLink>
            </li>
            <li onClick={() => setClick(false)}>
              <NavLink to='/profile/edit'>Izmeni profil</NavLink>
            </li>
            <li onClick={() => setClick(false)}>
              <button onClick={logout} type='button'>
                Odjavi se
              </button>
            </li>
          </>
        ))}
    </S.NavDropdown>
  );
};

export default NavDropdown;
