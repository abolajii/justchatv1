import React from "react";
import logo from "../assets/justchat.jpeg";
import styled from "styled-components";

const Container = styled.div`
  height: 48px;
  width: px;
  border-radius: 50%;
  overflow: hidden;
  margin-top: 30px;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const Logo = () => {
  return (
    <Container>
      <img src={logo} alt="logo" />
    </Container>
  );
};

export default Logo;
