import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--background-color);
  color: var(--primary-color);
  font-size: 24px;
  font-weight: bold;
`;

const Register = () => {
  return <Container>Register Page</Container>;
};

export default Register;
