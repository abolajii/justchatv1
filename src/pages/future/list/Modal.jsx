import React, { useState } from "react";
import styled from "styled-components";
import { DollarSign, RefreshCw } from "lucide-react";
import useSignalStore from "../store/useSignalStore";

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background-color: #1f1f1f;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  border: 1px solid rgba(34, 197, 94, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.div`
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

const CapitalWidget = styled.div`
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.2s;

  &:hover {
    background: rgba(34, 197, 94, 0.15);
    transform: translateY(-1px);
  }
`;

const CapitalAmount = styled.div`
  color: #22c55e;
  font-weight: 600;
  font-size: 1.125rem;
  display: flex;
  flex-direction: column;
`;

const CapitalLabel = styled.span`
  color: #9ca3af;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`;

const SecondaryAmount = styled.span`
  color: #9ca3af;
  font-size: 0.875rem;
  font-weight: normal;
`;

const CurrencyToggle = styled.button`
  background: none;
  border: none;
  color: #22c55e;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background: rgba(34, 197, 94, 0.2);
  }

  svg {
    transition: transform 0.3s;
  }

  &:hover svg {
    transform: rotate(180deg);
  }
`;

const ReuseableModal = ({ onClose, title, body, footer }) => {
  const [isUSD, setIsUSD] = useState(true);

  const { defaultValue: totalCapitalInUSD } = useSignalStore();

  const exchangeRate = 1656;
  const totalCapitalInNGN = totalCapitalInUSD * exchangeRate;

  const toggleCurrency = () => {
    setIsUSD(!isUSD);
  };
  const formatCurrency = (amount, currency) => {
    if (currency === "₦") {
      // Custom Naira formatting
      return `₦${amount.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }

    // Default USD formatting
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };
  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            {title}
            <CapitalWidget>
              {/* <DollarSign size={18} color="#22c55e" /> */}
              <CapitalAmount>
                <CapitalLabel>Total Capital</CapitalLabel>
                {isUSD ? (
                  <>
                    {formatCurrency(totalCapitalInUSD, "USD")}
                    <SecondaryAmount>
                      ≈ {formatCurrency(totalCapitalInNGN, "₦")}
                    </SecondaryAmount>
                  </>
                ) : (
                  <>
                    {formatCurrency(totalCapitalInNGN, "₦")}
                    <SecondaryAmount>
                      ≈ {formatCurrency(totalCapitalInUSD, "USD")}
                    </SecondaryAmount>
                  </>
                )}
              </CapitalAmount>
              <CurrencyToggle onClick={toggleCurrency} title="Toggle Currency">
                <RefreshCw size={16} />
              </CurrencyToggle>
            </CapitalWidget>
          </ModalTitle>
        </ModalHeader>
        {body}
        <ModalActions>{footer}</ModalActions>
      </ModalContent>
    </Modal>
  );
};

export default ReuseableModal;
