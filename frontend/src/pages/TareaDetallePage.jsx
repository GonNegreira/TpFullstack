import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  Link
} from "react-router-dom";

import MainLayout
from "../layouts/MainLayout";

import {
  getTarea
} from "../api/tareas.service";

export default function TareaDetallePage() {

  const { id } =
    useParams();

  const [tarea,
    setTarea] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    loadTarea();

  }, [id]);

  async function loadTarea() {

    try {

      const response =
        await getTarea(id);

      setTarea(
        response.data
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  if (loading) {

    return (
      <MainLayout>
        <p>Cargando...</p>
      </MainLayout>
    );

  }

  if (!tarea) {

    return (
      <MainLayout>
        <p>Tarea no encontrada</p>
      </MainLayout>
    );

  }

  return (

    <MainLayout>

      <h1>
        {tarea.titulo}
      </h1>

      <p>
        {tarea.descripcion}
      </p>

      <p>
        Estado:
        {" "}
        {tarea.estado}
      </p>

      <p>
        Prioridad:
        {" "}
        {tarea.prioridad}
      </p>

      <p>
        Proyecto:
        {" "}
        {tarea.Proyecto?.nombre}
      </p>

      <p>
        Responsable:
        {" "}
        {tarea.responsable?.nombre}
      </p>

      <Link
        to={`/tareas/${tarea.id}/editar`}
      >
        Editar
      </Link>

    </MainLayout>

  );

}