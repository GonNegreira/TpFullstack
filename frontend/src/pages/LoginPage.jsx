import { useState } from "react";

import { useNavigate }
  from "react-router-dom";

import { useAuth }
  from "../context/AuthContext";

import "../styles/auth.css";

export default function LoginPage() {

  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      setError("");

      await login({
        email,
        password
      });

      navigate("/tareas");

    } catch (err) {

      setError(
        err.response?.data?.error ||
        "Error al iniciar sesión"
      );

    }

  }

  return (

    <div className="auth-page">

      <div className="auth-card">

        <h1 className="auth-title">

          TaskManager

        </h1>

        <p className="auth-subtitle">

          Sistema de Gestión de Proyectos

        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label htmlFor="email">

              Email

            </label>

            <input
              id="email"
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

          <div className="form-group">

            <label htmlFor="password">

              Contraseña

            </label>

            <input
              id="password"
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

          {

            error && (

              <div className="auth-error">

                {error}

              </div>

            )

          }

          <button
            type="submit"
            className="btn btn-primary auth-submit"
          >

            Ingresar

          </button>

        </form>

        <div className="auth-footer">

          <span>

            ¿No tenés cuenta?

          </span>

          <button
            onClick={() =>
              navigate(
                "/register"
              )
            }
            className="auth-link-button"
          >

            Registrarse

          </button>

        </div>

      </div>

    </div>

  );

}