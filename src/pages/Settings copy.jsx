import React, { useState, useRef } from "react";
import styled from "styled-components";
import { MainContainer, Spinner } from "../components";
import { useAlert } from "../context/AlertContext";
import useUserStore from "../store/useUserStore";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { ChevronDown, ChevronUp } from "lucide-react";

const colors = {
  // Blues
  primaryBlue: "#4a90e2",
  lightBlue: "#7fb1e8",
  paleBlue: "#e8f1fa",
  skyBlue: "#b6d9f7",

  // Greens
  primaryGreen: "#66bb6a",
  lightGreen: "#98ee99",
  lightTwoGreen: "#7acb7e",
  paleGreen: "#e8f5e9",
  mintGreen: "#b2dfb4",
};

const ScrollableContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  /* Hide the scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Make the container scrollable but hide scrollbar */
  overflow-y: scroll;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const FileInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 2px dashed #66bb6a;
  border-radius: 4px;
  padding: 6px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${({ isDragging }) =>
    isDragging ? "rgba(29, 155, 240, 0.1)" : "transparent"};

  &:hover {
    background: rgba(29, 155, 240, 0.1);
  }
`;

const SettingsContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  height: 100%;
  overflow-y: auto;
  position: relative;

  /* Hide the default scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #333;
`;

const Section = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const SectionHeader = styled.button`
  width: 100%;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;

  /* Make the section header sticky */
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 10;

  svg {
    transition: transform 0.3s ease;
    transform: ${({ isExpanded }) =>
      isExpanded ? "rotate(-180deg)" : "rotate(0deg)"};
  }

  &:hover {
    background: rgba(0, 0, 0, 0.02);
  }
`;

const SectionContent = styled.div`
  padding: 0 24px;
  max-height: ${({ isExpanded, maxHeight }) =>
    isExpanded ? `${maxHeight}px` : "0"};
  opacity: ${({ isExpanded }) => (isExpanded ? "1" : "0")};
  transition: all 0.3s ease-in-out;
  overflow: hidden;
`;

// const Section = styled.div`
//   background: #f8f9fa;
//   border-radius: 8px;
//   margin-bottom: 16px;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//   overflow: hidden;
// `;

// const SectionHeader = styled.button`
//   width: 100%;
//   padding: 16px 24px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background: none;
//   border: none;
//   cursor: pointer;
//   text-align: left;

//   svg {
//     transition: transform 0.3s ease;
//     transform: ${({ isExpanded }) =>
//       isExpanded ? "rotate(-180deg)" : "rotate(0deg)"};
//   }

//   &:hover {
//     background: rgba(0, 0, 0, 0.02);
//   }
// `;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
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
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 24px;

    &:before {
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
  }

  input:checked + span {
    background-color: ${colors.primaryGreen};
  }

  input:checked + span:before {
    transform: translateX(20px);
  }
`;

// const SectionContent = styled.div`
//   padding: 0 24px;
//   max-height: ${({ isExpanded, maxHeight }) =>
//     isExpanded ? `${maxHeight}px` : "0"};
//   opacity: ${({ isExpanded }) => (isExpanded ? "1" : "0")};
//   transition: all 0.3s ease-in-out;
//   overflow: hidden;
// `;

const InnerContent = styled.div`
  padding-bottom: 24px;
`;

const ProfilePreview = styled.img`
  width: 74px;
  height: 74px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${colors.lightGreen};
    box-shadow: 0 0 0 2px rgba(29, 155, 240, 0.1);
  }
`;

const Button = styled.button`
  width: 190px;
  padding: 12px 24px;
  background-color: ${colors.primaryGreen};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.lightTwoGreen};
  }

  &:disabled {
    background-color: ${colors.primaryGreen};

    cursor: not-allowed;
  }
`;

// Color palette

const Settings = () => {
  const { user } = useUserStore();
  const { showAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    profile: true,
    password: false,
    notifications: false,
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    messageNotifications: true,
  });

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(user?.profilePic || null);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Refs to store content heights
  const profileRef = useRef(null);
  const passwordRef = useRef(null);
  const notificationsRef = useRef(null);

  // Get the appropriate ref for each section
  const getSectionRef = (section) => {
    switch (section) {
      case "profile":
        return profileRef;
      case "password":
        return passwordRef;
      case "notifications":
        return notificationsRef;
      default:
        return null;
    }
  };

  // Get content height for a section
  const getContentHeight = (section) => {
    const ref = getSectionRef(section);
    return ref.current ? ref.current.scrollHeight : 0;
  };

  // Add the missing toggleSection function
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // TODO: Implement your update logic here
      showAlert("success", "Settings updated successfully!");
    } catch (error) {
      console.error("Failed to update settings:", error);
      showAlert("error", "Failed to update settings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollableContainer>
      <MainContainer>
        <SettingsContainer>
          <Title>Settings</Title>

          <form onSubmit={handleSubmit}>
            <Section>
              <SectionHeader
                onClick={() => toggleSection("profile")}
                type="button"
                isExpanded={expandedSections.profile}
              >
                <SectionTitle>Profile Settings</SectionTitle>
                <ChevronDown size={20} />
              </SectionHeader>
              <SectionContent
                isExpanded={expandedSections.profile}
                maxHeight={getContentHeight("profile")}
              >
                <InnerContent ref={profileRef}>
                  <FormGroup>
                    <Label>Profile Picture</Label>
                    <div className="flex gap align-items">
                      {preview && (
                        <ProfilePreview src={preview} alt="Profile preview" />
                      )}
                      <FileInputContainer
                        className="flex align-center"
                        isDragging={isDragging}
                        onDrop={handleDrop}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onClick={() =>
                          document.getElementById("profilePic").click()
                        }
                      >
                        <div className="center">
                          <AiOutlineCloudUpload size={24} />
                        </div>
                        <span>Drag & drop or click to upload</span>
                        <input
                          type="file"
                          id="profilePic"
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                          accept="image/*"
                        />
                      </FileInputContainer>
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <Label>Name</Label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email"
                    />
                  </FormGroup>
                </InnerContent>
              </SectionContent>
            </Section>

            <Section>
              <SectionHeader
                onClick={() => toggleSection("password")}
                type="button"
                isExpanded={expandedSections.password}
              >
                <SectionTitle>Password Settings</SectionTitle>
                <ChevronDown size={20} />
              </SectionHeader>
              <SectionContent
                isExpanded={expandedSections.password}
                maxHeight={getContentHeight("password")}
              >
                <InnerContent ref={passwordRef}>
                  <FormGroup>
                    <Label>Current Password</Label>
                    <Input
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      placeholder="Enter current password"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>New Password</Label>
                    <Input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="Enter new password"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Confirm New Password</Label>
                    <Input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm new password"
                    />
                  </FormGroup>
                </InnerContent>
              </SectionContent>
            </Section>

            <Section>
              <SectionHeader
                onClick={() => toggleSection("notifications")}
                type="button"
                isExpanded={expandedSections.notifications}
              >
                <SectionTitle>Notification Settings</SectionTitle>
                <ChevronDown size={20} />
              </SectionHeader>
              <SectionContent
                isExpanded={expandedSections.notifications}
                maxHeight={getContentHeight("notifications")}
              >
                <InnerContent ref={notificationsRef}>
                  <ToggleContainer>
                    <Label>Email Notifications</Label>
                    <ToggleSwitch>
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
                    <Label>Push Notifications</Label>
                    <ToggleSwitch>
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
                    <Label>Message Notifications</Label>
                    <ToggleSwitch>
                      <input
                        type="checkbox"
                        name="messageNotifications"
                        checked={notifications.messageNotifications}
                        onChange={handleNotificationChange}
                      />
                      <span />
                    </ToggleSwitch>
                  </ToggleContainer>
                </InnerContent>
              </SectionContent>
            </Section>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Spinner size="20px" /> : "Save Changes"}
            </Button>
          </form>
        </SettingsContainer>
      </MainContainer>
    </ScrollableContainer>
  );
};

export default Settings;
