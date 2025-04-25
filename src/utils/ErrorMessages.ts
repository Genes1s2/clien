import { AuthError } from "../models/auth";

export const getAuthError = (error: AuthError): string => {
    const messages: Record<AuthError, string> = {
      'INVALID_TOKEN': 'Your session is invalid. Please log in again.',
      'SESSION_EXPIRED': 'Your session has expired. Please log in again.',
      'NETWORK_ERROR': 'Network error. Please check your internet connection.',
      'SERVER_ERROR': 'Server error. Please try again later.',
      'DEFAULT': 'An unknown error occurred. Please try again.',
    };
  
    return messages[error] || messages.DEFAULT;
  };