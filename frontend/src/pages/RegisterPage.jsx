import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  register
} from "../api/auth.service";

export default function RegisterPage() {

  const navigate =
    useNavigate();

  const [nombre, setNombre] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event
  ) {

    event.preventDefault();

    setError("");

    try {

      await register({

        nombre,

        email,

        password

      });

      alert(
        "Usuario registrado correctamente"
      );

      navigate("/login");

    } catch (error) {

      setError(

        error.response?.data?.error ||

        "Error al registrar usuario"

      );

    }

  }

  return (

    <div>

      <h1>Registro</h1>

      <form
        onSubmit={
          handleSubmit
        }
      >

        <div>

          <label>
            Nombre
          </label>

          <br />

          <input
            type="text"
            value={nombre}
            onChange={(e) =>
              setNombre(
                e.target.value
              )
            }
            required
          />

        </div>

        <br />

        <div>

          <label>
            Email
          </label>

          <br />

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
          />

        </div>

        <br />

        <div>

          <label>
            Contraseña
          </label>

          <br />

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />

        </div>

        <br />

        <button
          type="submit"
        >
          Registrarse
        </button>

      </form>

      {error && (

        <p>

          {error}

        </p>

      )}

      <hr />

      <p>

        ¿Ya tenés cuenta?

        {" "}

        <Link
          to="/login"
        >
          Iniciar sesión
        </Link>

      </p>

    </div>

  );

}