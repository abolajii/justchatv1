import React, { useState } from "react";
import { Logo, Spinner } from "../components";
import usePageTitle from "../hooks/useTittle";
import styled from "styled-components";
import { useAlert } from "../context/AlertContext";
import { login } from "../api/request";
import useUserStore from "../store/useUserStore"; // Import the store
import { Link, useNavigate } from "react-router-dom";

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

const Login = () => {
  usePageTitle("Sign in to JustChats · JustChats");

  const navigate = useNavigate();

  const { showAlert } = useAlert();
  const { setUser } = useUserStore(); // Access the setUser function from Zustand store

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear errors as user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};
    if (!formData.username)
      formErrors.username = "Username or Email is required.";
    if (!formData.password) formErrors.password = "Password is required.";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setIsLoading(true);

      const data = {
        identifier: formData.username,
        password: formData.password,
      };

      try {
        const response = await login(data); // Assuming this returns user data and token

        // Set user data and token in Zustand store
        setUser(response.user, response.token);
        navigate("/dashboard");

        // Save token in localStorage
        localStorage.setItem("token", response.token);
        // localStorage.setItem("token", response.token);

        showAlert("success", "Login successful!"); // Trigger success alert
      } catch (error) {
        console.error("Login failed:", error);
        showAlert("error", "Login failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="center flex-column">
        <Logo />
        <Text>Sign in to JustChats</Text>
        <FormContainer onSubmit={handleSubmit}>
          <label htmlFor="username">Email or Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your email or username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? "error-input" : ""}
          />
          {errors.username && <div className="error">{errors.username}</div>}
          <div className="flex justify-between">
            <label htmlFor="password">Password</label>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "error-input" : ""}
          />
          {errors.password && (
            <div className="error mb-4">{errors.password}</div>
          )}

          <button type="submit" disabled={isLoading}>
            {isLoading ? <Spinner size="20px" /> : "Sign In"}
          </button>

          <p className="text-center">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </FormContainer>
      </div>
    </div>
  );
};

export default Login;
