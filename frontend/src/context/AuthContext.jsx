import {
  createContext,
  useContext,
  useState
} from "react";

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

  function loginUser(
    usuario,
    token
  ) {

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

        loginUser,

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