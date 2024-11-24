import React, { useState } from "react";
import styled from "styled-components";
import useUserStore from "../store/useUserStore";
import BottomIcons from "../components/BottomIcons";
import { createPost } from "../api/request";
import { useAlert } from "../context/AlertContext";
import usePostStore from "./store/usePostStore";

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
  const { content, setContent, image, setImage, file, setFile } =
    usePostStore();

  const { showAlert } = useAlert();

  const handleSendClick = async () => {
    console.log("Post sent:", content, file);
    // Send the post to the server
    const formData = new FormData();
    formData.append("content", content);
    if (file) {
      formData.append("imagePost", file);
    }

    try {
      const response = await createPost(formData);
      console.log("Post created:", response);
      showAlert("success", "Post created successful!"); // Trigger success alert
    } catch (error) {
      console.error("Error creating post:", error.message);
      showAlert("error", error.response.data.message); // Trigger error alert
    }

    // Reset the state
    setFile(null);
    setImage(null);
    setContent("");
    // setPostContent("");
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
      <BottomIcons
        onSubmit={handleSendClick}
        postContent={content}
        image={image}
        setFile={setFile}
        setImage={setImage}
      />
    </Container>
  );
};

export default PostContainer;
