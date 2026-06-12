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
        await getProyecto(
          id
        );

      setProyecto(
        response.data
      );

    } catch (error) {

      console.error(
        error
      );

    }

  }

  if (!proyecto) {

    return (

      <MainLayout>

        <p>
          Cargando...
        </p>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      <h1>

        {
          proyecto.nombre
        }

      </h1>

      <p>

        Código:
        {" "}
        {
          proyecto.codigo
        }

      </p>

      <p>

        Estado:
        {" "}
        {
          proyecto.estado
        }

      </p>

      <p>

        {
          proyecto.descripcion
        }

      </p>

      <hr />

      <h2>

        Usuarios

      </h2>

      <ul>

        {

          proyecto.Usuarios
            ?.map(

              usuario => (

                <li
                  key={
                    usuario.id
                  }
                >

                  {
                    usuario.nombre
                  }

                  {" - "}

                  {
                    usuario.rol
                  }

                </li>

              )

            )

        }

      </ul>

      <hr />

      <h2>

        Tareas

      </h2>

      <ul>

        {

          proyecto.Tareas
            ?.map(

              tarea => (

                <li
                  key={
                    tarea.id
                  }
                >

                  {
                    tarea.titulo
                  }

                  {" - "}

                  {
                    tarea.estado
                  }

                </li>

              )

            )

        }

      </ul>

    </MainLayout>

  );

}