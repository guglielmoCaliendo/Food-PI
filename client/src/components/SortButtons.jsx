import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { capitalize } from '../helpers/components.helper';
import { changeOrder } from '../helpers/SortButtons.helper';
import {
  setSort,
  setOrder,
  setCurrentPage,
  removeSort,
} from '../state/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function SearchBar({ diets }) {
  const sort = useSelector((store) => store.sort);
  let order = useSelector((store) => store.order);
  const [name, setName] = useState(order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOrder(name));
  }, [dispatch, name]);

  const handleClick = (diet) => {
    dispatch(setCurrentPage(0));
    !sort.includes(diet) ? dispatch(setSort(diet)) : dispatch(removeSort(diet));
  };

  const renderDietsButtons = diets.map((diet) => (
    <DietsButton
      onClick={() => handleClick(diet)}
      key={diet}
      name={diet}
      className={sort.includes(diet) ? 'selected' : null}
    >
      {capitalize(diet)}
    </DietsButton>
  ));

  return (
    <Container>
      <DietsContainer>{renderDietsButtons}</DietsContainer>

      <DietsContainer>
        <StyledButton
          onClick={() => {
            dispatch(setCurrentPage(0));
            dispatch(setOrder(name));
            changeOrder(name, setName);
          }}
        >
          {name}
        </StyledButton>
      </DietsContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  gap: 14px;
  margin-top: 20px;
`;

const DietsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;

  & .selected {
    background: #fefffb;
  }
`;

const DietsButton = styled.button`
  background: #9d9f9e36;
  border: 1px solid #acacac;
  cursor: pointer;
  width: 117px;
  height: 35px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 10px;
  color: #00503d;
  box-shadow: 2px 3px 4px rgb(0 0 0 / 15%);

  &:hover {
    transform: scale(1.1);
    transition: transform 350ms cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const StyledButton = styled(DietsButton)`
  background: #fefffb;
`;
