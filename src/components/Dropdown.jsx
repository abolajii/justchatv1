import React, { useEffect, useRef } from "react";
import { FaTrashAlt, FaVolumeMute, FaEdit, FaFolderOpen } from "react-icons/fa";
import styled from "styled-components";
import useUserStore from "../store/useUserStore";

const DropdownMenu = styled.div`
  position: absolute;
  top: 0%;
  right: 0;
  background-color: ${(props) => (props.$isDarkMode ? "#333" : "#fff")};
  border: 1px solid ${(props) => (props.$isDarkMode ? "#444" : "#ddd")};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  width: 200px;
  z-index: 10;

  div {
    display: flex;
    align-items: center;
    padding: 10px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s;
    color: ${({ $isDarkMode }) => ($isDarkMode ? "#fff" : "#000")};

    &:hover {
      background-color: ${(props) => (props.$isDarkMode ? "#444" : "#f5f5f5")};
    }

    svg {
      margin-right: 8px;
    }

    &.delete {
      color: #ea1d1d;

      svg {
        color: #ea1d1d;
      }
    }
  }
`;

const DropdownWithIcons = ({
  isDarkMode,
  index,
  post,
  isDropdownVisible,
  setIsDropdownVisible,
  setMoveModal,
  onDelete,
}) => {
  const { user } = useUserStore();
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    index === post._id &&
    isDropdownVisible && (
      <DropdownMenu
        ref={dropdownRef}
        role="menu"
        aria-labelledby="more-options-button"
        $isDarkMode={isDarkMode}
      >
        {post.user._id === user.id && (
          <div className="delete" onClick={onDelete}>
            <FaTrashAlt />
            Delete
          </div>
        )}
        <div>
          <FaVolumeMute />
          Mute User
        </div>
        {post.user._id === user.id && (
          <div>
            <FaEdit />
            Edit
          </div>
        )}
        <div
          onClick={() => {
            setMoveModal(true);
          }}
        >
          <FaFolderOpen />
          Move to Folder
        </div>
      </DropdownMenu>
    )
  );
};
export default DropdownWithIcons;
