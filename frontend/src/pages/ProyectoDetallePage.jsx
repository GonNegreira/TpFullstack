import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import MainLayout
  from "../layouts/MainLayout";

import {
  getProyecto
} from "../api/proyectos.service";

import "../styles/proyecto-detalle.css";

export default function ProyectoDetallePage() {

  const { id } =
    useParams();

  const navigate = useNavigate();
  const { user } = useAuth();

  const [proyecto,
    setProyecto] =
    useState(null);

  useEffect(() => {

    loadProyecto();

  }, []);

  async function loadProyecto() {

    try {

      const response =
        await getProyecto(id);

      setProyecto(
        response.data
      );

    } catch (error) {

      console.error(error);

    }

  }

  if (!proyecto) {

    return (

      <MainLayout>

        <div className="proyecto-detalle-loading">

          Cargando proyecto...

        </div>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      {/* HEADER */}

      <div className="proyecto-detalle-header">

        <div className="proyecto-detalle-header-top">

        <div>

          <h1 className="proyecto-detalle-title">

            📁 {proyecto.nombre}

          </h1>

          <p className="proyecto-detalle-code">

            Código:

            {" "}

            <strong>

              {proyecto.codigo}

            </strong>

          </p>

        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

          <span
            className={`proyecto-detalle-status proyecto-detalle-status-${proyecto.estado}`}
          >
            {proyecto.estado}
          </span>

          {user?.rol === "admin" && (
            <button
              onClick={() => navigate(`/proyectos/${proyecto.id}/editar`)}
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.9rem"
              }}
            >
              ✏️ Editar
            </button>
          )}

        </div>

      </div>

        <p className="proyecto-detalle-description">

          {proyecto.descripcion}

        </p>

      </div>

      {/* RESUMEN */}

      <div className="proyecto-detalle-summary">

        <div className="proyecto-detalle-stat-card">

          <div className="proyecto-detalle-stat-label">

            Usuarios asignados

          </div>

          <div className="proyecto-detalle-stat-value proyecto-detalle-stat-blue">

            {

              proyecto
                .Usuarios?.length || 0

            }

          </div>

        </div>

        <div className="proyecto-detalle-stat-card">

          <div className="proyecto-detalle-stat-label">

            Tareas del proyecto

          </div>

          <div className="proyecto-detalle-stat-value proyecto-detalle-stat-green">

            {

              proyecto
                .Tareas?.length || 0

            }

          </div>

        </div>

      </div>

      {/* USUARIOS Y TAREAS */}

      <div className="proyecto-detalle-content">

        {/* USUARIOS */}

        <div className="proyecto-detalle-panel">

          <h2 className="proyecto-detalle-panel-title">

            👥 Usuarios

          </h2>

          {

            proyecto.Usuarios
              ?.length === 0

              ? (

                <p className="proyecto-detalle-empty">

                  Sin usuarios asignados.

                </p>

              )

              : (

                proyecto.Usuarios
                  ?.map(

                    usuario => (

                      <div
                        key={
                          usuario.id
                        }
                        className="proyecto-detalle-user-row"
                      >

                        <strong>

                          {usuario.nombre}

                        </strong>

                        <small>

                          {usuario.rol}

                        </small>

                      </div>

                    )

                  )

              )

          }

        </div>

        {/* TAREAS */}

        <div className="proyecto-detalle-panel">

          <h2 className="proyecto-detalle-panel-title">

            📋 Tareas

          </h2>

          {

            proyecto.Tareas
              ?.length === 0

              ? (

                <p className="proyecto-detalle-empty">

                  No hay tareas asociadas.

                </p>

              )

              : (

                proyecto.Tareas
                  ?.map(

                    tarea => (

                      <div
                        key={
                          tarea.id
                        }
                        className="proyecto-detalle-task-card"
                      >

                        <strong>

                          {tarea.titulo}

                        </strong>

                        <div className="proyecto-detalle-task-status">

                          Estado:

                          {" "}

                          {tarea.estado}

                        </div>

                      </div>

                    )

                  )

              )

          }

        </div>

      </div>

    </MainLayout>

  );

}