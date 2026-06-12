import {
  useEffect,
  useState
} from "react";

import MainLayout
  from "../layouts/MainLayout";

import TareasList
  from "../components/TareasList";

import {
  getTareas
} from "../api/tareas.service";

export default function TareasPage() {

  const [tareas,
    setTareas] =
    useState([]);

  const [loading,
    setLoading] =
    useState(false);

  const [estado,
    setEstado] =
    useState("");

  const [prioridad,
    setPrioridad] =
    useState("");

  const [sortBy,
    setSortBy] =
    useState("createdAt");

  const [order,
    setOrder] =
    useState("DESC");

  const [page,
    setPage] =
    useState(1);

  const [totalPages,
    setTotalPages] =
    useState(1);

  const [search,
    setSearch] =
    useState("");

  useEffect(() => {

    loadTareas();

  }, [
    estado,
    prioridad,
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

          sortBy,

          order,

          page,

          limit: 10

        });

      setTareas(
        response.data.data
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
    tareas.filter(
      tarea =>
        tarea.titulo
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
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
            marginBottom: "30px"
          }}
        >

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

        {/* METRICAS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "15px",
            marginBottom: "25px"
          }}
        >

        </div>

        {/* FILTROS */}

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boreder: "1px solid #e5e7eb",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.08)",
            marginBottom: "30px"
          }}
        >
          <div>
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
                  "repeat(auto-fit,minmax(220px,1fr))",
                gap: "15px"
              }}
            >

              <input
                type="text"
                placeholder="Buscar por título..."
                value={search}
                onChange={e =>
                  setSearch(
                    e.target.value
                  )
                }
                style={inputStyle}
              />

              <select
                value={estado}
                onChange={e => {

                  setPage(1);

                  setEstado(
                    e.target.value
                  );

                }}
                style={inputStyle}
              >

                <option value="">
                  Todos los estados
                </option>

                <option value="pendiente">
                  Pendiente
                </option>

                <option value="en_progreso">
                  En progreso
                </option>

                <option value="bloqueada">
                  Bloqueada
                </option>

                <option value="finalizada">
                  Finalizada
                </option>

                <option value="cancelada">
                  Cancelada
                </option>

              </select>

              <select
                value={prioridad}
                onChange={e => {

                  setPage(1);

                  setPrioridad(
                    e.target.value
                  );

                }}
                style={inputStyle}
              >

                <option value="">
                  Todas las prioridades
                </option>

                <option value="baja">
                  Baja
                </option>

                <option value="media">
                  Media
                </option>

                <option value="alta">
                  Alta
                </option>

                <option value="critica">
                  Crítica
                </option>

              </select>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  marginTop: "15px",
                  gap: "15px",
                  flexWrap: "wrap"

                }}
              >
                <label
                  style={{
                    marginTop: "14px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#475569"
                  }}
                >
                  Ordenar por:
                </label>

                <select
                  value={sortBy}
                  onChange={e =>
                    setSortBy(
                      e.target.value
                    )
                  }
                  style={inputStyle}
                >

                  <option value="createdAt">
                    Fecha creación
                  </option>

                  <option value="titulo">
                    Título
                  </option>

                  <option value="estado">
                    Estado
                  </option>

                  <option value="prioridad">
                    Prioridad
                  </option>

                  <option value="fechaLimite">
                    Fecha límite
                  </option>

                </select>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "15px",
                flexWrap: "wrap"
              }}
            >
              <label
                style={{
                  marginBottom: "6px",
                  marginTop: "14px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#475569"
                }}
              >
                Dirección:
              </label>

              <select
                value={order}
                onChange={e =>
                  setOrder(
                    e.target.value
                  )
                }
                style={inputStyle}
              >

                <option value="ASC">
                  Ascendente ↑
                </option>

                <option value="DESC">
                  Descendente ↓
                </option>

              </select>

            </div>

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

            <h3>
              Cargando tareas...
            </h3>

          </div>

        ) : (

          <TareasList
            tareas={
              tareasFiltradas
            }
          />

        )}

        {/* PAGINACION */}

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
            disabled={
              page === 1
            }
            onClick={() =>
              setPage(
                prev => prev - 1
              )
            }
            style={buttonStyle}
          >
            ← Anterior
          </button>

          <strong>
            Página {page} de {totalPages}
          </strong>

          <button
            disabled={
              page === totalPages
            }
            onClick={() =>
              setPage(
                prev => prev + 1
              )
            }
            style={buttonStyle}
          >
            Siguiente →
          </button>

        </div>

      </div>

    </MainLayout>

  );

}

const cardStyle = {

  background: "#fff",

  borderRadius: "14px",

  padding: "20px",

  boxShadow:
    "0 2px 10px rgba(0,0,0,0.08)",

  textAlign: "center"

};

const inputStyle = {

  padding: "12px",

  borderRadius: "10px",

  border:
    "1px solid #cbd5e1",

  fontSize: "14px"

};

const buttonStyle = {

  padding:
    "10px 18px",

  border: "none",

  borderRadius: "10px",

  background:
    "#2563eb",

  color: "white",

  cursor: "pointer",

  fontWeight: "bold"

};