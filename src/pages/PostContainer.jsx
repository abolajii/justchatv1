import React, { useState } from "react";
import styled from "styled-components";
import useUserStore from "../store/useUserStore";
import BottomIcons from "../components/BottomIcons";

const Container = styled.div`
  border-bottom: 1px solid #ebebeb;
  border-radius: 4px;
  padding: 10px;
  .gap {
    gap: 10px;
  }
  textarea {
    width: 100%;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    min-height: 70px;
    outline: none;
    resize: none;
    font-family: inherit;
  }

  .flex-1 {
    flex: 1;
  }

  .action-icons {
    display: flex;
    gap: 10px;
    color: #555;
    cursor: pointer;
    font-size: 18px;
    align-items: center;

    .disabled {
      color: #ccc;
      cursor: not-allowed;
    }
  }

  .send-icon {
    color: #6bc1b7;
    cursor: pointer;
    font-size: 20px;

    &.disabled {
      color: #ccc;
      cursor: not-allowed;
    }
  }

  svg {
    color: #a2a2a2;

    &:hover {
      color: #6bc1b7;
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  animation: ${(props) => (props.show ? "fadeIn 0.3s" : "fadeOut 0.3s")};
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

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  height: 400px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, opacity 0.3s ease;
  margin-top: 10px;
  width: 390px;
`;

const UserAvi = styled.div`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  cursor: pointer;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 10px;
    opacity: 0.85;
  }
`;

const PostContainer = () => {
  const { user } = useUserStore();
  const [postContent, setPostContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSendClick = () => {
    if (!postContent.trim()) return;
    console.log("Post sent:", postContent);
    setPostContent("");
  };

  return (
    <Container>
      <div className="flex gap">
        <UserAvi>
          <img src={user.profilePic} alt="User Avatar" />
        </UserAvi>
        <div className="flex-1 flex">
          <textarea
            placeholder="Share your thoughts..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
        </div>
      </div>
      <BottomIcons
        onSubmit={handleSendClick}
        postContent={postContent}
        image={image}
        setImage={setImage}
      />
    </Container>
  );
};

export default PostContainer;
