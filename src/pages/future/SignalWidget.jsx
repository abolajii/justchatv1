import React, { useState, useEffect } from "react";
import { Clock, Check, Loader } from "lucide-react";
import styled from "styled-components";

const Section = styled.div`
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

const SignalCard = styled.div`
  background: #2d2d2d;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;

  width: 300px;
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

const SpinningLoader = styled(Loader)`
  animation: spin 1s linear infinite;
  color: #fbbf24;
  width: 1rem;
  height: 1rem;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const StatusIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
`;

const OverallStatus = styled.div`
  background: #1e1e1e;
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  color: ${(props) => {
    switch (props.$status) {
      case "inprogress":
        return "#fbbf24";
      case "done":
        return "#34D399";
      default:
        return "#9CA3AF";
    }
  }};
  font-weight: 500;
`;

const SignalWidget = ({ signalsStatus, setSignalsStatus }) => {
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "complete":
        return (
          <StatusIcon>
            <Check
              style={{ color: "#34D399", width: "100%", height: "100%" }}
            />
          </StatusIcon>
        );
      case "inprogress":
        return (
          <StatusIcon>
            <SpinningLoader />
          </StatusIcon>
        );
      default:
        return (
          <StatusIcon>
            <Clock
              style={{ color: "#9CA3AF", width: "100%", height: "100%" }}
            />
          </StatusIcon>
        );
    }
  };

  const updateSignalStatuses = () => {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const updatedSignals = signals.map((signal) => {
      if (currentTime >= signal.start && currentTime < signal.end) {
        return { ...signal, status: "inprogress" };
      } else if (currentTime >= signal.end) {
        return { ...signal, status: "complete" };
      }
      return { ...signal, status: "pending" };
    });

    setSignals(updatedSignals);

    // Update overall signals status
    const hasInProgress = updatedSignals.some(
      (signal) => signal.status === "inprogress"
    );
    const hasCompleted = updatedSignals.some(
      (signal) => signal.status === "complete"
    );
    const allCompleted = updatedSignals.every(
      (signal) => signal.status === "complete"
    );

    if (allCompleted) {
      setSignalsStatus("done");
    } else if (hasInProgress) {
      setSignalsStatus("inprogress");
    } else if (hasCompleted) {
      setSignalsStatus("awaiting next signal");
    } else {
      setSignalsStatus("not started");
    }
  };
  useEffect(() => {
    updateSignalStatuses();
    const interval = setInterval(updateSignalStatuses, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Section>
      <SectionTitle>Today's Signals</SectionTitle>

      <div className="flex gap-md">
        {signals.map((signal) => (
          <SignalCard key={signal.id}>
            <SignalHeader>
              <div>
                <SignalName>{signal.name}</SignalName>
              </div>

              <StatusTag $status={signal.status}>
                {getStatusIcon(signal.status)}
                <span className="ml-1">{signal.status.toUpperCase()}</span>
              </StatusTag>
            </SignalHeader>
            <TimeInfo>
              <Clock style={{ width: "1rem", height: "1rem" }} />
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
