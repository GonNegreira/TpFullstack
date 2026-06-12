import {
  useEffect,
  useState
} from "react";

import MainLayout
from "../layouts/MainLayout";

import StatCard
from "../components/StatCard";

import {
  getDashboard
} from "../api/dashboard.service";

export default function DashboardPage() {

  const [stats,
    setStats] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    loadDashboard();

  }, []);

  async function loadDashboard() {

    try {

      const response =
        await getDashboard();

      setStats(
        response.data
      );

    } catch (
      error
    ) {

      console.error(
        error
      );

    } finally {

      setLoading(
        false
      );

    }

  }

  if (loading) {

    return (

      <MainLayout>

        <p>
          Cargando dashboard...
        </p>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      <h1>

        Dashboard Administrativo

      </h1>

      <hr />

      <div
        style={{

          display:
            "flex",

          flexWrap:
            "wrap"

        }}
      >

        <StatCard
          title="Proyectos"
          value={
            stats.totalProyectos
          }
        />

        <StatCard
          title="Usuarios"
          value={
            stats.totalUsuarios
          }
        />

        <StatCard
          title="Tareas"
          value={
            stats.totalTareas
          }
        />

      </div>

      <hr />

      <h2>

        Tareas por Estado

      </h2>

      <ul>

        {

          Object.entries(
            stats.tareasPorEstado
          ).map(

            ([estado,
              cantidad]) => (

              <li
                key={
                  estado
                }
              >

                {estado}
                {" : "}
                {cantidad}

              </li>

            )

          )

        }

      </ul>

      <hr />

      <h2>

        Tareas Vencidas

      </h2>

      <p>

        Cantidad:
        {" "}
        {
          stats
          .tareasVencidas
          .cantidad
        }

      </p>

      <ul>

        {

          stats
            .tareasVencidas
            .tareas
            .map(

              tarea => (

                <li
                  key={
                    tarea.id
                  }
                >

                  {tarea.titulo}
                  {" - "}
                  {
                    tarea.responsable
                  }

                </li>

              )

            )

        }

      </ul>

      <hr />

      <h2>

        Tareas Críticas

      </h2>

      <p>

        Cantidad:
        {" "}
        {
          stats
          .tareasCriticas
          .cantidad
        }

      </p>

      <ul>

        {

          stats
            .tareasCriticas
            .tareas
            .map(

              tarea => (

                <li
                  key={
                    tarea.id
                  }
                >

                  {tarea.titulo}
                  {" - "}
                  {
                    tarea.responsable
                  }

                </li>

              )

            )

        }

      </ul>

      <hr />

      <h2>

        Tareas por Responsable

      </h2>

      <ul>

        {

          Object.entries(
            stats
            .tareasPorResponsable
          ).map(

            ([nombre,
              cantidad]) => (

              <li
                key={
                  nombre
                }
              >

                {nombre}
                {" : "}
                {cantidad}

              </li>

            )

          )

        }

      </ul>

    </MainLayout>

  );

}