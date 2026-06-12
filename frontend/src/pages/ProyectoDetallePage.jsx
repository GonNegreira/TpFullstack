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

export default function ProyectoDetallePage() {

  const { id } =
    useParams();

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

        <div
          style={{
            textAlign: "center",
            padding: "50px"
          }}
        >
          Cargando proyecto...
        </div>

      </MainLayout>

    );

  }

  const estadoColor = {

    activo:
      "#16a34a",

    pausado:
      "#f59e0b",

    finalizado:
      "#6b7280"

  };

  return (

    <MainLayout>

      {/* HEADER */}

      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "18px",
          padding: "30px",
          border:
            "1px solid #e5e7eb",
          marginBottom: "25px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.05)"
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
            flexWrap: "wrap",
            gap: "10px"
          }}
        >

          <div>

            <h1
              style={{
                margin: 0
              }}
            >
              📁 {proyecto.nombre}
            </h1>

            <p
              style={{
                marginTop: "8px",
                color: "#6b7280"
              }}
            >
              Código:
              {" "}
              <strong>
                {proyecto.codigo}
              </strong>
            </p>

          </div>

          <span
            style={{
              backgroundColor:
                estadoColor[
                  proyecto.estado
                ] || "#2563eb",

              color: "white",

              padding:
                "8px 14px",

              borderRadius:
                "999px",

              fontWeight:
                "600",

              textTransform:
                "capitalize"
            }}
          >
            {proyecto.estado}
          </span>

        </div>

        <p
          style={{
            marginTop: "20px",
            color: "#374151",
            lineHeight: 1.7
          }}
        >
          {proyecto.descripcion}
        </p>

      </div>

      {/* RESUMEN */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "30px"
        }}
      >

        <div
          style={{
            backgroundColor: "#fff",
            border:
              "1px solid #e5e7eb",
            borderRadius: "16px",
            padding: "20px"
          }}
        >

          <div
            style={{
              color: "#6b7280"
            }}
          >
            Usuarios asignados
          </div>

          <div
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#2563eb"
            }}
          >
            {
              proyecto
                .Usuarios?.length || 0
            }
          </div>

        </div>

        <div
          style={{
            backgroundColor: "#fff",
            border:
              "1px solid #e5e7eb",
            borderRadius: "16px",
            padding: "20px"
          }}
        >

          <div
            style={{
              color: "#6b7280"
            }}
          >
            Tareas del proyecto
          </div>

          <div
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#16a34a"
            }}
          >
            {
              proyecto
                .Tareas?.length || 0
            }
          </div>

        </div>

      </div>

      {/* USUARIOS Y TAREAS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 2fr",
          gap: "25px"
        }}
      >

        {/* USUARIOS */}

        <div
          style={{
            backgroundColor: "#fff",
            border:
              "1px solid #e5e7eb",
            borderRadius: "18px",
            padding: "25px"
          }}
        >

          <h2
            style={{
              marginTop: 0
            }}
          >
            👥 Usuarios
          </h2>

          {

            proyecto.Usuarios
              ?.length === 0

              ? (

                <p>
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
                        style={{
                          padding:
                            "12px 0",
                          borderBottom:
                            "1px solid #f3f4f6"
                        }}
                      >

                        <strong>
                          {usuario.nombre}
                        </strong>

                        <br />

                        <small
                          style={{
                            color:
                              "#6b7280"
                          }}
                        >
                          {usuario.rol}
                        </small>

                      </div>

                    )

                  )

              )

          }

        </div>

        {/* TAREAS */}

        <div
          style={{
            backgroundColor: "#fff",
            border:
              "1px solid #e5e7eb",
            borderRadius: "18px",
            padding: "25px"
          }}
        >

          <h2
            style={{
              marginTop: 0
            }}
          >
            📋 Tareas
          </h2>

          {

            proyecto.Tareas
              ?.length === 0

              ? (

                <p>
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
                        style={{
                          padding:
                            "15px",
                          border:
                            "1px solid #e5e7eb",
                          borderRadius:
                            "12px",
                          marginBottom:
                            "12px"
                        }}
                      >

                        <strong>
                          {tarea.titulo}
                        </strong>

                        <div
                          style={{
                            marginTop:
                              "6px",
                            color:
                              "#6b7280"
                          }}
                        >
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