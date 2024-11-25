import React from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

// Sidebar styles with transition for sliding in and out
const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: ${(props) =>
    props.isOpen ? "0" : "-220px"}; /* Use negative value for closing */
  height: 100%;
  width: 220px; /* Width of the sidebar */
  background-color: rgba(232, 239, 239, 1);
  transition: left 0.3s ease-in-out; /* Smooth sliding transition */
  z-index: 1000;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.02);

  .divider {
    height: 14px;
    width: 1px;
    background: #9c9c9c;
    margin: 0 3px;
  }
  .btn {
    padding: 7px;
    margin-top: 4px;
    margin-bottom: 10px;
    flex: 1;
    text-align: center;
  }
  .name {
    font-size: 15px;
    font-weight: 500;
  }

  .time {
    font-size: 12px;
    color: #393939;
  }

  .top {
    margin-top: 20px;
  }

  .add {
    color: #36bbba;
    border: none;
    padding: 4px 12px;
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid #36bbba;
    font-size: 13px;

    &:hover {
      background: #cbfafa;
    }
  }

  .absolute {
    left: 40px;
  }

  .menu-container {
    position: absolute;
    top: 100px;
    height: calc(100% - 100px);
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
  color: #36bbba;

  &:hover {
    color: #6ebaba;
  }
`;

const Drawer = ({ isOpen, setIsOpen }) => {
  return (
    <Sidebar isOpen={isOpen}>
      <CloseButton onClick={() => setIsOpen(false)}>
        <MdClose />
      </CloseButton>
    </Sidebar>
  );
};

export default Drawer;
