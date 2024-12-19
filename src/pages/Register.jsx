import React, { useState } from "react";
import { Logo, Spinner } from "../components";
import usePageTitle from "../hooks/useTittle";
import styled from "styled-components";
import { useAlert } from "../context/AlertContext";
import useUserStore from "../store/useUserStore";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { register } from "../api/request";

const Text = styled.div`
  font-size: 20px;
  letter-spacing: -0.5px;
  padding: 24px 0;
  text-align: center;
`;

const FormContainer = styled.form`
  background: #eceef0;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;

  .text-center {
    text-align: center;
    margin-top: 10px;
    font-size: 13px;

    a {
      color: #115c46;
      text-decoration: none;
      margin-top: 8px;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  label {
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }

  input {
    margin-bottom: 8px;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }

  .error-input {
    border-color: red;
  }

  .error {
    color: red;
    font-size: 12px;
    margin-top: -8px;
    margin-bottom: 8px;
  }

  button {
    padding: 12px;
    background-color: #1d9bf0;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: #167bbe;
    }

    &:disabled {
      background-color: #a5c9f1;
      cursor: not-allowed;
    }
  }
`;

const FileInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 2px dotted #1d9bf0;
  border-radius: 4px;
  padding: 12px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(29, 155, 240, 0.1);
  }

  ${({ isDragging }) =>
    isDragging &&
    `
    background-color: rgba(29, 155, 240, 0.1);
  `}

  ${({ hasError }) =>
    hasError &&
    `
    border-color: red;
  `}
`;

const ProfilePreview = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 12px;
`;

const Register = () => {
  usePageTitle("Create account · JustChats");

  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { setUser } = useUserStore();

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
      setErrors({ ...errors, profilePic: "" });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
      setErrors({ ...errors, profilePic: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const usernamePattern = /^[A-Za-z0-9_]+$/;

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.username) newErrors.username = "Username is required";
    else if (!usernamePattern.test(formData.username))
      newErrors.username =
        "Username can only contain letters, numbers, and underscores";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!profilePic) newErrors.profilePic = "Profile picture is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      if (profilePic) formDataToSend.append("profilePic", profilePic);

      const response = await register(formDataToSend);
      setUser(response.user, response.token);
      localStorage.setItem("token", response.token);

      showAlert("success", "Registration successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
      showAlert("error", "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="center flex-col">
        <Logo />
        <Text>Create your account</Text>
        <FormContainer onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "error-input" : ""}
          />
          {errors.name && <div className="error">{errors.name}</div>}

          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? "error-input" : ""}
          />
          {errors.username && <div className="error">{errors.username}</div>}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error-input" : ""}
          />
          {errors.email && <div className="error">{errors.email}</div>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "error-input" : ""}
          />
          {errors.password && <div className="error">{errors.password}</div>}

          <label>Profile Picture</label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <FileInputContainer
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onClick={() => document.getElementById("profilePic").click()}
              isDragging={isDragging}
              hasError={errors.profilePic}
            >
              <AiOutlineCloudUpload size={24} />
              <span style={{ fontSize: "14px" }}>
                Drag & drop or click to upload
              </span>
              <input
                type="file"
                id="profilePic"
                onChange={handleFileChange}
                style={{ display: "none" }}
                accept="image/*"
              />
            </FileInputContainer>
            {preview && <ProfilePreview src={preview} alt="Profile preview" />}
          </div>
          {errors.profilePic && (
            <div className="error">{errors.profilePic}</div>
          )}

          <button type="submit" disabled={isLoading}>
            {isLoading ? <Spinner size="20px" /> : "Create account"}
          </button>

          <p className="text-center">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </FormContainer>
      </div>
    </div>
  );
};

export default Register;
