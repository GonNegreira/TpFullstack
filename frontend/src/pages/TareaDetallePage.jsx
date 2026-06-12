import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  Link
} from "react-router-dom";

import MainLayout
  from "../layouts/MainLayout";

import {
  getTarea
} from "../api/tareas.service";

import EstadoBadge
  from "../components/EstadoBadge";

import PrioridadBadge
  from "../components/PrioridadBadge";

export default function TareaDetallePage() {

  const { id } =
    useParams();

  const [tarea,
    setTarea] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    loadTarea();

  }, [id]);

  async function loadTarea() {

    try {

      const response =
        await getTarea(id);

      setTarea(
        response.data
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  if (loading) {

    return (
      <MainLayout>
        <p>Cargando tarea...</p>
      </MainLayout>
    );

  }

  if (!tarea) {

    return (
      <MainLayout>
        <p>Tarea no encontrada</p>
      </MainLayout>
    );

  }

  return (

    <MainLayout>

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto"
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px"
          }}
        >

          <div>

            <div
              style={{
                color: "#2563eb",
                fontWeight: "bold",
                fontSize: "0.9rem",
                textTransform: "uppercase"
              }}
            >
              Tarea #{tarea.id}
            </div>

            <h1
              style={{
                margin: "5px 0",
                color: "#111827"
              }}
            >
              {tarea.titulo}
            </h1>

          </div>

          <Link
            to={`/tareas/${tarea.id}/editar`}
            style={{
              textDecoration: "none"
            }}
          >

            <button
              style={{
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              ✏️ Editar
            </button>

          </Link>

        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px"
          }}
        >

          <EstadoBadge
            estado={tarea.estado}
          />

          <PrioridadBadge
            prioridad={tarea.prioridad}
          />

        </div>

        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "20px",
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.06)"
          }}
        >

          <h3
            style={{
              marginTop: 0
            }}
          >
            Descripción
          </h3>

          <p
            style={{
              color: "#4b5563",
              lineHeight: "1.7"
            }}
          >
            {tarea.descripcion}
          </p>

        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px"
          }}
        >

          <div
            style={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "20px"
            }}
          >

            <h3
              style={{
                marginTop: 0
              }}
            >
              Información General
            </h3>

            <p>
              <strong>Proyecto:</strong>
              <br />
              📁 {tarea.Proyecto?.nombre}
            </p>

            <p>
              <strong>Responsable:</strong>
              <br />
              👤 {tarea.responsable?.nombre}
            </p>

          </div>

          <div
            style={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "20px"
            }}
          >

            <h3
              style={{
                marginTop: 0
              }}
            >
              Fechas
            </h3>

            <p>
              <strong>Creación:</strong>
              <br />
              📅 {
                tarea.createdAt
                  ? new Date(
                      tarea.createdAt
                    ).toLocaleDateString()
                  : "-"
              }
            </p>

            <p>
              <strong>Fecha límite:</strong>
              <br />
              ⏳ {
                tarea.fechaLimite
                  ? new Date(
                      tarea.fechaLimite
                    ).toLocaleDateString()
                  : "-"
              }
            </p>

          </div>

        </div>

      </div>

    </MainLayout>

  );

}