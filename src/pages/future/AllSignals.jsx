import React, { useEffect, useState } from "react";
import MainContainer from "./MainContainer";
import styled from "styled-components";
import { getAllSignal } from "../../api/request";
import { useNavigate } from "react-router-dom";
import { MdDateRange } from "react-icons/md";
const Container = styled.div`
  margin-top: 60px;
  h1 {
    font-size: 20px;
    margin-right: 5px;
    color: #fff;
    margin-bottom: 24px;
  }

  svg {
    margin-right: 3px;
  }
`;

const SignalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const SignalCard = styled.div`
  padding: 16px;
  background-color: #151515;
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 9px;
  cursor: pointer;
  transition: transform 0.2s;
`;

const DateText = styled.h3`
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 12px;
`;

const StatsRow = styled.div`
  display: flex;
  gap: 16px;
`;

const StatItem = styled.div`
  color: #e0e0e0;
  font-size: 14px;
  span {
    color: ${(props) => props.color || "#22c55e"};
    margin-left: 4px;
  }
`;

const AllSignals = () => {
  const [allSignals, setAllSignals] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSignals = async () => {
      try {
        const response = await getAllSignal();
        setAllSignals(response.groupedSignals);
      } catch (error) {
        setError("Failed to fetch signals");
      } finally {
        setLoading(false);
      }
    };

    fetchSignals();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading)
    return (
      <MainContainer>
        <Container>Loading...</Container>
      </MainContainer>
    );
  if (error)
    return (
      <MainContainer>
        <Container>Error: {error}</Container>
      </MainContainer>
    );

  return (
    <MainContainer>
      <Container>
        <h1>All Signals</h1>
        <SignalGrid>
          {allSignals.map((day) => {
            const completed = day.signals.filter(
              (s) => s.status === "completed"
            ).length;
            const pending = day.signals.filter(
              (s) => s.status === "pending"
            ).length;

            return (
              <SignalCard
                key={day._id}
                // onClick={() => navigate(`/signals/day/${day._id}`)}
              >
                <DateText className="flex align-center">
                  <MdDateRange />
                  {formatDate(day._id)}
                </DateText>
                <StatsRow>
                  <StatItem>
                    Completed:<span>{completed}</span>
                  </StatItem>
                  <StatItem color="#e0e0e0">
                    Pending:<span>{pending}</span>
                  </StatItem>
                </StatsRow>
              </SignalCard>
            );
          })}
        </SignalGrid>
      </Container>
    </MainContainer>
  );
};

export default AllSignals;
