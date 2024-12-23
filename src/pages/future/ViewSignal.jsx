import React from "react";
import MainContainer from "./MainContainer";

import styled from "styled-components";

const Container = styled.div``;

const ViewSignal = () => {
  return (
    <MainContainer>
      <Container>
        <div>A</div>
        <div>B</div>
        <div>C</div>
      </Container>
    </MainContainer>
  );
};

export default ViewSignal;
