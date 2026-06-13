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

        <div className="card" style={{ marginTop: "20px", padding: "20px" }}>
          <h3>📋 Historial de cambios</h3>
          {historial.length === 0 ? (
            <p style={{ color: "#6b7280" }}>Sin historial registrado.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {historial.map(h => (
                <li key={h.id} style={{ borderBottom: "1px solid #e5e7eb", padding: "10px 0" }}>
                  <strong>{h.accion}</strong>
                  <span style={{ color: "#6b7280", marginLeft: "10px", fontSize: "0.85rem" }}>
                    {new Date(h.fechaHora).toLocaleString()}
                  </span>
                  {h.valorAnterior && (
                    <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
                      Antes: {JSON.stringify(h.valorAnterior)}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>

    </MainLayout>

  );


};