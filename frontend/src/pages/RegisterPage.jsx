import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { register } from "../api/auth.service";

export default function RegisterPage() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      await register(form);

      alert("Usuario registrado correctamente");

      navigate("/login");

    } catch (err) {

      setError(
        err.response?.data?.error ||
        "Error al registrar usuario"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #1e293b, #0f172a)",
        padding: "20px",
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "#fff",
          borderRadius: "16px",
          padding: "40px",
          boxShadow:
            "0 20px 40px rgba(0,0,0,0.25)",
        }}
      >

        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >

          <h1
            style={{
              margin: 0,
              color: "#1e293b",
              fontSize: "2rem",
            }}
          >
            Crear Cuenta
          </h1>

          <p
            style={{
              color: "#64748b",
              marginTop: "10px",
            }}
          >
            Registrate para comenzar a utilizar el sistema
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div style={{ marginBottom: "16px" }}>

            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "600",
              }}
            >
              Nombre
            </label>

            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              placeholder="Juan Pérez"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
            />

          </div>

          <div style={{ marginBottom: "16px" }}>

            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "600",
              }}
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="usuario@email.com"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
            />

          </div>

          <div style={{ marginBottom: "20px" }}>

            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "600",
              }}
            >
              Contraseña
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="********"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
            />

          </div>

          {
            error && (

              <div
                style={{
                  background: "#fee2e2",
                  color: "#b91c1c",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "20px",
                }}
              >
                {error}
              </div>

            )
          }

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "8px",
              background: "#2563eb",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            {
              loading
                ? "Registrando..."
                : "Crear Cuenta"
            }
          </button>

        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#64748b",
          }}
        >

          ¿Ya tenés cuenta?

          {" "}

          <Link
            to="/login"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Iniciar sesión
          </Link>

        </div>

      </div>

    </div>

  );

}