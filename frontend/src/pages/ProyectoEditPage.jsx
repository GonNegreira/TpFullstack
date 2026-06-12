import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import MainLayout
from "../layouts/MainLayout";

import ProyectoForm
from "../components/proyectos/ProyectoForm";

import {
  getProyecto,
  updateProyecto
} from "../api/proyectos.service";

export default function ProyectoEditPage() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [proyecto,
    setProyecto] =
    useState(null);

  useEffect(() => {

    loadProyecto();

  }, []);

  async function loadProyecto() {

    const response =
      await getProyecto(id);

    setProyecto(
      response.data
    );

  }

  async function handleUpdate(data) {

    try {

      await updateProyecto(
        id,
        data
      );

      navigate(
        `/proyectos/${id}`
      );

    } catch (error) {

  console.error(error);

  console.log(
    "RESPONSE:",
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

  if (!proyecto) {

    return (

      <MainLayout>

        Cargando...

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      <h1>

        Editar Proyecto

      </h1>

      <ProyectoForm
        initialData={
          proyecto
        }
        onSubmit={
          handleUpdate
        }
      />

    </MainLayout>

  );

}