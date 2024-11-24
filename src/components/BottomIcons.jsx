import React, { useState } from "react";
import { FaPaperPlane, FaPollH, FaSmile, FaTimes } from "react-icons/fa";
import { HiPhotograph } from "react-icons/hi";
import { RiCalendarScheduleFill } from "react-icons/ri";
import styled from "styled-components";
import useModalStore from "../pages/store/useModalStore";
import Poll from "../pages/components/Poll";
import Schedule from "../pages/components/Schedule";
import Desktop from "../responsive/Desktop";

const EmojiPopup = styled.div`
  position: absolute;
  top: 28px;
  left: 50%;
  width: 270px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  transform: translate(-50%, 0%);
  padding: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${(props) => (props.show ? "fadeIn 0.3s" : "fadeOut 0.3s")};
  z-index: 10;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

const CloseButton = styled(FaTimes)`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
`;

const BottomIcons = ({ onSubmit, postContent, image, setImage, setFile }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const { openPollModal, openScheduleModal } = useModalStore();

  const openFilePicker = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFile(file);
      }
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setImage(e.target.result);
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  const toggleEmojiPopup = () => setShowEmoji((prev) => !prev);

  return (
    <div>
      <div className="center">
        {image && (
          <ImageContainer>
            <img src={image} alt="Post" />
            <CloseButton onClick={() => setImage("")} title="Remove Image" />
          </ImageContainer>
        )}
      </div>
      <div
        className="flex justify-between"
        style={{ marginTop: "10px", position: "relative" }}
      >
        <div className="action-icons" style={{ display: "flex", gap: "10px" }}>
          <Desktop>
            <div className="relative center">
              <FaSmile title="Add Emoji" onClick={toggleEmojiPopup} size={20} />
              {showEmoji && (
                <EmojiPopup show={showEmoji}>
                  <p>Emoji Picker Here</p>
                  {/* Replace with actual emoji picker library */}
                </EmojiPopup>
              )}
            </div>
          </Desktop>

          <HiPhotograph
            title="Attach File"
            size={20}
            onClick={openFilePicker}
          />
          <div className="center">
            <FaPollH
              title="Create Poll"
              size={20}
              onClick={() => {
                openPollModal();
              }}
            />
            <Poll />
          </div>
          <div className="center">
            <RiCalendarScheduleFill
              title="Schedule Post"
              size={20}
              onClick={() => {
                openScheduleModal();
              }}
            />
            <Schedule />
          </div>
        </div>
        <div>
          <FaPaperPlane
            title="Send"
            size={20}
            className={`send-icon ${
              !postContent.trim() && !image ? "disabled" : ""
            }`}
            onClick={onSubmit}
            style={{
              cursor: postContent.trim() || image ? "pointer" : "not-allowed",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BottomIcons;
