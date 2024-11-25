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
  background-color: #fcfcfc;
  transition: left 0.3s ease-in-out; /* Smooth sliding transition */
  z-index: 1000;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.1);
  .top {
    margin-top: 20px;
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

      <div className="top">{/* <h3>Menu</h3> */}</div>
    </Sidebar>
  );
};

export default Drawer;
