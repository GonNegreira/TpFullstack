import {
  createContext,
  useContext,
  useState
} from "react";

import * as authService
  from "../api/auth.service";

const AuthContext =
  createContext();

export function AuthProvider({
  children
}) {

  const [user,
    setUser] =
    useState(() => {

      const savedUser =
        localStorage.getItem(
          "user"
        );

      return savedUser
        ? JSON.parse(savedUser)
        : null;

    });

  async function login(
    credentials
  ) {

    const response =
      await authService.login(
        credentials
      );

    const {
      token,
      usuario
    } = response.data;

    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(
        usuario
      )
    );

    setUser(
      usuario
    );

    return usuario;

  }

  function logout() {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setUser(
      null
    );

  }

  return (

    <AuthContext.Provider
      value={{

        user,

        login,

        logout

      }}
    >

      {children}

    </AuthContext.Provider>

  );

}

export function useAuth() {

  return useContext(
    AuthContext
  );

}