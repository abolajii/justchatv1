import React from "react";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { IoTimeOutline } from "react-icons/io5";
import { RiSignalTowerFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
`;

const Container = styled.div`
  margin-top: 20px;
  padding: 16px;
  background-color: #151515;
  border: 1px solid rgba(34, 197, 94, 0.2);
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 7px;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: rgba(34, 197, 94, 0.4);
    box-shadow: 0 0 10px rgba(34, 197, 94, 0.1);
  }
`;

const Avatar = styled.div`
  height: 45px;
  width: 45px;
  border-radius: 50%;
  background-color: #272727;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  color: #2563eb;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

const SignalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const SignalTitle = styled.div`
  font-weight: 500;
  color: #fff;
`;

const TimeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #e0e0e0;
  font-size: 14px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.active ? "#22c55e" : "#fff")};
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    color: #22c55e;
  }
`;

const SingleSignal = ({ name, time, reminder, onClick }) => (
  <Container onClick={onClick}>
    <Avatar>
      <RiSignalTowerFill size={24} color="#22c55e" />
    </Avatar>
    <ContentWrapper>
      <SignalInfo>
        <SignalTitle>{name}</SignalTitle>
        <TimeWrapper>
          <IoTimeOutline />
          <span>{time}</span>
        </TimeWrapper>
      </SignalInfo>
      {reminder && (
        <IconWrapper active={reminder}>
          <HiOutlineBellAlert />
        </IconWrapper>
      )}
    </ContentWrapper>
  </Container>
);

const formatSignalData = (apiSignal) => {
  return {
    id: apiSignal._id,
    name: apiSignal.name,
    time: `${apiSignal.startTime} - ${apiSignal.endTime}`,
    reminder: apiSignal.reminder,
    startingCapital: apiSignal.startingCapital,
    userTrade: apiSignal.userTrade,
  };
};

const SignalGrid = ({ signals, setSignals }) => {
  const formattedSignals = signals.map(formatSignalData);

  const navigate = useNavigate();

  return (
    <GridContainer>
      {formattedSignals.map((signal) => (
        <SingleSignal
          onClick={() => {
            // setSignals([]);
            navigate(`/trade/view/${signal.id}`);
          }}
          key={signal.id}
          name={signal.name}
          time={signal.time}
          reminder={signal.reminder}
        />
      ))}
    </GridContainer>
  );
};

export default SignalGrid;
