import React, { useState } from "react";
import styled, { css } from "styled-components";

const InteractionContainerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const interactionStyles = css`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${(props) => (props.$isDarkMode ? "#888888" : "#657786")};

  &:hover {
    transform: scale(1.1);
    color: ${(props) => props.hoverColor || "inherit"};
  }
`;

const InteractionItem = styled.div`
  ${interactionStyles}
  position: relative;
  z-index: 3;
`;

const InteractionCount = styled.span`
  margin-left: 5px;
  font-size: 12px;
  color: ${(props) => (props.$isDarkMode ? "#aaaaaa" : "#657786")};
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
  min-width: 200px;
  padding: 10px;
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f5f8fa;
  }
`;

const InteractionContainer = ({ isDarkMode, interactions }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const shareDropdownOptions = [
    {
      label: "Quote Post",
      onClick: () => {},
    },
    {
      label: "Share Post",
      onClick: () => {},
    },
  ];

  return (
    <InteractionContainerWrapper>
      {interactions.map(
        ({ Icon, count, onClick, isActive, hoverColor, fill, tag }) => {
          if (tag === "share") {
            return (
              <div key="share" style={{ position: "relative" }}>
                <InteractionItem
                  $isDarkMode={isDarkMode}
                  hoverColor={hoverColor}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <Icon size={18} fill={isActive ? fill : "none"} />
                  {count !== undefined && (
                    <InteractionCount $isDarkMode={isDarkMode}>
                      {count === 0 ? "" : count}
                    </InteractionCount>
                  )}
                </InteractionItem>
                {dropdownOpen && (
                  <DropdownContainer>
                    {shareDropdownOptions.map((option, index) => (
                      <DropdownItem
                        key={index}
                        onClick={() => {
                          option.onClick();
                          setDropdownOpen(false);
                        }}
                      >
                        {option.label}
                      </DropdownItem>
                    ))}
                  </DropdownContainer>
                )}
              </div>
            );
          }

          return (
            <InteractionItem
              key={tag}
              $isDarkMode={isDarkMode}
              hoverColor={hoverColor}
              onClick={onClick}
            >
              <Icon size={18} fill={isActive ? fill : "none"} />
              {count !== undefined && (
                <InteractionCount $isDarkMode={isDarkMode}>
                  {count === 0 ? "" : count}
                </InteractionCount>
              )}
            </InteractionItem>
          );
        }
      )}
    </InteractionContainerWrapper>
  );
};

export default InteractionContainer;
