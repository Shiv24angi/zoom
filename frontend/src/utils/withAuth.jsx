import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const navigate = useNavigate();

    const isAuthenticated = useCallback(() => {
      return !!localStorage.getItem("token");
    }, []);

    useEffect(() => {
      if (!isAuthenticated()) {
        navigate("/auth");
      }
    }, [isAuthenticated, navigate]);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
