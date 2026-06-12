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

import {
  getTarea,
  updateTarea
} from "../api/tareas.service";

import {
  getUsuarios
} from "../api/usuarios.service";

export default function TareaEditPage() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [loading,
    setLoading] =
    useState(true);

  const [error,
    setError] =
    useState("");

  const [usuarios,
    setUsuarios] =
    useState([]);

  const [titulo,
    setTitulo] =
    useState("");

  const [descripcion,
    setDescripcion] =
    useState("");

  const [prioridad,
    setPrioridad] =
    useState("");

  const [estado,
    setEstado] =
    useState("");

  const [fechaLimite,
    setFechaLimite] =
    useState("");

  const [responsableId,
    setResponsableId] =
    useState("");

  useEffect(() => {

    loadData();

  }, []);

  async function loadData() {

    try {

      setLoading(true);

      const [

        tareaResponse,

        usuariosResponse

      ] = await Promise.all([

        getTarea(id),

        getUsuarios()

      ]);

      const tarea =
        tareaResponse.data;

      setUsuarios(
        usuariosResponse.data
      );

      setTitulo(
        tarea.titulo
      );

      setDescripcion(
        tarea.descripcion
      );

      setPrioridad(
        tarea.prioridad
      );

      setEstado(
        tarea.estado
      );

      setFechaLimite(

        tarea.fechaLimite
          ?.split("T")[0]

          || tarea.fechaLimite

      );

      setResponsableId(
        tarea.responsableId
      );

    } catch (err) {

      console.error(err);

      setError(
        "No se pudo cargar la tarea"
      );

    } finally {

      setLoading(false);

    }

  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      await updateTarea(

        id,

        {

          titulo,

          descripcion,

          prioridad,

          estado,

          fechaLimite,

          responsableId

        }

      );

      navigate(
        `/tareas/${id}`
      );

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.error ||
        "Error al actualizar tarea"
      );

    }

  }

  const inputStyle = {

    width: "100%",

    padding: "12px",

    border:
      "1px solid #d1d5db",

    borderRadius: "8px",

    fontSize: "14px",

    boxSizing:
      "border-box"

  };

  const labelStyle = {

    display: "block",

    marginBottom: "6px",

    fontWeight: "600",

    color: "#374151"

  };

  if (loading) {

    return (

      <MainLayout>

        <p>
          Cargando tarea...
        </p>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.08)"
        }}
      >

        <h1
          style={{
            marginTop: 0,
            marginBottom: "10px"
          }}
        >
          ✏️ Editar tarea
        </h1>

        <p
          style={{
            color: "#6b7280",
            marginBottom: "25px"
          }}
        >
          Modificá los datos de la tarea y guardá los cambios.
        </p>

        {error && (

          <div
            style={{
              backgroundColor:
                "#fee2e2",
              color: "#b91c1c",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px"
            }}
          >
            {error}
          </div>

        )}

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px"
          }}
        >

          <div>

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
              style={inputStyle}
            />

          </div>

          <div>

            <label
              htmlFor="descripcion"
              style={labelStyle}
            >
              Descripción
            </label>

            <textarea
              id="descripcion"
              rows="5"
              value={descripcion}
              onChange={e =>
                setDescripcion(
                  e.target.value
                )
              }
              style={{
                ...inputStyle,
                resize: "vertical"
              }}
            />

          </div>

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
              htmlFor="estado"
              style={labelStyle}
            >
              Estado
            </label>

            <select
              id="estado"
              value={estado}
              onChange={e =>
                setEstado(
                  e.target.value
                )
              }
              style={inputStyle}
            >

              <option value="pendiente">
                Pendiente
              </option>

              <option value="en_progreso">
                En progreso
              </option>

              <option value="bloqueada">
                Bloqueada
              </option>

              <option value="finalizada">
                Finalizada
              </option>

              <option value="cancelada">
                Cancelada
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
              style={inputStyle}
            />

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
                  Number(
                    e.target.value
                  )
                )
              }
              style={{
                ...inputStyle,
                cursor: "pointer"
              }}
            >

              <option value="">
                Seleccionar responsable
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

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "10px"
            }}
          >

            <button
              type="submit"
              style={{
                backgroundColor:
                  "#2563eb",
                color: "white",
                border: "none",
                padding:
                  "12px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600"
              }}
            >
              💾 Guardar cambios
            </button>

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/tareas/${id}`
                )
              }
              style={{
                backgroundColor:
                  "#e5e7eb",
                color: "#111827",
                border: "none",
                padding:
                  "12px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600"
              }}
            >
              Cancelar
            </button>

          </div>

        </form>

      </div>

    </MainLayout>

  );

}