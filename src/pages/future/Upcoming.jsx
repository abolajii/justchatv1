import React from "react";
import { RiSignalTowerFill } from "react-icons/ri";
import styled from "styled-components";
import { IoTimeOutline } from "react-icons/io5";

const Container = styled.div`
  margin-top: 60px;
  color: #ffffff;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 15px;
`;

const Inner = styled.div`
  display: flex;
  width: 320px;
  background-color: #151515;
  margin-top: 5px;
  border-radius: 4px;
  padding: 10px;
  gap: 12px;
  align-items: center;
`;

const Avatar = styled.div`
  height: 45px;
  width: 45px;
  border-radius: 50%;
  background-color: #272727;
  display: grid;
  place-items: center;
  flex-shrink: 0;

  color: #22c55e;
  /* border: 1px solid #22c55e; */
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SignalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SignalName = styled.p`
  font-weight: 500;
  font-size: 15px;
`;

const SignalTime = styled.p`
  color: #9ca3af;
  font-size: 13px;
`;

const Tag = styled.div`
  background-color: #272727;
  color: #22c55e;
  color: #2563eb;
  border: 1px solid #2563eb;

  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`;

const TimeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #e0e0e0;
  font-size: 14px;
`;

const Upcoming = () => {
  return (
    <Container>
      <Title>Upcoming Signals</Title>
      <Inner>
        <Avatar>
          <RiSignalTowerFill size={24} color="#2563eb" />
        </Avatar>
        <Content>
          <SignalInfo>
            <SignalName>Signal 2</SignalName>
            <TimeWrapper>
              <IoTimeOutline />
              <span>14:00 - 14:30</span>
            </TimeWrapper>
          </SignalInfo>
          <Tag>Pending</Tag>
        </Content>
      </Inner>
    </Container>
  );
};

export default Upcoming;
