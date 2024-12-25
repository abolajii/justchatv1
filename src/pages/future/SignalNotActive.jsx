import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

import styled from "styled-components";

const Widget = styled.div`
  padding: 16px;
  gap: 10px;
  min-height: 100px;
  border: 1px solid rgba(34, 197, 94, 0.2);
  width: 230px;
  border-radius: 9px;
  background-color: #151515;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 20px;
`;

const IconWrapper = styled.div`
  height: ${(props) => (props.small ? "30px" : "40px")};
  width: ${(props) => (props.small ? "30px" : "40px")};
  border-radius: 50%;
  border: 1px solid rgba(34, 197, 94, 0.2);
  background-color: #272727;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #22c55e;
  font-size: ${(props) => (props.small ? "14px" : "18px")};
  flex-shrink: 0;
`;

const SignalWidget = ({ label, value, balance }) => (
  <Widget>
    <div>
      <div style={{ color: "#e0e0e0", marginBottom: "8px" }}>{label}</div>
      <div style={{ color: "#fff", fontSize: "18px", fontWeight: "500" }}>
        {value}
      </div>
    </div>
    <div style={{ color: "#22c55e", fontSize: "14px", marginTop: "auto" }}>
      {label === "To" ? "Est. Profit" : "Capital"}: {balance}
    </div>
  </Widget>
);
const SignalNotActive = ({ v1, v2, b1, b2, active }) => {
  if (active) {
    return (
      <Container>
        <SignalWidget
          label="From"
          value={v1}
          balance={b1} // Naira value
        />
        <IconWrapper>
          <FaArrowRightLong />
        </IconWrapper>
        <SignalWidget label="To" value={v2} balance={b2} />
      </Container>
    );
  } else {
    return (
      <Container>
        <SignalWidget
          label="From"
          value={"$0.00"}
          balance={"#0.00"} // Naira value
        />
        <IconWrapper>
          <FaArrowRightLong />
        </IconWrapper>
        <SignalWidget label="To" value={"$0.00"} balance={"#0.00"} />
      </Container>
    );
  }
};

export default SignalNotActive;
