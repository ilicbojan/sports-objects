import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { S } from './Toolbar.style';
import Burger from '../burger/Burger';
import { RootStoreContext } from '../../../stores/rootStore';
import LoginForm from '../../../../features/users/login/LoginForm';
import RegisterForm from '../../../../features/users/register/RegisterForm';
import { observer } from 'mobx-react-lite';
import NavDropdown from '../dropdown/NavDropdown';
import { FaAngleDown } from 'react-icons/fa';

interface IProps {
  burgerClickHandler: () => void;
}

const Toolbar: React.FC<IProps> = ({ burgerClickHandler }) => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;
  const { isLoggedIn, isClient } = rootStore.userStore;
  const { mySportObject } = rootStore.sportObjectStore;

  const [dropdown, setDropdown] = useState(false);

  const handleNavToggle = () => {};

  const onClick = () => {
    setDropdown(!dropdown);
  };

  const onMouseEnter = () => {
    setDropdown(true);
  };

  const onMouseLeave = () => {
    setDropdown(false);
  };

  const handleOpenLoginModal = (e: any) => {
    e.preventDefault();
    openModal('Dobrodosli', <LoginForm />);
  };

  const handleOpenRegisterModal = (e: any) => {
    e.preventDefault();
    openModal('Dobrodosli', <RegisterForm />);
  };

  return (
    <S.Toolbar>
      <S.Navigation>
        <S.Logo>
          <Link to='/'>LOGO</Link>
        </S.Logo>
        <S.Spacer></S.Spacer>
        <S.Items>
          <ul>
            <li onClick={handleNavToggle}>
              <NavLink to='/'>Pocetna</NavLink>
            </li>
            <li onClick={handleNavToggle}>
              <NavLink to='/fields'>Tereni</NavLink>
            </li>
            <li onClick={handleNavToggle}>
              <NavLink to='/partnership'>Parnerstvo</NavLink>
            </li>
            {isLoggedIn && isClient && (
              <li>
                <NavLink to={'/fields/' + mySportObject?.id}>Moj teren</NavLink>
              </li>
            )}
            {isLoggedIn ? (
              <li
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                <button>Moj Profil</button>
                <FaAngleDown />
                {dropdown && <NavDropdown />}
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
          </ul>
        </S.Items>
        <S.Burger>
          <Burger click={burgerClickHandler} />
        </S.Burger>
      </S.Navigation>
    </S.Toolbar>
  );
};

export default observer(Toolbar);
