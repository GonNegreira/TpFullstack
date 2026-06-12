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

export default function TareaFormPage() {

  const navigate =
    useNavigate();

  const [titulo,
    setTitulo] =
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

  const inputStyle = {

    width: "100%",

    padding: "12px",

    borderRadius: "8px",

    border: "1px solid #d1d5db",

    fontSize: "1rem",

    boxSizing: "border-box"

  };

  const labelStyle = {

    display: "block",

    marginBottom: "6px",

    fontWeight: "600",

    color: "#374151"

  };

  return (

    <MainLayout>

      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto"
        }}
      >

        <div
          style={{
            marginBottom: "25px"
          }}
        >

          <h1
            style={{
              marginBottom: "5px"
            }}
          >
            Nueva Tarea
          </h1>

          <p
            style={{
              color: "#6b7280"
            }}
          >
            Complete los datos para crear una nueva tarea.
          </p>

        </div>

        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "14px",
            padding: "30px",
            border: "1px solid #e5e7eb",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.06)"
          }}
        >

          <form
            onSubmit={handleSubmit}
          >

            <div
              style={{
                marginBottom: "20px"
              }}
            >

              <label
                htmlFor="titulo"
                style={labelStyle}
              >
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
                style={inputStyle}
              />

            </div>

            <div
              style={{
                marginBottom: "20px"
              }}
            >

              <label
                htmlFor="descripcion"
                style={labelStyle}
              >
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
                style={{
                  ...inputStyle,
                  resize: "vertical"
                }}
              />

            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(250px,1fr))",
                gap: "20px",
                marginBottom: "20px"
              }}
            >

              <div>

                <label
                  htmlFor="prioridad"
                  style={labelStyle}
                >
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
                  style={inputStyle}
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

              <div>

                <label
                  htmlFor="fechaLimite"
                  style={labelStyle}
                >
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
                  style={inputStyle}
                />

              </div>

            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(250px,1fr))",
                gap: "20px",
                marginBottom: "30px"
              }}
            >

              <div>

                <label
                  htmlFor="proyecto"
                  style={labelStyle}
                >
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
                  style={inputStyle}
                >

                  <option value="">
                    Seleccione un proyecto
                  </option>

                  {

                    proyectos.map(
                      proyecto => (

                        <option
                          key={
                            proyecto.id
                          }
                          value={
                            proyecto.id
                          }
                        >

                          {proyecto.nombre}

                        </option>

                      )
                    )

                  }

                </select>

              </div>

              <div>

                <label
                  htmlFor="responsable"
                  style={labelStyle}
                >
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
                  style={inputStyle}
                >

                  <option value="">
                    Seleccione un usuario
                  </option>

                  {

                    usuarios.map(
                      usuario => (

                        <option
                          key={
                            usuario.id
                          }
                          value={
                            usuario.id
                          }
                        >

                          {usuario.nombre}
                          {" "}
                          (
                          {usuario.rol}
                          )

                        </option>

                      )
                    )

                  }

                </select>

              </div>

            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px"
              }}
            >

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/tareas"
                  )
                }
                style={{
                  padding:
                    "12px 18px",
                  border:
                    "1px solid #d1d5db",
                  borderRadius:
                    "8px",
                  cursor:
                    "pointer",
                  backgroundColor:
                    "#fff"
                }}
              >
                Cancelar
              </button>

              <button
                type="submit"
                style={{
                  padding:
                    "12px 18px",
                  border: "none",
                  borderRadius:
                    "8px",
                  cursor:
                    "pointer",
                  backgroundColor:
                    "#2563eb",
                  color: "white",
                  fontWeight:
                    "600"
                }}
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