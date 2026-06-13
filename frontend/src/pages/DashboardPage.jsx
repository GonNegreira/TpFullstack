import {
  useEffect,
  useState
} from "react";

import "../styles/dashboardPage.css";

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

    } catch (error) {

      console.error(
        error
      );

    } finally {

      setLoading(false);

    }

  }

  if (loading) {

    return (

      <MainLayout>

        <div className="dashboard-loading">

          Cargando dashboard...

        </div>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      <div className="dashboard-header">

        <h1 className="dashboard-title">

          📊 Dashboard Administrativo

        </h1>

        <p className="dashboard-subtitle">

          Resumen general del sistema y métricas principales.

        </p>

      </div>

      <div className="dashboard-kpis">

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

      <section className="dashboard-section">

        <h2 className="dashboard-section-title">

          📌 Tareas por Estado

        </h2>

        <div className="dashboard-states-grid">

          {

            Object.entries(
              stats.tareasPorEstado
            ).map(

              ([estado,
                cantidad]) => (

                <div
                  key={estado}
                  className="dashboard-state-card"
                >

                  <div className="dashboard-state-name">

                    {estado}

                  </div>

                  <div className="dashboard-state-value">

                    {cantidad}

                  </div>

                </div>

              )

            )

          }

        </div>

      </section>

      <div className="dashboard-alerts-grid">

        <div className="dashboard-alert-card dashboard-overdue">

          <h2>

            ⚠️ Tareas Vencidas

          </h2>

          <p>

            Total:

            {" "}

            <strong>

              {

                stats
                  .tareasVencidas
                  .cantidad

              }

            </strong>

          </p>

          {

            stats
              .tareasVencidas
              .tareas
              .length === 0

              ? (

                <p>

                  No hay tareas vencidas.

                </p>

              )

              : (

                stats
                  .tareasVencidas
                  .tareas
                  .map(

                    tarea => (

                      <div
                        key={tarea.id}
                        className="dashboard-task-row"
                      >

                        <strong>

                          {tarea.titulo}

                        </strong>

                        <small>

                          👤 {tarea.responsable}

                        </small>

                      </div>

                    )

                  )

              )

          }

        </div>

        <div className="dashboard-alert-card dashboard-critical">

          <h2>

            🔥 Tareas Críticas

          </h2>

          <p>

            Total:

            {" "}

            <strong>

              {

                stats
                  .tareasCriticas
                  .cantidad

              }

            </strong>

          </p>

          {

            stats
              .tareasCriticas
              .tareas
              .length === 0

              ? (

                <p>

                  No hay tareas críticas.

                </p>

              )

              : (

                stats
                  .tareasCriticas
                  .tareas
                  .map(

                    tarea => (

                      <div
                        key={tarea.id}
                        className="dashboard-task-row"
                      >

                        <strong>

                          {tarea.titulo}

                        </strong>

                        <small>

                          👤 {tarea.responsable}

                        </small>

                      </div>

                    )

                  )

              )

          }

        </div>

      </div>

      <div className="dashboard-responsables">

        <h2>

          🏆 Tareas por Responsable

        </h2>

        {

          Object.entries(
            stats.tareasPorResponsable
          ).map(

            ([nombre,
              cantidad]) => (

              <div
                key={nombre}
                className="dashboard-responsable-row"
              >

                <span>

                  {nombre}

                </span>

                <strong>

                  {cantidad}

                </strong>

              </div>

            )

          )

        }

      </div>

    </MainLayout>

  );

}