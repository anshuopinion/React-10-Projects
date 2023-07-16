import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
export const AuthContext = createContext();
import jwtDecode from "jwt-decode";
export default function AuthProvider({ children }) {
  const [cookie, setCookie, removeCookie] = useCookies(["jwt"]);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const decodeToken = (token) => {
    const decodedToken = jwtDecode(token);
    setUser(decodedToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    removeCookie("jwt");
  };

  const login = (tokenStr) => {
    if (tokenStr) {
      setToken(tokenStr);
      const { exp } = jwtDecode(tokenStr);
      setCookie("jwt", tokenStr, {
        path: "/",
        maxAge: exp,
        sameSite: true,
      });
      return;
    }
    logout();
  };

  useEffect(() => {
    if (cookie?.jwt) {
      setToken(cookie.jwt);
      decodeToken(cookie.jwt);
    }
  }, [cookie]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
