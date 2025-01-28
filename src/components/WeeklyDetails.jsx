import React, { useEffect } from "react";
import styled from "styled-components";
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from "lucide-react";
import useSignalStore from "../pages/future/store/useSignalStore";
import { getUserSignal } from "../api/request";
import { generateWeeklyData } from "../utils";

// Styled Components
const Container = styled.div`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const DayCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #eee;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SectionTitle = styled.h4`
  font-size: 0.875rem;
  color: #666;
  margin: 0;
`;

const ProfitText = styled.span`
  color: ${(props) => (props.$isPositive ? "#10B981" : "#EF4444")};
  font-weight: 600;
  font-size: ${(props) => (props.$isLarge ? "1.25rem" : "1rem")};
`;

const DayHeader = styled.div`
  margin-bottom: 1rem;
`;

const DayTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: #1a1a1a;
`;

const StatusText = styled.span`
  font-size: 0.875rem;
  color: #666;
`;

const WeeklyDetails = () => {
  const { setWeeklyCapital, weeklyCapital } = useSignalStore();

  // Function to calculate profits based on initial balance

  useEffect(() => {
    const fetchSignal = async () => {
      try {
        const response = await getUserSignal();
        if (response?.startingCapital) {
          // Initially show Naira as primary currency
          setWeeklyCapital(response.weeklyCapital);
          // setBalance(dollarAmount);
        }
      } catch (error) {
        console.error("Failed to fetch signal:", error);
      }
    };

    fetchSignal();
  }, []);

  const weeklyData = generateWeeklyData();

  return (
    <Container>
      <Card>
        <CardHeader>
          <CardTitle>Weekly Trading Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {weeklyData.map((day, index) => (
            <DayCard key={index}>
              <DayHeader>
                <DayTitle>{day.day}</DayTitle>
                <StatusText>Status: {day.status}</StatusText>
              </DayHeader>

              <Grid>
                <Section>
                  <SectionTitle>Capital</SectionTitle>
                  <div>
                    <div>Starting: ${day.startingCapital.toFixed(2)}</div>
                    <div>Final: ${day.finalCapital.toFixed(2)}</div>
                  </div>
                </Section>

                <Section>
                  <SectionTitle>Signal Profits</SectionTitle>
                  <div>
                    <div>
                      Signal 1:{" "}
                      <ProfitText $isPositive={true}>
                        +${day.firstSignalProfit.toFixed(2)}
                      </ProfitText>
                    </div>
                    <div>
                      Signal 2:{" "}
                      <ProfitText $isPositive={true}>
                        +${day.secondSignalProfit.toFixed(2)}
                      </ProfitText>
                    </div>
                  </div>
                </Section>

                <Section>
                  <SectionTitle>Total Profit</SectionTitle>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <ProfitText
                      $isPositive={day.totalProfit > 0}
                      $isLarge={true}
                    >
                      {day.totalProfit > 0 ? "+" : ""}
                      {day.totalProfit.toFixed(2)}
                    </ProfitText>
                    {day.totalProfit > 0 ? (
                      <ArrowTrendingUpIcon size={16} color="#10B981" />
                    ) : (
                      <ArrowTrendingDownIcon size={16} color="#EF4444" />
                    )}
                  </div>
                </Section>

                <Section>
                  <SectionTitle>Profit Difference</SectionTitle>
                  <ProfitText $isPositive={day.differenceInPofiit > 0}>
                    {day.differenceInPofiit > 0 ? "+" : ""}
                    {day.differenceInPofiit.toFixed(2)}
                  </ProfitText>
                </Section>
              </Grid>
            </DayCard>
          ))}
        </CardContent>
      </Card>
    </Container>
  );
};

export default WeeklyDetails;
