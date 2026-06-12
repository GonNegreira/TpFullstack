import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth }
  from "../context/AuthContext";

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

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #2563eb, #1e40af)"
      }}
    >

      <div
        style={{
          width: "400px",
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "16px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.2)"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
            color: "#1e3a8a"
          }}
        >
          TaskManager
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "30px"
          }}
        >
          Sistema de Gestión de Proyectos
        </p>

        <form
          onSubmit={handleSubmit}
        >

          <div
            style={{
              marginBottom: "15px"
            }}
          >

            <label>
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              required
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                borderRadius: "8px",
                border:
                  "1px solid #ccc"
              }}
            />

          </div>

          <div
            style={{
              marginBottom: "20px"
            }}
          >

            <label>
              Contraseña
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                borderRadius: "8px",
                border:
                  "1px solid #ccc"
              }}
            />

          </div>

          {error && (

            <div
              style={{
                color: "red",
                marginBottom: "15px"
              }}
            >
              {error}
            </div>

          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              backgroundColor:
                "#2563eb",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Ingresar
          </button>

        </form>

        <div
          style={{
            marginTop: "20px",
            textAlign: "center"
          }}
        >

          ¿No tenés cuenta?

          <br />

          <button
            onClick={() =>
              navigate(
                "/register"
              )
            }
            style={{
              marginTop: "10px",
              background: "none",
              border: "none",
              color: "#2563eb",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Registrarse
          </button>

        </div>

      </div>

    </div>

  );

}