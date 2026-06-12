import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import MainLayout
from "../layouts/MainLayout";

import {
  createTarea
} from "../api/tareas.service";

export default function TareaFormPage() {

  const navigate =
    useNavigate();

  const [titulo,
    setTitulo] =
    useState("");

  const [descripcion,
    setDescripcion] =
    useState("");

  async function handleSubmit(
    e
  ) {

    e.preventDefault();

    try {

      await createTarea({

        titulo,

        descripcion,

        prioridad:
          "media",

        proyectoId:
          105,

        responsableId:
          2

      });

      navigate(
        "/tareas"
      );

    } catch (
      error
    ) {

      console.error(
        error
      );

    }

  }

  return (

    <MainLayout>

      <h1>
        Nueva tarea
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
      >

        <input
          value={
            titulo
          }
          onChange={
            e =>
              setTitulo(
                e.target.value
              )
          }
          placeholder="Título"
        />

        <br />

        <textarea
          value={
            descripcion
          }
          onChange={
            e =>
              setDescripcion(
                e.target.value
              )
          }
        />

        <br />

        <button
          type="submit"
        >

          Crear

        </button>

      </form>

    </MainLayout>

  );

}