import React, { useState, useRef } from "react";
import styled from "styled-components";
import { AiOutlineCamera, AiOutlineClose } from "react-icons/ai";
import bg from "./bg.jpg";

import useUserStore from "../store/useUserStore";
import { updateProfile } from "../api/request";
import { useAlert } from "../context/AlertContext";
import { Spinner } from "../components";

// Theme Colors (similar to previous components)
const lightTheme = {
  background: "#fff",
  textPrimary: "#333",
  textSecondary: "#666",
  inputBackground: "#f9f9f9",
  inputBorder: "#e0e0e0",
  primaryColor: "#2c635d",
  errorColor: "#ff4d4f",
};

const darkTheme = {
  background: "#1e1e1e",
  textPrimary: "#e0e0e0",
  textSecondary: "#888",
  inputBackground: "#2c2c2c",
  inputBorder: "#444",
  primaryColor: "#26625b",
  errorColor: "#ff7875",
};

const FormGroup = styled.div`
  /* padding: 20px; */

  margin-bottom: 20px;
  .top {
    margin-top: 50px;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: ${(props) => props.theme.textPrimary};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.inputBorder};
  border-radius: 4px;
  background-color: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.textPrimary};
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primaryColor};
    box-shadow: 0 0 0 2px rgba(107, 193, 183, 0.2);
  }

  &:hover {
    border-color: ${(props) => props.theme.primaryColor};
  }

  &::placeholder {
    color: ${(props) => props.theme.textSecondary};
    opacity: 0.7;
  }
`;

const InnerContent = styled.div``;

const Padding = styled.div`
  padding: 20px;
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) => props.theme.inputBorder};
    transition: 0.4s;
    border-radius: 34px;
  }

  span:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + span {
    background-color: ${(props) => props.theme.primaryColor};
  }

  input:checked + span:before {
    transform: translateX(24px);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.inputBorder};
  border-radius: 6px;
  background-color: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.textPrimary};
  font-family: inherit;
  font-size: 14px;
  resize: none; /* Allows vertical resizing only */
  min-height: 100px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primaryColor};
    box-shadow: 0 0 0 2px rgba(107, 193, 183, 0.2);
  }

  &:hover {
    border-color: ${(props) => props.theme.primaryColor};
  }

  &::placeholder {
    color: ${(props) => props.theme.textSecondary};
    opacity: 0.7;
  }
`;

const BackdropContainer = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  background-color: ${(props) => props.theme.inputBackground};
`;

const BackdropImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileContainer = styled.div`
  position: absolute;
  bottom: -40px;
  left: 20px;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: #eaeaea;
  background-color: ${(props) => props.theme.secondaryBackground};

  overflow: hidden;
  border: 3px solid white;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UploadIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background-color: rgba(0, 0, 0, 0.5); */
  border-radius: 50%;
  /* padding: 8px; */
  cursor: pointer;

  label {
    cursor: pointer;
  }
`;

const CancelButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 4px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const ProfileSettings = ({ isDarkMode }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const theme = isDarkMode ? darkTheme : lightTheme;
  const profileRef = useRef(null);
  const { user, setCurrentUser } = useUserStore();
  const [avatar, setAvatar] = useState(null);
  const [backDrop, setBackDrop] = useState(null);
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  // States for image previews
  const [preview, setPreview] = useState(user?.profilePic || null);
  const [backdropPreview, setBackdropPreview] = useState(
    user?.backdrop || null
  );

  const [formData, setFormData] = useState({
    name: user.name || "",
    bio: user.bio || "",
    link: user.link || "",
    currentPassword: "",
    location: user.location || "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handle file change for both images
  const handleFileChange = (e, setImage, setFile) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove backdrop image
  const removeBackdrop = () => setBackdropPreview(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateUser = async () => {
    // e.preventDefault();
    try {
      const updatedUser = {
        ...formData,
      };

      const newformData = new FormData();
      Object.keys(updatedUser).forEach((key) => {
        if (updatedUser[key]) {
          console.log(updatedUser[key]);
          newformData.append(key, updatedUser[key]);
        }
      });

      if (avatar !== null) {
        newformData.append("profilePic", avatar);
      }

      if (backDrop !== null) {
        newformData.append("backdrop", backDrop);
      }
      setLoading(true);

      // Replace with your API call
      const response = await updateProfile(newformData);

      const userDetails = {
        ...user,
        ...response.user,
      };
      setCurrentUser(userDetails); // Update user state with the updated user data
      showAlert("success", "Profile updated successfully!"); // Trigger success alert
      setLoading(false);
      // setError("");
    } catch (err) {
      console.log(err);
      setError(err.message || "Failed to update profile.");
      setSuccess("");
    }
  };

  return (
    <InnerContent ref={profileRef} theme={theme}>
      {/* Backdrop Image Section */}
      <BackdropContainer theme={theme}>
        <BackdropImage src={backdropPreview || bg} alt="Backdrop preview" />

        {/* Backdrop Upload Icon */}
        <UploadIcon>
          <label htmlFor="backdropInput">
            <AiOutlineCamera size={24} color="#fff" />
            <input
              type="file"
              id="backdropInput"
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) =>
                handleFileChange(e, setBackdropPreview, setBackDrop)
              }
            />
          </label>
        </UploadIcon>

        {/* Cancel Button */}
        {backdropPreview && (
          <CancelButton onClick={removeBackdrop}>
            <AiOutlineClose size={20} color="#fff" />
          </CancelButton>
        )}

        {/* Profile Picture */}
        <ProfileContainer>
          <ProfileImage src={preview} alt="Profile preview" />

          {/* Profile Upload Icon */}
          <UploadIcon>
            <label htmlFor="profileInput">
              <AiOutlineCamera size={20} color="#fff" />
              <input
                type="file"
                id="profileInput"
                style={{ display: "none" }}
                accept="image/*"
                onChange={(e) => handleFileChange(e, setPreview, setAvatar)}
              />
            </label>
          </UploadIcon>
        </ProfileContainer>
      </BackdropContainer>
      <Padding>
        {/* Form Inputs */}
        <FormGroup>
          <div className="top">
            <Label theme={theme}>Name</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              theme={theme}
            />
          </div>
        </FormGroup>

        <FormGroup>
          <Label theme={theme}>Bio</Label>
          <Textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Write something about yourself..."
            theme={theme}
          />
        </FormGroup>

        <FormGroup>
          <Label theme={theme}>Location</Label>
          <Input
            name="location"
            value={formData.location || ""}
            onChange={handleChange}
            placeholder="Your location"
            theme={theme}
          />
        </FormGroup>

        <FormGroup>
          <Label theme={theme}>Website</Label>
          <Input
            name="link"
            value={formData.link || ""}
            onChange={handleChange}
            placeholder="Your website"
            theme={theme}
          />
        </FormGroup>

        <button
          onClick={handleUpdateUser}
          style={{
            backgroundColor: theme.primaryColor,
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {loading ? (
            <div className="center">
              <Spinner size="13px" />
            </div>
          ) : (
            "Update Profile"
          )}
        </button>
      </Padding>
    </InnerContent>
  );
};

const NotificationSettings = ({ isDarkMode }) => {
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [notifications, setNotifications] = useState({
    emailNotifications: false,
    pushNotifications: false,
    messageNotifications: false,
  });

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <InnerContent theme={theme}>
      <Padding>
        <ToggleContainer>
          <Label theme={theme}>Email Notifications</Label>
          <ToggleSwitch theme={theme}>
            <input
              type="checkbox"
              name="emailNotifications"
              checked={notifications.emailNotifications}
              onChange={handleNotificationChange}
            />
            <span />
          </ToggleSwitch>
        </ToggleContainer>

        <ToggleContainer>
          <Label theme={theme}>Push Notifications</Label>
          <ToggleSwitch theme={theme}>
            <input
              type="checkbox"
              name="pushNotifications"
              checked={notifications.pushNotifications}
              onChange={handleNotificationChange}
            />
            <span />
          </ToggleSwitch>
        </ToggleContainer>

        <ToggleContainer>
          <Label theme={theme}>Message Notifications</Label>
          <ToggleSwitch theme={theme}>
            <input
              type="checkbox"
              name="messageNotifications"
              checked={notifications.messageNotifications}
              onChange={handleNotificationChange}
            />
            <span />
          </ToggleSwitch>
        </ToggleContainer>
      </Padding>
    </InnerContent>
  );
};

const PasswordSettings = ({ isDarkMode }) => {
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = passwordForm;

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password must match!");
      return;
    }
    setError("");
    // Implement password update logic here
    console.log("Password updated successfully!", passwordForm);
  };

  return (
    <InnerContent theme={theme}>
      <Padding>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label theme={theme}>Current Password</Label>
            <Input
              type="password"
              name="currentPassword"
              placeholder="Enter current password"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              theme={theme}
            />
          </FormGroup>

          <FormGroup>
            <Label theme={theme}>New Password</Label>
            <Input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              theme={theme}
            />
          </FormGroup>

          <FormGroup>
            <Label theme={theme}>Confirm New Password</Label>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              theme={theme}
            />
          </FormGroup>

          {error && (
            <div style={{ color: theme.errorColor, marginBottom: "15px" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              backgroundColor: theme.primaryColor,
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Update Password
          </button>
        </form>
      </Padding>
    </InnerContent>
  );
};

export { ProfileSettings, NotificationSettings, PasswordSettings };
