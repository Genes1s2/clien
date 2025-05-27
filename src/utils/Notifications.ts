import toast from 'react-hot-toast';

export const showError = (message: string) => {
  toast.error(message, {
    position: 'top-right',
    duration: 5000,
  });
};

export const showSuccess = (message: string) => {
  toast.success(message, {
    position: 'top-right',
    duration: 3000,
  });
};

export const showPromise = <T,>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string;
    error: string | ((error: unknown) => string);
  }
) => {
  return toast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: (err) => {
      if (typeof messages.error === 'function') {
        return messages.error(err);
      }
      return messages.error;
    }
  });
};
