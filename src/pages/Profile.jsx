import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { MainContainer } from "../components";
import useUserStore from "../store/useUserStore";
import useThemeStore, { darkTheme, lightTheme } from "../store/useThemeStore";
import bg from "./bg.jpg";
import { IoMdArrowBack, IoMdSettings } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../api/request";
import { HiCheckBadge } from "react-icons/hi2";
import { IoLocationSharp } from "react-icons/io5";
import ProfileTab from "./ProfileTab";

// Modal Animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const BackdropContainer = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  background-color: ${(props) => props.theme.inputBackground};
  margin-bottom: 42px;
`;

const ProfileContainer = styled.div`
  position: absolute;
  bottom: -40px;
  left: 20px;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.secondaryBackground || "#eaeaea"};
  overflow: hidden;
  border: 3px solid ${(props) => props.theme.background};
`;

const Name = styled.div`
  font-size: 1.1rem;
  color: ${(props) => props.theme.textPrimary};
  font-weight: 500;
`;

const UserName = styled.div`
  font-size: 0.95rem;
  color: ${(props) => props.theme.textSecondary};
  margin-top: -4px;
`;

const Bio = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.textPrimary};
  line-height: 1.35;
  margin-top: 4px;
`;

const Location = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.textPrimary};
  line-height: 1.35;
  margin-top: 4px;
  margin-left: -3px;

  span {
    margin-right: 10px;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 5px;

  div {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    color: ${(props) => props.theme.textPrimary};
    cursor: pointer;
  }

  span {
    font-weight: bold;
    color: ${(props) => props.theme.primaryColor || "#28a69e"};
    margin-right: 3px;
  }
`;

// const BackdropContainer = styled.div`
//   position: relative;
//   width: 100%;
//   height: 180px;
//   background-color: ${(props) => props.theme.inputBackground};
//   margin-bottom: 42px;
// `;

const BackdropImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// const ProfileContainer = styled.div`
//   position: absolute;
//   bottom: -40px;
//   left: 20px;
//   width: 90px;
//   height: 90px;
//   border-radius: 50%;
//   background-color: #eaeaea;
//   background-color: ${(props) => props.theme.secondaryBackground};

//   overflow: hidden;
//   border: 3px solid white;
// `;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Container = styled.div`
  width: 700px;
  overflow: scroll;
  height: 100vh;

  .icon {
    margin-left: -4px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  &::-webkit-scrollbar {
    /* display: none; */
    width: 0px;
  }
`;
const SettingsIcon = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${(props) => props.theme.iconColor};
`;

const BackButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${(props) => props.theme.textPrimary};
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  /* background: white; */
  /* padding: 15px; */
  border-radius: 10px;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const ModalImage = styled.img`
  max-width: 90vw;
  max-height: 80vh;
  object-fit: contain;
  border: 3px solid white;
`;

const ProfileDetails = styled.div`
  padding-left: 30px;

  @media (max-width: 768px) {
    padding-left: 0px;
  }
`;

// const Name = styled.div`
//   font-size: 1.1rem;
//   color: #0a0909;
//   font-weight: 500;
// `;

// const UserName = styled.div`
//   font-size: 0.95rem;
//   color: #2f2f2f;
//   margin-top: -4px;
// `;

// const Bio = styled.div`
//   font-size: 0.9rem;
//   color: #404040;
//   line-height: 1.35;
//   color: #0a0909;
//   margin-top: 4px;
// `;

// const Location = styled.div`
//   font-size: 0.9rem;
//   color: #404040;
//   line-height: 1.35;
//   color: #0a0909;
//   margin-top: 4px;
//   margin-left: -3px;

//   span {
//     /* color: #28a69e; */
//     margin-right: 10px;
//   }
// `;

// const StatsContainer = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 15px;
//   margin-top: 5px;

//   div {
//     display: flex;
//     align-items: center;
//     font-size: 0.9rem;
//     color: #0a0909;
//   }

//   span {
//     font-weight: bold;
//     color: #28a69e;
//     margin-right: 3px;
//   }
// `;

const Profile = () => {
  const { clearUser, user } = useUserStore();
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [modalImage, setModalImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [singleUser, setSingleUser] = useState(null);
  const [followLoading, setFollowLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { uid } = useParams();
  const [loading, setLoading] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const openImageModal = (imageSrc) => {
    setModalImage(imageSrc);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const navigate = useNavigate();

  useEffect(() => {
    getUserById(uid || user.username).then((data) => {
      setLoading(false);
      setSingleUser(data.user);
      setPosts(data.posts);
      setIsConnected(data.user.followers?.includes(user?.id));
    });
  }, [uid, user.id]);

  const finalUser = singleUser || user;

  const followerCount = finalUser.followers.length || user.followers;
  const followingCount = finalUser.following.length || user.following;

  return (
    <MainContainer>
      <Container>
        <BackdropContainer theme={theme}>
          {/* put back arrow n setttings icon absolute and space between */}
          <BackdropImage
            src={user?.backdropPic || bg}
            alt="Backdrop preview"
            onClick={() => openImageModal(finalUser?.backdropPic || bg)}
          />

          <ProfileContainer
            onClick={() => openImageModal(finalUser?.profilePic || bg)}
          >
            <ProfileImage src={finalUser?.profilePic} alt="Profile preview" />
          </ProfileContainer>
        </BackdropContainer>
        {modalImage && (
          <ModalOverlay onClick={closeModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalImage
                src={modalImage}
                alt="Preview"
                style={
                  modalImage === finalUser?.profilePic
                    ? {
                        width: "240px",
                        height: "240px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }
                    : { maxWidth: "90vw", maxHeight: "80vh", borderRadius: "0" }
                }
              />
            </ModalContent>
          </ModalOverlay>
        )}

        <ProfileDetails theme={theme}>
          <Name theme={theme} className="flex align-center">
            {finalUser?.name}
            {finalUser?.isVerified && (
              <div className="center">
                <HiCheckBadge color="#1b9d87" />
              </div>
            )}
          </Name>
          <UserName theme={theme}>@{finalUser?.username}</UserName>
          <Bio theme={theme}>{finalUser?.bio}</Bio>
          <div className="flex align-center">
            {finalUser?.location && (
              <Location
                theme={theme}
                className="location flex align-center mt-2"
              >
                <IoLocationSharp size={18} color="#28a69e" />
                <span>{finalUser?.location}</span>
              </Location>
            )}
            {finalUser?.link && (
              <Location
                theme={theme}
                className="location flex align-center mt-2"
              >
                <IoLocationSharp size={18} color="#28a69e" />
                <span>{finalUser?.link}</span>
              </Location>
            )}
            {finalUser?.location && (
              <Location
                theme={theme}
                className="location flex align-center mt-2"
              >
                <IoLocationSharp size={18} color="#28a69e" />
                <span>{finalUser?.location}</span>
              </Location>
            )}
            {finalUser?.location && (
              <Location
                theme={theme}
                className="location flex align-center mt-2"
              >
                <IoLocationSharp size={18} color="#28a69e" />
                <span>{finalUser?.location}</span>
              </Location>
            )}
          </div>
          <StatsContainer theme={theme}>
            <div
              onClick={() => {
                navigate(`/c/${finalUser.username}/fwn`);
              }}
            >
              <span>{followingCount}</span> Following
            </div>
            <div
              onClick={() => {
                navigate(`/c/${finalUser.username}/flr`);
              }}
            >
              <span>{followerCount}</span> Followers
            </div>
          </StatsContainer>
        </ProfileDetails>
        <ProfileTab posts={posts} />
      </Container>
      <button onClick={clearUser}>Logout</button>
    </MainContainer>
  );
};

export default Profile;
