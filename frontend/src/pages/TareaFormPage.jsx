import {
  useEffect,
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

import {
  getProyectos
} from "../api/proyectos.service";

import {
  getUsuarios
} from "../api/usuarios.service";

import "../styles/TareaFormPage.css";

export default function TareaFormPage() {

  const navigate =
    useNavigate();

  const [titulo, setTitulo] =
    useState("");

  const [descripcion,
    setDescripcion] =
    useState("");

  const [prioridad,
    setPrioridad] =
    useState("media");

  const [fechaLimite,
    setFechaLimite] =
    useState("");

  const [proyectoId,
    setProyectoId] =
    useState("");

  const [responsableId,
    setResponsableId] =
    useState("");

  const [proyectos,
    setProyectos] =
    useState([]);

  const [usuarios,
    setUsuarios] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    loadData();

  }, []);

  async function loadData() {

    try {

      const [
        proyectosResponse,
        usuariosResponse
      ] = await Promise.all([

        getProyectos(),

        getUsuarios()

      ]);

      setProyectos(
        proyectosResponse.data
      );

      setUsuarios(
        usuariosResponse.data
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      await createTarea({

        titulo,

        descripcion,

        prioridad,

        fechaLimite,

        proyectoId:
          Number(proyectoId),

        responsableId:
          Number(responsableId)

      });

      navigate("/tareas");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.error ||
        "Error al crear tarea"
      );

    }

  }

  if (loading) {

    return (

      <MainLayout>

        <p>
          Cargando formulario...
        </p>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      <div className="tarea-form-container">

        <div className="tarea-form-header">

          <h1>
            Nueva Tarea
          </h1>

          <p>
            Complete los datos para crear una nueva tarea.
          </p>

        </div>

        <div className="tarea-form-card">

          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label htmlFor="titulo">
                Título
              </label>

              <input
                id="titulo"
                value={titulo}
                onChange={e =>
                  setTitulo(
                    e.target.value
                  )
                }
                required
              />

            </div>

            <div className="form-group">

              <label htmlFor="descripcion">
                Descripción
              </label>

              <textarea
                id="descripcion"
                rows={5}
                value={descripcion}
                onChange={e =>
                  setDescripcion(
                    e.target.value
                  )
                }
                required
              />

            </div>

            <div className="form-grid">

              <div className="form-group">

                <label htmlFor="prioridad">
                  Prioridad
                </label>

                <select
                  id="prioridad"
                  value={prioridad}
                  onChange={e =>
                    setPrioridad(
                      e.target.value
                    )
                  }
                >

                  <option value="baja">
                    Baja
                  </option>

                  <option value="media">
                    Media
                  </option>

                  <option value="alta">
                    Alta
                  </option>

                  <option value="critica">
                    Crítica
                  </option>

                </select>

              </div>

              <div className="form-group">

                <label htmlFor="fechaLimite">
                  Fecha límite
                </label>

                <input
                  id="fechaLimite"
                  type="date"
                  value={fechaLimite}
                  onChange={e =>
                    setFechaLimite(
                      e.target.value
                    )
                  }
                  required
                />

              </div>

            </div>

            <div className="form-grid">

              <div className="form-group">

                <label htmlFor="proyecto">
                  Proyecto
                </label>

                <select
                  id="proyecto"
                  value={proyectoId}
                  onChange={e =>
                    setProyectoId(
                      e.target.value
                    )
                  }
                  required
                >

                  <option value="">
                    Seleccione un proyecto
                  </option>

                  {

                    proyectos.map(
                      proyecto => (

                        <option
                          key={proyecto.id}
                          value={proyecto.id}
                        >
                          {proyecto.nombre}
                        </option>

                      )
                    )

                  }

                </select>

              </div>

              <div className="form-group">

                <label htmlFor="responsable">
                  Responsable
                </label>

                <select
                  id="responsable"
                  value={responsableId}
                  onChange={e =>
                    setResponsableId(
                      e.target.value
                    )
                  }
                  required
                >

                  <option value="">
                    Seleccione un usuario
                  </option>

                  {

                    usuarios.map(
                      usuario => (

                        <option
                          key={usuario.id}
                          value={usuario.id}
                        >

                          {usuario.nombre}
                          {" "}
                          ({usuario.rol})

                        </option>

                      )
                    )

                  }

                </select>

              </div>

            </div>

            <div className="form-actions">

              <button
                type="button"
                className="btn-secondary"
                onClick={() =>
                  navigate("/tareas")
                }
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="btn-primary"
              >
                Crear tarea
              </button>

            </div>

          </form>

        </div>

      </div>

    </MainLayout>

  );

}