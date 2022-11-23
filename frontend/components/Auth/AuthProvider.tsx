import axios from "axios";
import { useEffect, useState } from "react";

import AuthContext from "./AuthContext";
import { toast } from "react-toastify";
import useSessionStorage from "components/SessionStorage";

const AuthProvider = ({ children }: any) => {
  const { getItem, setItem, removeItem } = useSessionStorage();
  const [token, setToken] = useState<null | string>(null);

  useEffect(() => {
    setToken(getItem("token"));
  }, []);

  const onLogout = () => {
    removeItem("token");
    setToken(null);
    toast.success("Logged out!");
  };

  const onLogin = (token: string) => {
    setItem("token", token);
    setToken(token);
  };

  const axiosInstance = axios.create({
    headers: { Authorization: "Bearer " + token },
  });

  return (
    <AuthContext.Provider value={{ token, onLogin, onLogout, axiosInstance }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
