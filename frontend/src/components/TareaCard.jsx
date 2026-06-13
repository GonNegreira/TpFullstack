import { Link }
  from "react-router-dom";

import { useAuth }
  from "../context/AuthContext";

import EstadoBadge
  from "./EstadoBadge";

import PrioridadBadge
  from "./PrioridadBadge";

import {
  iniciarTarea,
  bloquearTarea,
  cancelarTarea,
  finalizarTarea
} from "../api/tareas.service";

import "../styles/tarea-card.css";

export default function TareaCard({
  tarea,
  onRefresh
}) {

  const { user } =
    useAuth();

  const esAdminOLider =
    user?.rol === "admin" ||
    user?.rol === "lider";

  const esColaboradorResponsable =
    user?.rol === "colaborador" &&
    user?.id === tarea.responsableId;

  async function handleAccion(accionFn) {
    try {
      await accionFn(tarea.id);
      if (onRefresh) onRefresh();
    } catch (err) {
      alert(
        err.response?.data?.error ||
        "Error al cambiar estado"
      );
    }
  }

  return (

    <div className="tarea-card">

      <div className="tarea-card-header">

        <div className="tarea-card-id">

          Tarea #{tarea.id}

        </div>

        <h3 className="tarea-card-title">

          {tarea.titulo}

        </h3>

      </div>

      <div className="tarea-card-badges">

        <EstadoBadge
          estado={tarea.estado}
        />

        <PrioridadBadge
          prioridad={tarea.prioridad}
        />

      </div>

      <div className="tarea-card-info">

        <span>

          📁 {tarea.Proyecto?.nombre}

        </span>

        <span>

          ⏳ Límite:{" "}

          {
            new Date(
              tarea.fechaLimite
            ).toLocaleDateString()
          }

        </span>

      </div>

      {/* BOTONES DE ACCIÓN DE ESTADO */}

      {tarea.estado !== "finalizada" &&
       tarea.estado !== "cancelada" && (

        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "12px"
          }}
        >

          {/* Iniciar: admin/lider/colaborador responsable, solo si pendiente */}
          {(esAdminOLider || esColaboradorResponsable) &&
           tarea.estado === "pendiente" && (

            <button
              onClick={() => handleAccion(iniciarTarea)}
              style={accionBtnStyle("#2563eb")}
            >
              ▶ Iniciar
            </button>

          )}

          {/* Bloquear: admin/lider/colaborador responsable, solo si en_progreso */}
          {(esAdminOLider || esColaboradorResponsable) &&
           tarea.estado === "en_progreso" && (

            <button
              onClick={() => handleAccion(bloquearTarea)}
              style={accionBtnStyle("#d97706")}
            >
              ⏸ Bloquear
            </button>

          )}

          {/* Reanudar: admin/lider/colaborador responsable, solo si bloqueada */}
          {(esAdminOLider || esColaboradorResponsable) &&
           tarea.estado === "bloqueada" && (

            <button
              onClick={() => handleAccion(iniciarTarea)}
              style={accionBtnStyle("#2563eb")}
            >
              ▶ Reanudar
            </button>

          )}

          {/* Finalizar y Cancelar: solo admin/lider */}
          {esAdminOLider && (

            <>

              {tarea.estado === "en_progreso" && (

                <button
                  onClick={() => handleAccion(finalizarTarea)}
                  style={accionBtnStyle("#16a34a")}
                >
                  ✅ Finalizar
                </button>

              )}

              <button
                onClick={() => handleAccion(cancelarTarea)}
                style={accionBtnStyle("#6b7280")}
              >
                ⛔ Cancelar
              </button>

            </>

          )}

        </div>

      )}

      {/* BOTONES DE NAVEGACIÓN */}

      <div className="tarea-card-actions">

        <Link
          to={`/tareas/${tarea.id}`}
          className="tarea-card-btn tarea-card-btn-primary"
        >
          Ver detalle
        </Link>

        {esAdminOLider && (

          <Link
            to={`/tareas/${tarea.id}/editar`}
            className="tarea-card-btn tarea-card-btn-warning"
          >
            Editar
          </Link>

        )}

      </div>

    </div>

  );

}

const accionBtnStyle = (color) => ({
  backgroundColor: color,
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "0.8rem",
  fontWeight: "600"
});