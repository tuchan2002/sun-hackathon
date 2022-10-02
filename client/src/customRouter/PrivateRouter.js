import { Navigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const firstLogin = localStorage.getItem("firstLogin");
  return firstLogin ? children : <Navigate to="/" />;
};

export default PrivateRouter;
