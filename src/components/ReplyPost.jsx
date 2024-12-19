import React from "react";
import styled from "styled-components";
import usePostStore from "../pages/store/usePostStore";
import BottomIcons from "./BottomIcons";
import { formatDate } from "../utils";
import useUserStore from "../store/useUserStore";
import { MdClose } from "react-icons/md";

const Container = styled.div`
  margin-top: 10px;

  textarea {
    width: 100%;
    resize: none;
    font-family: inherit;
  }
`;

const Width = styled.div`
  width: 40px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
`;

const UserAvi = styled.div`
  height: 38px;
  width: 38px;
  border-radius: 50%;
  background-color: #e7e7e7;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-shrink: 0;

  img {
    border-radius: 50%;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const Height = styled.div`
  width: 3px;
  height: 100%;
  background-color: #6bc1b7;
`;

const Content = styled.div`
  width: calc(100% - 50px);
  font-size: 13px;
  padding-bottom: 10px;
  line-height: 1.3;
`;

const ReplyingTo = styled.div`
  margin-top: 4px;
  font-size: 11px;
  color: #696969;
  span {
    color: #1a8947;
  }
`;

const Username = styled.div`
  color: #333;
  font-size: 14px;
`;

const Timestamp = styled.div`
  font-size: 12px;
  color: #888;
`;

const ImageContainer = styled.div`
  margin-top: 10px;
  position: relative;
  max-width: 300px;

  img {
    max-width: 100%;
    border-radius: 8px;
  }

  .btn {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 5px;
    height: 20px;
    width: 20px;
    background: rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ReplyPost = () => {
  const [content, setContent] = React.useState("");
  const [file, setFile] = React.useState(null);
  const { singlePost } = usePostStore();
  const { user } = useUserStore();
  const fileInputRef = React.useRef(null);

  const post = singlePost;

  const handleSendClick = () => {
    // Send the reply to the server
    // Update the post's comments array with the new comment
    // Reset the content input field
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleFileRemove = () => {
    setFile(null);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Container>
      <div className="flex">
        <Width>
          <UserAvi>
            <img src={post.user.profilePic} alt="User Avatar" />
          </UserAvi>
        </Width>
        <div>
          <Username>{post.user.name}</Username>
          <Timestamp>{formatDate(post.createdAt)}</Timestamp>
        </div>
      </div>
      <div className="flex align-start">
        <Width>
          <Height />
        </Width>
        <Content>
          <div>{post.content}</div>
          <ReplyingTo className="flex align-end">
            <div>
              Replying to <span>@{post.user.username}</span>
            </div>
          </ReplyingTo>
        </Content>
      </div>
      <div className="flex">
        <Width>
          <UserAvi>
            <img src={user.profilePic} alt="User Avatar" />
          </UserAvi>
        </Width>
        <div className="flex flex-col flex-1">
          <div className="flex-1 flex flex-col">
            <textarea
              placeholder="What do you think?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={500}
            />
            {file && (
              <ImageContainer>
                <img src={URL.createObjectURL(file)} alt="Image" />
                <div className="btn center" onClick={handleFileRemove}>
                  <MdClose color="#ccc" size={27} />
                </div>
              </ImageContainer>
            )}
          </div>
          <BottomIcons reply onSubmit={handleSendClick} postContent={content}>
            <HiddenFileInput
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </BottomIcons>
        </div>
      </div>
    </Container>
  );
};

export default ReplyPost;
