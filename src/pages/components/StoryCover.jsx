import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaPlus } from "react-icons/fa";
import useModalStore from "../store/useModalStore";
import Modal from "./Modal";
// import Tabs from "./Tabs";
import Text from "./Text";
import Image from "./Image";
import { BiSend } from "react-icons/bi";
import useStoryStore from "../store/useStoryStore";
import { createStory } from "../../api/request";
import { useAlert } from "../../context/AlertContext";
import { Spinner } from "../../components";
// Modal content animation
const dropDown = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const UserAvi = styled.div`
  height: 54px;
  width: 54px;
  border-radius: 50%;
  position: relative; /* Allows positioning of the plus icon */

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

const PlusIcon = styled.div`
  position: absolute;
  bottom: -2px; /* Slightly outside the avatar */
  right: -2px; /* Slightly outside the avatar */
  height: 18px;
  width: 18px;
  background-color: #6bc1b7; /* Primary color for the plus icon */
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  font-size: 10px; /* Adjust size of the plus icon */
  cursor: pointer;
`;

const Label = styled.div`
  font-size: 1.25rem;
`;

const ModalInner = styled.div`
  background: ${({ bgColor }) => bgColor}; /* Dynamic background color */
  border-radius: 4px;
  width: 100%;
  animation: ${dropDown} 0.3s ease-in-out;
  position: relative; /* Allows absolute positioning of child elements */

  .icon-container {
    position: absolute;
    top: 20px; /* Adjust as needed */
  }

  .left-icons {
    left: 10px; /* Adjust for desired spacing from the left */
  }

  .right-icons {
    right: 10px; /* Adjust for desired spacing from the right */
    display: flex;
    gap: 10px; /* Spacing between icons */
  }

  .icon {
    transition: background-color 0.3s ease; /* Smooth background transition */
    height: 35px;
    width: 35px;
    cursor: pointer;

    &:hover {
      background-color: rgba(
        255,
        255,
        255,
        0.2
      ); /* Light background on hover */
    }
  }

  .textarea {
    border: none;
    width: 100%;
    max-width: 1000px;
    resize: none;
    padding: 20px;
    font-size: 1.15rem;
    color: #fff;
    flex: 1;
    display: flex; /* Flexbox for centering */
    align-items: center; /* Center horizontally */
    justify-content: center; /* Center vertically */
  }

  .footer {
    position: absolute;
    bottom: 0px; /* Spacing from the bottom */
    width: 100%;
    display: flex;
    /* justify-content: center; */
    padding: 15px;
    background-color: rgba(0, 0, 0, 0.2);
    color: #fff;
  }
`;

const TextArea = styled.textarea`
  color: #fff;
  min-width: 80%; /* Start small and expand */
  width: auto; /* Automatically adjust width */
  max-width: 90%; /* Restrict maximum width */
  padding: 10px;
  font-size: 1.2rem;
  font-family: ${({ fontFamily }) => fontFamily || "Roboto"}, sans-serif;
  outline: none;
  border: none;
  resize: none;
  border-radius: 10px;

  &::placeholder {
    color: #ccc;
  }

  transition: width 0.2s ease; /* Smooth width expansion */
`;

const Tab = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin: 0px;
  color: ${({ isActive }) =>
    isActive ? "#fdfdfd" : "#ccc"}; /* Conditional background */
  padding-right: 9px;
  border-radius: 5px;

  &:hover {
    color: ${({ isActive }) =>
      isActive ? "#fdfdfd" : "#ccc"}; /* Slightly darker hover for non-active */
  }
`;

const StoryCover = ({ user, stories = [] }) => {
  const { openModal, closeModal } = useModalStore();
  const { activeTab, setActiveTab, text, image, fontFamily, bgColor, setText } =
    useStoryStore();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Set the active tab
  };

  const submitData = async () => {
    setLoading(true);
    try {
      if (activeTab === "Text") {
        const response = await createStory({ text, fontFamily, bgColor });
        showAlert("success", "Story created successful! 👏"); // Trigger success alertx
        closeModal();
        setText("");
        setLoading(false);
      } else {
        const formData = new FormData();
        formData.append("text", text);
        formData.append("image", image);
        await createStory(formData);
        closeModal();
        setText("");
        setLoading(false);

        showAlert("success", "Story created successful! 👏"); // Trigger success alertx
      }
      setLoading(false);
    } catch (error) {
      showAlert("error", error.response.data.error); // Trigger success alert

      setLoading(false);
    }
  };

  if (stories.length === 0) {
    return (
      <UserAvi>
        <Modal>
          <ModalInner
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {activeTab === "Text" && <Text />}
            {activeTab === "Image" && <Image />}
            {/* {activeTab === "Video" && <Image />} */}
            <div className="footer flex justify-between">
              <div className="flex">
                <Tab
                  isActive={activeTab === "Text"}
                  onClick={() => handleTabClick("Text")}
                >
                  TEXT
                </Tab>
                <Tab
                  isActive={activeTab === "Image"}
                  onClick={() => handleTabClick("Image")}
                >
                  IMAGE
                </Tab>
                {/* <Tab
                  isActive={activeTab === "Video"}
                  onClick={() => handleTabClick("Video")}
                >
                  VIDEO
                </Tab> */}
              </div>
              <div className="icon center" onClick={submitData}>
                {loading ? <Spinner size="17px" /> : <BiSend size={26} />}
              </div>
            </div>
          </ModalInner>
        </Modal>
        <img src={user.profilePic} />
        <PlusIcon onClick={openModal}>
          <FaPlus />
        </PlusIcon>
      </UserAvi>
    );
  } else if (stories.length === 1) {
    return <div>StoryCover</div>;
  }
  return <div>StoryCover</div>;
};

export default StoryCover;
