// TareasPage.jsx
import {
  useEffect,
  useState
} from "react";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import MainLayout
  from "../layouts/MainLayout";

import TareasList
  from "../components/TareasList";

import {
  getTareas
} from "../api/tareas.service";

import {
  getProyectos
} from "../api/proyectos.service";

export default function TareasPage() {

  const { user } = useAuth();

  const [tareas, setTareas] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [estado, setEstado] =
    useState("");

  const [prioridad, setPrioridad] =
    useState("");

  const [proyectoId, setProyectoId] =
    useState("");

  const [proyectos, setProyectos] =
    useState([]);

  const [sortBy, setSortBy] =
    useState("createdAt");

  const [order, setOrder] =
    useState("DESC");

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [search, setSearch] =
    useState("");

  // Carga proyectos una sola vez para el filtro
  useEffect(() => {
    getProyectos()
      .then(r => setProyectos(r.data))
      .catch(console.error);
  }, []);

  // Recarga tareas cada vez que cambia un filtro
  useEffect(() => {
    loadTareas();
  }, [
    estado,
    prioridad,
    proyectoId,
    sortBy,
    order,
    page
  ]);

  async function loadTareas() {

    try {

      setLoading(true);

      const response =
        await getTareas({
          estado,
          prioridad,
          proyectoId: proyectoId || undefined,
          sortBy,
          order,
          page,
          limit: 10
        });

      setTareas(
        response.data.data || []
      );

      setTotalPages(
        response.data.totalPages
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  const tareasFiltradas =
    (tareas || []).filter(
      tarea =>
        tarea.titulo
          .toLowerCase()
          .includes(search.toLowerCase())
    );

  return (

    <MainLayout>

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto"
        }}
      >

        {/* HEADER */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px"
          }}
        >

          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "2.2rem",
                color: "#1e293b"
              }}
            >
              📋 Gestión de Tareas
            </h1>

            <p
              style={{
                color: "#64748b",
                marginTop: "8px"
              }}
            >
              Visualiza, filtra y administra las tareas del sistema.
            </p>
          </div>

          {(user?.rol === "admin" || user?.rol === "lider") && (
            <Link to="/tareas/nueva">
              <button
                style={{
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "12px 18px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "1rem"
                }}
              >
                ➕ Nueva Tarea
              </button>
            </Link>
          )}

        </div>

        {/* FILTROS */}

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            marginBottom: "30px"
          }}
        >

          <h3
            style={{
              marginTop: 0,
              color: "#334155"
            }}
          >
            🔎 Filtros y búsqueda
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "15px"
            }}
          >

            <input
              type="text"
              placeholder="Buscar por título..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={inputStyle}
            />

            <select
              value={proyectoId}
              onChange={e => {
                setPage(1);
                setProyectoId(e.target.value);
              }}
              style={inputStyle}
            >
              <option value="">
                Todos los proyectos
              </option>
              {proyectos.map(p => (
                <option key={p.id} value={p.id}>
                  {p.nombre}
                </option>
              ))}
            </select>

            <select
              value={estado}
              onChange={e => {
                setPage(1);
                setEstado(e.target.value);
              }}
              style={inputStyle}
            >
              <option value="">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="en_progreso">En progreso</option>
              <option value="bloqueada">Bloqueada</option>
              <option value="finalizada">Finalizada</option>
              <option value="cancelada">Cancelada</option>
            </select>

            <select
              value={prioridad}
              onChange={e => {
                setPage(1);
                setPrioridad(e.target.value);
              }}
              style={inputStyle}
            >
              <option value="">Todas las prioridades</option>
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
              <option value="critica">Crítica</option>
            </select>

          </div>

          <div
            style={{
              display: "flex",
              marginTop: "15px",
              gap: "15px",
              flexWrap: "wrap",
              alignItems: "center"
            }}
          >

            <label
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#475569"
              }}
            >
              Ordenar por:
            </label>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={inputStyle}
            >
              <option value="createdAt">Fecha creación</option>
              <option value="titulo">Título</option>
              <option value="estado">Estado</option>
              <option value="prioridad">Prioridad</option>
              <option value="fechaLimite">Fecha límite</option>
            </select>

            <select
              value={order}
              onChange={e => setOrder(e.target.value)}
              style={inputStyle}
            >
              <option value="ASC">Ascendente ↑</option>
              <option value="DESC">Descendente ↓</option>
            </select>

          </div>

        </div>

        {/* LISTADO */}

        {loading ? (

          <div
            style={{
              textAlign: "center",
              padding: "50px"
            }}
          >
            <h3>Cargando tareas...</h3>
          </div>

        ) : (

          <TareasList
            tareas={tareasFiltradas}
            onRefresh={loadTareas}
          />

        )}

        {/* PAGINACIÓN */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            marginTop: "30px",
            marginBottom: "40px"
          }}
        >

          <button
            disabled={page === 1}
            onClick={() => setPage(prev => prev - 1)}
            style={buttonStyle}
          >
            ← Anterior
          </button>

          <strong>
            Página {page} de {totalPages}
          </strong>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(prev => prev + 1)}
            style={buttonStyle}
          >
            Siguiente →
          </button>

        </div>

      </div>

    </MainLayout>

  );

}

const inputStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  fontSize: "14px"
};

const buttonStyle = {
  padding: "10px 20px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  background: "white",
  cursor: "pointer",
  fontWeight: "600"
};