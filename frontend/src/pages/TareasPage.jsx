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

      <h1>
        Gestión de tareas
      </h1>

      <hr />

      <div>

        <input
          type="text"
          placeholder="Buscar título..."
          value={search}
          onChange={e =>
            setSearch(
              e.target.value
            )
          }
        />

      </div>

      <br />

      <div>

        <label>
          Estado:
        </label>

        <select
          value={estado}
          onChange={e => {

            setPage(1);

            setEstado(
              e.target.value
            );

          }}
        >

          <option value="">
            Todos
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

      </div>

      <br />

      <div>

        <label>
          Prioridad:
        </label>

        <select
          value={prioridad}
          onChange={e => {

            setPage(1);

            setPrioridad(
              e.target.value
            );

          }}
        >

          <option value="">
            Todas
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

      <br />

      <div>

        <label>
          Ordenar por:
        </label>

        <select
          value={sortBy}
          onChange={e =>
            setSortBy(
              e.target.value
            )
          }
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

      <br />

      <div>

        <label>
          Orden:
        </label>

        <select
          value={order}
          onChange={e =>
            setOrder(
              e.target.value
            )
          }
        >

          <option value="ASC">
            Ascendente
          </option>

          <option value="DESC">
            Descendente
          </option>

        </select>

      </div>

      <hr />

      {

        loading

          ? <p>Cargando...</p>

          : (

            <TareasList
              tareas={
                tareasFiltradas
              }
            />

          )

      }

      <hr />

      <div>

        <button
          disabled={
            page === 1
          }
          onClick={() =>
            setPage(
              prev => prev - 1
            )
          }
        >

          ← Anterior

        </button>

        <span
          style={{
            margin:
              "0 10px"
          }}
        >

          Página {page} de {totalPages}

        </span>

        <button
          disabled={
            page === totalPages
          }
          onClick={() =>
            setPage(
              prev => prev + 1
            )
          }
        >

          Siguiente →

        </button>

      </div>

    </MainLayout>

  );

}