import axios from "axios";
const prod = true;
export const baseURL = prod
  ? "https://apijustwritebe.vercel.app/api/v1"
  : "http://localhost:9004/api/v1"; // Replace with your API base URL

// Create an Axios instance for authenticated requests
const chatAppAuth = axios.create({
  baseURL,
});

// Create an Axios instance for unauthenticated requests
const chatAppNoAuth = axios.create({
  baseURL,
});

// Add a request interceptor to include the token for authenticated requests
chatAppAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Add the token to the headers
    } else {
      // If no token, redirect to login (optional, implement according to your routing)
      //   window.location.href = "/login";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Export instances for use in your application
export { chatAppAuth, chatAppNoAuth };
