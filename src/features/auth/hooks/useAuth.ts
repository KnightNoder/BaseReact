import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../app/store";
import {
  loginUser,
  signupUser,
  logoutUser,
  clearError,
} from "../../../app/store/authSlice";
import type { LoginCredentials, SignupCredentials } from "../types";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, isAuthenticated, isLoading, error } = useSelector(
    (state: RootState) => state.auth,
  );

  const login = async (credentials: LoginCredentials) => {
    return await dispatch(loginUser(credentials)).unwrap();
  };

  const signup = async (credentials: SignupCredentials) => {
    return await dispatch(signupUser(credentials)).unwrap();
  };

  const logout = async () => {
    return await dispatch(logoutUser()).unwrap();
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    signup,
    logout,
    clearAuthError,
  };
};
