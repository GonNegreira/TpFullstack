import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import {
  getProyectos,
  deleteProyecto
} from "../api/proyectos.service";

import { useAuth } from "../context/AuthContext";

export default function ProyectosPage() {

  const [proyectos, setProyectos] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const { user } = useAuth();

  useEffect(() => {

    loadProyectos();

  }, []);

  async function loadProyectos() {

    try {

      setLoading(true);

      const response =
        await getProyectos();

      setProyectos(
        response.data
      );

    } catch (error) {

      console.error(error);

      alert(
        "Error al cargar proyectos"
      );

    } finally {

      setLoading(false);

    }

  }

  async function handleDelete(id) {

    const confirmar =
      window.confirm(
        "¿Está seguro que desea eliminar este proyecto?"
      );

    if (!confirmar) return;

    try {

      await deleteProyecto(id);

      await loadProyectos();

    } catch (error) {

  console.error(error);

  console.log(
    "DELETE ERROR:",
    error.response
  );

  alert(
    JSON.stringify(
      error.response?.data ||
      error.message
    )
  );

}

  }

  return (

    <MainLayout>

      <h1>

        Gestión de Proyectos

      </h1>

      <hr />

      {

        user?.rol === "admin" && (

          <Link
            to="/proyectos/nuevo"
          >

            <button>

              Crear Proyecto

            </button>

          </Link>

        )

      }

      <br />
      <br />

      {

        loading ? (

          <p>

            Cargando proyectos...

          </p>

        ) : (

          proyectos.map(

            proyecto => (

              <div
                key={proyecto.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginBottom: "15px"
                }}
              >

                <h3>

                  {proyecto.nombre}

                </h3>

                <p>

                  <strong>
                    Código:
                  </strong>

                  {" "}

                  {proyecto.codigo}

                </p>

                <p>

                  <strong>
                    Estado:
                  </strong>

                  {" "}

                  {proyecto.estado}

                </p>

                <p>

                  {proyecto.descripcion}

                </p>

                <p>

                  <strong>
                    Usuarios:
                  </strong>

                  {" "}

                  {proyecto.Usuarios?.length || 0}

                </p>

                <p>

                  <strong>
                    Tareas:
                  </strong>

                  {" "}

                  {proyecto.Tareas?.length || 0}

                </p>

                <Link
                  to={`/proyectos/${proyecto.id}`}
                >

                  <button>

                    Ver

                  </button>

                </Link>

                {" "}

                {

                  user?.rol === "admin" && (

                    <>

                      <Link
                        to={`/proyectos/${proyecto.id}/editar`}
                      >

                        <button>

                          Editar

                        </button>

                      </Link>

                      {" "}

                      <button
                        onClick={() =>
                          handleDelete(
                            proyecto.id
                          )
                        }
                      >

                        Eliminar

                      </button>

                    </>

                  )

                }

              </div>

            )

          )

        )

      }

    </MainLayout>

  );

}