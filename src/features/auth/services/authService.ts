import axios from "axios";
import type {
  LoginCredentials,
  SignupCredentials,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  OTPVerificationRequest,
  AuthResponse,
} from "../types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

const authApi = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await authApi.post("/login", credentials);
    return response.data;
  },

  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    const response = await authApi.post("/signup", credentials);
    return response.data;
  },

  async forgotPassword(
    request: ForgotPasswordRequest,
  ): Promise<{ message: string }> {
    const response = await authApi.post("/forgot-password", request);
    return response.data;
  },

  async resetPassword(
    request: ResetPasswordRequest,
  ): Promise<{ message: string }> {
    const response = await authApi.post("/reset-password", request);
    return response.data;
  },

  async verifyOTP(
    request: OTPVerificationRequest,
  ): Promise<{ message: string }> {
    const response = await authApi.post("/verify-otp", request);
    return response.data;
  },

  async resendOTP(email: string): Promise<{ message: string }> {
    const response = await authApi.post("/resend-otp", { email });
    return response.data;
  },

  async refreshToken(): Promise<AuthResponse> {
    const response = await authApi.post("/refresh");
    return response.data;
  },

  async logout(): Promise<void> {
    await authApi.post("/logout");
  },

  // Mock service methods for development (remove when backend is ready)
  async mockLogin(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock validation
    if (
      credentials.username === "admin" &&
      credentials.password === "password"
    ) {
      return {
        user: {
          id: "1",
          username: credentials.username,
          email: "admin@example.com",
          firstName: "John",
          lastName: "Doe",
        },
        token: "mock-jwt-token-" + Date.now(),
        message: "Login successful",
      };
    }

    throw new Error("Invalid credentials");
  },

  async mockSignup(credentials: SignupCredentials): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      user: {
        id: "2",
        username: credentials.username,
        email: credentials.email,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
      },
      token: "mock-jwt-token-" + Date.now(),
      message: "Registration successful",
    };
  },
};
