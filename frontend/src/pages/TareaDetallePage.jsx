import "../styles/tarea-detalle.css";
import "../styles/cards.css";
import "../styles/buttons.css";



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

import { getTarea, getHistorialTarea } from "../api/tareas.service";

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

  const [historial, setHistorial] = useState([]);

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
      const hRes = await getHistorialTarea(id);
      setHistorial(hRes.data);

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

      <div className="tarea-detalle-container">

        <div className="tarea-detalle-header">

          <div>

            <div className="tarea-detalle-id">

              Tarea #{tarea.id}

            </div>

            <h1 className="tarea-detalle-title">

              {tarea.titulo}

            </h1>

          </div>

          <Link
            to={`/tareas/${tarea.id}/editar`}
            className="btn-link"
          >

            <button
              className="btn btn-primary"
            >
              ✏️ Editar
            </button>

          </Link>

        </div>

        <div className="tarea-detalle-badges">

          <EstadoBadge
            estado={tarea.estado}
          />

          <PrioridadBadge
            prioridad={tarea.prioridad}
          />

        </div>

        <div className="card tarea-detalle-description">

          <h3>
            Descripción
          </h3>

          <p>
            {tarea.descripcion}
          </p>

        </div>

        <div className="tarea-detalle-grid">

          <div
            className="card tarea-detalle-card"
          >

            <h3>
              Información General
            </h3>

            <p>

              <strong>
                Proyecto:
              </strong>

              <br />

              📁 {tarea.Proyecto?.nombre}

            </p>

            <p>

              <strong>
                Responsable:
              </strong>

              <br />

              👤 {tarea.responsable?.nombre}

            </p>

          </div>

          <div
            className="card tarea-detalle-card"
          >

            <h3>
              Fechas
            </h3>

            <p>

              <strong>
                Creación:
              </strong>

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

              <strong>
                Fecha límite:
              </strong>

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

        <div
          className="card"
          style={{
            marginTop: "20px",
            padding: "24px"
          }}
        >
          <h3
            style={{
              marginBottom: "20px",
              fontSize: "1.2rem"
            }}
          >
            📋 Historial de cambios
          </h3>

          {historial.length === 0 ? (

            <p style={{ color: "#6b7280" }}>
              Sin historial registrado.
            </p>

          ) : (

            <div>

              {historial.map((h, index) => (

                <div
                  key={h.id}
                  style={{
                    display: "flex",
                    gap: "16px",
                    marginBottom:
                      index === historial.length - 1
                        ? 0
                        : "18px"
                  }}
                >

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >

                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: "#2563eb",
                        marginTop: "6px"
                      }}
                    />

                    {index !== historial.length - 1 && (

                      <div
                        style={{
                          width: "2px",
                          flex: 1,
                          background: "#e5e7eb",
                          marginTop: "4px"
                        }}
                      />

                    )}

                  </div>

                  <div
                    style={{
                      flex: 1,
                      paddingBottom: "12px"
                    }}
                  >

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "8px"
                      }}
                    >

                      <strong
                        style={{
                          color: "#111827"
                        }}
                      >
                        {h.accion}
                      </strong>

                      <span
                        style={{
                          fontSize: "0.85rem",
                          color: "#6b7280"
                        }}
                      >
                        {new Date(
                          h.fechaHora
                        ).toLocaleString()}
                      </span>

                    </div>

                    {h.valorAnterior && (

                      <div
                        style={{
                          marginTop: "8px",
                          padding: "10px",
                          background: "#f8fafc",
                          borderRadius: "8px",
                          fontSize: "0.85rem",
                          color: "#475569",
                          overflowX: "auto"
                        }}
                      >

                        <strong>
                          Valor antes del cambio
                        </strong>

                        {(() => {

                          let valor = h.valorAnterior;

                          if (typeof valor === "string") {

                            try {

                              valor = JSON.parse(valor);

                            } catch {

                              return (
                                <div>
                                  {h.valorAnterior}
                                </div>
                              );

                            }

                          }

                          return Object.entries(valor).map(
                            ([campo, contenido]) => (

                              <div
                                key={campo}
                                style={{
                                  marginBottom: "4px"
                                }}
                              >

                                <strong>

                                  {campo === "titulo" && "Título"}
                                  {campo === "descripcion" && "Descripción"}
                                  {campo === "prioridad" && "Prioridad"}
                                  {campo === "estado" && "Estado"}
                                  {campo === "fechaLimite" && "Fecha límite"}
                                  {campo === "responsableId" && "Responsable"}

                                  {![
                                    "titulo",
                                    "descripcion",
                                    "prioridad",
                                    "estado",
                                    "fechaLimite",
                                    "responsableId"
                                  ].includes(campo)
                                    ? campo
                                    : ""}

                                  :

                                </strong>

                                {" "}

                                {campo === "fechaLimite"
                                  ? new Date(
                                    contenido
                                  ).toLocaleDateString()
                                  : String(contenido)}

                              </div>

                            )
                          );

                        })()}

                      </div>

                    )}

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </MainLayout>

  );


};