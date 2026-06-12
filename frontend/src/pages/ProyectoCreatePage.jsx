import { useNavigate }
from "react-router-dom";

import MainLayout
from "../layouts/MainLayout";

import ProyectoForm
from "../components/proyectos/ProyectoForm";

import {
  createProyecto
} from "../api/proyectos.service";

export default function ProyectoCreatePage() {

  const navigate =
    useNavigate();

  async function handleCreate(data) {

    try {

      await createProyecto(
        data
      );

      navigate(
        "/proyectos"
      );

    } catch (error) {

      alert(
        error.response?.data?.error
      );

    }

  }

  return (

    <MainLayout>

      <h1>

        Nuevo Proyecto

      </h1>

      <ProyectoForm
        onSubmit={
          handleCreate
        }
      />

    </MainLayout>

  );

}