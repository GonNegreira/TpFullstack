import { useNavigate }
from "react-router-dom";

import MainLayout
from "../layouts/MainLayout";

import ProyectoForm
from "../components/proyectos/ProyectoForm";

import {
  createProyecto
} from "../api/proyectos.service";

export default function ProyectoCreatePage() {

  const navigate =
    useNavigate();

  async function handleCreate(data) {

    try {

      await createProyecto(
        data
      );

      navigate(
        "/proyectos"
      );

    } catch (error) {

      alert(
        error.response?.data?.error ||
        "Error al crear proyecto"
      );

    }

  }

  return (

    <MainLayout>

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto"
        }}
      >

        <button
          onClick={() =>
            navigate("/proyectos")
          }
          style={{
            background: "none",
            border: "none",
            color: "#2563eb",
            cursor: "pointer",
            marginBottom: "20px",
            fontWeight: "600"
          }}
        >
          ← Volver a proyectos
        </button>

        <div
          style={{
            textAlign: "center",
            marginBottom: "30px"
          }}
        >

          <div
            style={{
              fontSize: "3rem",
              marginBottom: "10px"
            }}
          >
            🚀
          </div>

          <h1
            style={{
              margin: 0,
              color: "#111827",
              fontSize: "2.2rem"
            }}
          >
            Crear Nuevo Proyecto
          </h1>

          <p
            style={{
              color: "#6b7280",
              marginTop: "10px",
              fontSize: "1rem"
            }}
          >
            Registra un nuevo proyecto dentro del sistema.
            Luego podrás asignar usuarios y gestionar tareas.
          </p>

        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "35px",
            border: "1px solid #e5e7eb",
            boxShadow:
              "0 8px 24px rgba(0,0,0,0.08)"
          }}
        >

          <ProyectoForm
            onSubmit={
              handleCreate
            }
          />

        </div>

      </div>

    </MainLayout>

  );

}