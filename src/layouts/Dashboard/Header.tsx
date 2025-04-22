import React from "react";
import { logout } from '../../store/auth/slice';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useNavigate } from "react-router";

const Header = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const log_out = () => {
    dispatch(logout());
    navigate('/authentification');
  }
  
  return (
    <header className="sticky top-0 p-3 flex items-center justify-between bg-blue-600 text-white shadow-md">
      header
      <div className="mt-6 text-center">
        <button
          onClick={log_out}
          className="text-white hover:text-blue-800 font-medium"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
