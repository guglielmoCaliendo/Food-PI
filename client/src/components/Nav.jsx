import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearch, setCurrentPage } from '../state/actions';

export default function Nav() {
  const location = useLocation();
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearch(input.toLowerCase()));
  });

  const handleChange = (e) => {
    dispatch(setCurrentPage(0));
    setInput(e.target.value);
  };

  return (
    <Navbar>
      <NavLink end to='/app'>
        <Title>Henry Foods</Title>
      </NavLink>

      <LinkContainer>
        <NavLink end to='/app'>
          Home
        </NavLink>
        <NavLink to='/app/create'>Create Recipe</NavLink>
      </LinkContainer>
      {location.pathname === '/app' && (
        <SearchBar>
          <StyledInput value={input} onChange={handleChange} />
          <StyledButton>
            <svg
              fill='#000000'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 30 30'
              width='30px'
              height='25px'
            >
              <path d='M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z' />
            </svg>
          </StyledButton>
        </SearchBar>
      )}
    </Navbar>
  );
}

const Navbar = styled.nav`
  margin-top: 20px;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  & a {
    font-weight: 400;
    font-size: 20px;
    text-decoration: none;
    padding: 0 31px;
    color: #00000080;
    &:hover {
      color: #00503d;
    }
  }
  & .active {
    font-weight: 600;
    color: #00503d;
  }
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;
const Title = styled.h1`
  font-size: 30px;
  margin: 0;
  top: 26px;
  left: 26px;
  color: #00503d;
  &:hover {
    transform: scale(1.05);
    transition: transform 350ms cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const StyledInput = styled.input`
  background: none;
  outline: none;
  border: none;
  padding-left: 10px;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const StyledButton = styled.div`
  font-size: 0;
  margin-right: 5px;
  & svg {
    fill: #8d8e8e;
    width: 20px;
  }
`;

const SearchBar = styled.div`
  display: flex;
  border: 2px solid #8d8e8e;
  border-radius: 15px;
  background: #9d9f9e36;

  @media (max-width: 500px) {
    margin-top: 15px;
    width: 80%;
  }
`;

const LinkContainer = styled.div`
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
