import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  login
} from "../api/auth.service";

import { Link } from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

export default function LoginPage() {

  const navigate =
    useNavigate();

  const {
    loginUser
  } = useAuth();

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [error,
    setError] =
    useState("");

  async function handleSubmit(
    e
  ) {

    e.preventDefault();

    try {

      const response =
        await login({

          email,

          password

        });

      loginUser(

        response.data.usuario,

        response.data.token

      );

      navigate(
        "/tareas"
      );

    } catch {

      setError(
        "Credenciales incorrectas"
      );

    }

  }

  return (

    <div>

      <h1>
        Login
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
      >

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e =>
            setEmail(
              e.target.value
            )
          }
        />

        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e =>
            setPassword(
              e.target.value
            )
          }
        />

        <br />

        <button
          type="submit"
        >
          Ingresar
        </button>

      </form>

      <p>
        ¿No tenés cuenta?
        {" "}
        <Link to="/register">
          Registrate
        </Link>
      </p>

      {error && (

        <p>
          {error}
        </p>

      )}

    </div>

  );

}