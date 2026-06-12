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

    } catch (error) {

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

        <div
          style={{
            textAlign: "center",
            padding: "50px"
          }}
        >
          Cargando dashboard...
        </div>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      {/* HEADER */}

      <div
        style={{
          marginBottom: "35px"
        }}
      >

        <h1
          style={{
            marginBottom: "8px",
            color: "#111827"
          }}
        >
          📊 Dashboard Administrativo
        </h1>

        <p
          style={{
            margin: 0,
            color: "#6b7280"
          }}
        >
          Resumen general del sistema y métricas principales.
        </p>

      </div>

      {/* KPIs */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginBottom: "40px"
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

      {/* ESTADOS */}

      <div
        style={{
          marginBottom: "40px"
        }}
      >

        <h2
          style={{
            marginBottom: "20px"
          }}
        >
          📌 Tareas por Estado
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(180px,1fr))",
            gap: "15px"
          }}
        >

          {

            Object.entries(
              stats.tareasPorEstado
            ).map(

              ([estado,
                cantidad]) => (

                <div
                  key={estado}
                  style={{
                    backgroundColor:
                      "#fff",
                    border:
                      "1px solid #e5e7eb",
                    borderRadius:
                      "14px",
                    padding:
                      "20px",
                    boxShadow:
                      "0 2px 8px rgba(0,0,0,0.05)"
                  }}
                >

                  <div
                    style={{
                      color:
                        "#6b7280",
                      marginBottom:
                        "10px"
                    }}
                  >
                    {estado}
                  </div>

                  <div
                    style={{
                      fontSize:
                        "2rem",
                      fontWeight:
                        "700",
                      color:
                        "#2563eb"
                    }}
                  >
                    {cantidad}
                  </div>

                </div>

              )

            )

          }

        </div>

      </div>

      {/* VENCIDAS Y CRITICAS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(350px,1fr))",
          gap: "20px",
          marginBottom: "40px"
        }}
      >

        {/* VENCIDAS */}

        <div
          style={{
            backgroundColor:
              "#fff7ed",
            border:
              "1px solid #fdba74",
            borderRadius:
              "16px",
            padding:
              "25px"
          }}
        >

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
                        key={
                          tarea.id
                        }
                        style={{
                          padding:
                            "10px 0",
                          borderBottom:
                            "1px solid rgba(0,0,0,0.08)"
                        }}
                      >

                        <strong>
                          {tarea.titulo}
                        </strong>

                        <br />

                        <small>
                          👤 {tarea.responsable}
                        </small>

                      </div>

                    )

                  )

              )

          }

        </div>

        {/* CRITICAS */}

        <div
          style={{
            backgroundColor:
              "#fef2f2",
            border:
              "1px solid #fca5a5",
            borderRadius:
              "16px",
            padding:
              "25px"
          }}
        >

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
                        key={
                          tarea.id
                        }
                        style={{
                          padding:
                            "10px 0",
                          borderBottom:
                            "1px solid rgba(0,0,0,0.08)"
                        }}
                      >

                        <strong>
                          {tarea.titulo}
                        </strong>

                        <br />

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

      {/* RESPONSABLES */}

      <div
        style={{
          backgroundColor:
            "#fff",
          border:
            "1px solid #e5e7eb",
          borderRadius:
            "16px",
          padding:
            "25px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.05)"
        }}
      >

        <h2
          style={{
            marginTop: 0
          }}
        >
          🏆 Tareas por Responsable
        </h2>

        {

          Object.entries(
            stats
              .tareasPorResponsable
          ).map(

            ([nombre,
              cantidad]) => (

              <div
                key={nombre}
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  padding:
                    "12px 0",
                  borderBottom:
                    "1px solid #f3f4f6"
                }}
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