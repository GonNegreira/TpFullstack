import { useState }
  from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import {
  register
} from "../api/auth.service";

import "../styles/auth.css";

export default function RegisterPage() {

  const navigate =
    useNavigate();

  const [form,
    setForm] =
    useState({

      nombre: "",

      email: "",

      password: ""

    });

  const [error,
    setError] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  function handleChange(e) {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value

    });

  }

  async function handleSubmit(e) {

    e.preventDefault();

    setError("");

    setLoading(true);

    try {

      await register(form);

      alert(
        "Usuario registrado correctamente"
      );

      navigate("/login");

    } catch (err) {

      setError(

        err.response?.data?.error ||

        "Error al registrar usuario"

      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="auth-page">

      <div className="auth-card">

        <h1 className="auth-title">

          Crear Cuenta

        </h1>

        <p className="auth-subtitle">

          Registrate para comenzar a utilizar el sistema

        </p>

        <form
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label htmlFor="nombre">

              Nombre

            </label>

            <input
              id="nombre"
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Juan Pérez"
              required
            />

          </div>

          <div className="form-group">

            <label htmlFor="email">

              Email

            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="usuario@email.com"
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
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
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
            disabled={loading}
            className="btn btn-primary auth-submit"
          >

            {

              loading

                ? "Registrando..."

                : "Crear Cuenta"

            }

          </button>

        </form>

        <div className="auth-footer">

          <span>

            ¿Ya tenés cuenta?

          </span>

          <Link
            to="/login"
            className="auth-link-button"
          >

            Iniciar sesión

          </Link>

        </div>

      </div>

    </div>

  );

}