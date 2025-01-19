import React, { useState, useEffect } from "react";
import { Clock, Check, Loader } from "lucide-react";
import styled from "styled-components";

const Section = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  /* gap: 0.75rem; */
  /* background: #1e1e1e; */
  border-radius: 8px;
  margin: 10px 0;
`;

const SectionTitle = styled.h4`
  font-size: 0.805rem;
  color: #9ca3af;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const SignalCard = styled.div`
  background: #2d2d2d;
  border-radius: 8px;
  padding: 1rem;
  width: 300px;
  margin: 1rem 0;
`;

const SignalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const SignalName = styled.h4`
  color: #f3f4f6;
  font-size: 1rem;
  margin: 0;
`;

const TimeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #9ca3af;
  font-size: 0.875rem;
`;

const StatusTag = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.6rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;

  ${(props) => {
    switch (props.$status.toLowerCase()) {
      case "pending":
        return `
          background-color: #374151;
          color: #9CA3AF;
        `;
      case "inprogress":
        return `
          background-color: #854D0E;
          color: #FDE68A;
        `;
      case "complete":
      case "completed":
        return `
          background-color: #065F46;
          color: #A7F3D0;
        `;
      default:
        return `
          background-color: #374151;
          color: #9CA3AF;
        `;
    }
  }}
`;
const SignalWidget = () => {
  const [signals, setSignals] = useState([
    {
      id: 1,
      name: "Signal 1",
      start: "14:00",
      end: "14:30",
      status: "pending",
    },
    {
      id: 2,
      name: "Signal 2",
      start: "19:00",
      end: "19:30",
      status: "pending",
    },
  ]);

  const updateSignalStatus = () => {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    setSignals((prevSignals) =>
      prevSignals.map((signal) => {
        if (currentTime >= signal.start && currentTime < signal.end) {
          return { ...signal, status: "inprogress" };
        } else if (currentTime >= signal.end) {
          return { ...signal, status: "complete" };
        }
        return { ...signal, status: "pending" };
      })
    );
  };

  useEffect(() => {
    updateSignalStatus();
    const interval = setInterval(updateSignalStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "complete":
        return <Check className="w-4 h-4 text-green-400" />;
      case "inprogress":
        return <Loader className="w-4 h-4 text-yellow-400 animate-spin" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <Section>
      <SectionTitle>Today's Signals</SectionTitle>
      <div className="flex gap-md">
        {signals.map((signal) => (
          <SignalCard key={signal.id}>
            <SignalHeader>
              <SignalName>{signal.name}</SignalName>
              <StatusTag $status={signal.status}>
                {getStatusIcon(signal.status)}
                <span className="ml-1">{signal.status.toUpperCase()}</span>
              </StatusTag>
            </SignalHeader>
            <TimeInfo>
              <Clock className="w-4 h-4" />
              <span>
                {signal.start} - {signal.end}
              </span>
            </TimeInfo>
          </SignalCard>
        ))}
      </div>
    </Section>
  );
};

export default SignalWidget;
