import toast from "react-hot-toast";

export const showAuthError = (message: string, navigate: any) => {
    toast.error((t) => (
      <div className="flex flex-col gap-2">
        <span>{message}</span>
        <button
          className="text-sm underline hover:text-blue-600"
          onClick={() => {
            navigate('/authentification');
            toast.dismiss(t.id);
          }}
        >
          Return to Login
        </button>
      </div>
    ), {
      position: 'top-right',
      duration: 6000,
    });
  };