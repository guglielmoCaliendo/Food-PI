import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Landing() {
  return (
    <Overlay>
      <Container>
        <Welcome>Welcome,</Welcome>
        <Title>Henry Foodie</Title>
        <Para>Find and share new recipes </Para>
        <Link to='/app'>
          <Button>Get Started</Button>
        </Link>
      </Container>
    </Overlay>
  );
}

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  width: 450px;
  max-height: 400px;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  background: #fefffb;
  box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.15);

  @media (max-width: 820px) {
    width: 350px;
  }
`;

const Title = styled.h1`
  font-size: 50px;
  color: #00503d;
  margin: 0;
`;

const Welcome = styled.p`
  color: #4a5754;
  font-weight: 600;
`;

const Para = styled.p`
  color: #218a71;
  font-weight: 600;
`;

const Button = styled.button`
  background: #fefffb;
  border: 1px solid #acacac;
  border-radius: 22px;
  cursor: pointer;
  width: 200px;
  height: 50px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 20px;
  color: #00503d;
  margin-top: 30px;

  &:hover {
    border-color: #4a5754;
  }
`;
