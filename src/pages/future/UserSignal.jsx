import React from "react";
import MainContainer from "./MainContainer";
import { IoIosArrowRoundUp } from "react-icons/io";
import styled from "styled-components";
import SingleSignal from "./SingleSignal";

const Container = styled.div`
  margin-top: 60px;
  width: 100%;
  h1 {
    font-size: 20px;
    margin-right: 5px;
  }

  .text-xs {
    margin-bottom: 4px;
    color: #22c55e;
  }
`;

const Widget = styled.div`
  background-color: #333;
  background-color: #151515;
  width: 330px;
  margin-top: 10px;
  padding: 12px;
  border: 1px solid rgba(34, 197, 94, 0.2);
  /* width: 350px; */
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 14px;
    /* font-weight: 600; */
    color: #e9e9e9;
  }

  &:hover {
    border-color: rgba(34, 197, 94, 0.4);
    box-shadow: 0 0 10px rgba(34, 197, 94, 0.1);
  }
`;

const Price = styled.div`
  h1 {
    font-size: 20px;
    color: #fff;
    font-weight: normal;
  }
`;

const AverageReturn = styled.div`
  font-size: 12px;
  color: #9b9b9b;
`;

const ProgressBar = styled.div`
  height: 3px;
  width: 100%;
  margin-left: 10px;
`;

const ProgressContainer = styled.div``;

const userSignals = [
  { id: 1, isCompleted: true },
  { id: 2, isCompleted: true },
];

const UserSignal = () => {
  return (
    <MainContainer>
      <Container>
        <h1>Signals For Today</h1>
        <Widget>
          <div>
            <p className="title">Signal Report</p>
            <Price className="flex align-end">
              <h1>$302.74</h1>
              <div className="flex align-center text-xs">
                <IoIosArrowRoundUp size={20} color=" #22c55e" />
                2.5%
              </div>
            </Price>
            <AverageReturn> Avg. return $5.14</AverageReturn>
          </div>
          <div>
            <ProgressContainer>{/* {userSignals.map()} */}</ProgressContainer>
            {/* <ProgressBar>
              <ProgressContainer>
                <div
                  style={{
                    width: `${
                      (userSignals.filter((signal) => signal.isCompleted)
                        .length /
                        userSignals.length) *
                      100
                    }%`,
                  }}
                ></div>
              </ProgressContainer>
            </ProgressBar> */}
            {/* <p className="text-xs">
              {userSignals.filter((signal) => signal.isCompleted).length} /{" "}
              {userSignals.length} signals completed
            </p> */}
          </div>
        </Widget>
        <SingleSignal />
      </Container>
    </MainContainer>
  );
};

export default UserSignal;
