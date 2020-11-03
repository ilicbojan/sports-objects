import styled from 'styled-components';
import { DESKTOP_FIRST, COLOR } from '../../../variables';

// When using this component add to main.css
//body {
//overflow - x: hidden;
//}

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 8vh;
  padding: 0 20px;
  background-color: ${COLOR.primary};

  & .nav-active {
    transform: translateX(30%);
  }
`;

const Logo = styled.div`
  color: ${COLOR.white};
  text-transform: uppercase;
  letter-spacing: 5px;
  font-size: 2.5rem;
`;

const NavLinks = styled.ul`
  display: flex;
  z-index: 100;
  justify-content: space-around;
  width: 40%;

  @media ${DESKTOP_FIRST.xl} {
    width: 60%;
  }

  @media ${DESKTOP_FIRST.lg} {
    width: 70%;
  }

  @media ${DESKTOP_FIRST.md} {
    width: 75%;
  }

  @media ${DESKTOP_FIRST.sm} {
    position: absolute;
    padding: 20px;
    right: 0px;
    height: 92vh;
    top: 8vh;
    background-color: ${COLOR.gray};
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 20px;
    width: 100%;
    transform: translateX(100%);
    transition: transform 0.3s ease-in;
  }

  & li {
    list-style: none;

    @media ${DESKTOP_FIRST.sm} {
      opacity: 1;
    }
  }

  & a,
  button {
    color: ${COLOR.white};
    text-decoration: none;
    letter-spacing: 2px;
    font-weight: bold;
    font-size: 1.5rem;
    cursor: pointer;

    @media ${DESKTOP_FIRST.sm} {
      color: ${COLOR.primaryDark};
      font-size: 2rem;
    }
  }

  & button {
    background: none;
    border: none;
  }
`;

const SubNavLinks = styled.div`
  @media ${DESKTOP_FIRST.sm} {
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 10px;
    width: 100%;
  }

  & a,
  button {
    @media ${DESKTOP_FIRST.sm} {
      color: ${COLOR.primaryDark};
      font-size: 1.7rem;
    }
  }
`;

const Burger = styled.div`
  cursor: pointer;
  display: none;

  @media ${DESKTOP_FIRST.sm} {
    display: block;
  }

  & div {
    width: 25px;
    height: 3px;
    background-color: rgb(226, 226, 226);
    margin: 5px;
  }
`;

export const S = {
  Nav,
  Logo,
  NavLinks,
  SubNavLinks,
  Burger,
};
