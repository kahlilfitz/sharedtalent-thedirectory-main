import { createContext, useState, useEffect } from "react";

type AuthContextType = {
  auth: any;
  setAuth: any;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState<AuthContextType>({} as AuthContextType);
const [userData] = useState<any>(JSON.parse(localStorage.getItem("DIRECTORY_USER") as any));

  useEffect(() => {
    if (userData?.token) {
      setAuth(userData);
    }
  }, [userData]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
