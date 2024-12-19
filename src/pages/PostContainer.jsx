import React from "react";
import styled from "styled-components";
import useUserStore from "../store/useUserStore";
import useThemeStore from "../store/useThemeStore"; // Import theme store
import BottomIcons from "../components/BottomIcons";
import { createPost } from "../api/request";
import { useAlert } from "../context/AlertContext";
import usePostStore from "./store/usePostStore";

const Container = styled.div`
  border-bottom: 1px solid ${(props) => (props.isDarkMode ? "#333" : "#ebebeb")};
  border-radius: 4px;
  background-color: ${(props) => (props.isDarkMode ? "#1e1e1e" : "#fff")};
  padding: 10px;

  .gap {
    gap: 10px;
  }

  textarea {
    width: 100%;
    /* border: 1px solid ${(props) =>
      props.isDarkMode ? "#333" : "#e0e0e0"}; */
    border-radius: 4px;
    font-size: 16px;
    min-height: 70px;
    outline: none;
    resize: none;
    font-family: inherit;
    color: ${(props) => (props.isDarkMode ? "#e0e0e0" : "#333")};
    /* background-color: ${(props) =>
      props.isDarkMode ? "#121212" : "#f9f9f9"}; */
    transition: border-color 0.2s ease;

    &:focus {
      border-color: #6bc1b7;
    }

    &::placeholder {
      color: ${(props) => (props.isDarkMode ? "#888" : "#666")};
    }
  }

  .flex-1 {
    flex: 1;
  }

  .action-icons {
    display: flex;
    gap: 10px;
    color: ${(props) => (props.isDarkMode ? "#a2a2a2" : "#555")};
    cursor: pointer;
    font-size: 18px;
    align-items: center;

    .disabled {
      color: ${(props) => (props.isDarkMode ? "#555" : "#ccc")};
      cursor: not-allowed;
    }
  }

  .send-icon {
    color: #6bc1b7;
    cursor: pointer;
    font-size: 20px;

    &.disabled {
      color: ${(props) => (props.isDarkMode ? "#555" : "#ccc")};
      cursor: not-allowed;
    }
  }

  svg {
    color: ${(props) => (props.isDarkMode ? "#a2a2a2" : "#a2a2a2")};

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
    border: 2px solid
      ${(props) =>
        props.isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const PostContainer = () => {
  const { user } = useUserStore();
  const { isDarkMode } = useThemeStore(); // Get dark mode state
  const { content, setContent, image, setImage, file, setFile } =
    usePostStore();

  const { showAlert } = useAlert();

  const handleSendClick = async () => {
    // Validate content before sending
    if (!content.trim()) {
      showAlert("error", "Post content cannot be empty");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    if (file) {
      formData.append("imagePost", file);
    }

    try {
      const response = await createPost(formData);
      console.log("Post created:", response);
      showAlert("success", "Post created successfully!");

      // Reset the state
      setFile(null);
      setImage(null);
      setContent("");
    } catch (error) {
      console.error("Error creating post:", error);
      showAlert(
        "error",
        error.response?.data?.message || "Failed to create post"
      );
    }
  };

  return (
    <Container isDarkMode={isDarkMode}>
      <div className="flex gap">
        <UserAvi isDarkMode={isDarkMode}>
          <img
            src={user.profilePic}
            alt="User Avatar"
            onError={(e) => {
              e.target.src = "/default-avatar.png"; // Fallback avatar
            }}
          />
        </UserAvi>
        <div className="flex-1 flex">
          <textarea
            placeholder="Share your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={500} // Optional: Add a max length
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
