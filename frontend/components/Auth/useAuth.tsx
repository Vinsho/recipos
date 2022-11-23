import { useContext } from "react";
import AuthContext, { AuthContextType } from "./AuthContext";

const useAuth = () => {
  return useContext(AuthContext) as AuthContextType;
};

export default useAuth;
