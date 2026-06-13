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
  updateProyecto,
  setIntegrantesProyecto
} from "../api/proyectos.service";

export default function ProyectoEditPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [proyecto, setProyecto] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProyecto();
  }, []);

  async function loadProyecto() {
    try {
      const response = await getProyecto(id);
      setProyecto(response.data);
    } catch (err) {
      console.error(err);
      setError("No se pudo cargar el proyecto");
    }
  }

  async function handleUpdate(data) {
    try {
      setError("");

      // 1. Actualizar datos del proyecto
      await updateProyecto(id, {
        codigo: data.codigo,
        nombre: data.nombre,
        descripcion: data.descripcion,
        estado: data.estado
      });

      // 2. Actualizar integrantes por separado
      await setIntegrantesProyecto(id, data.integrantes);

      navigate(`/proyectos/${id}`);

    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
        "Error al actualizar el proyecto"
      );
    }
  }

  if (!proyecto) {
    return (
      <MainLayout>
        <p>{error || "Cargando proyecto..."}</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        <button
          onClick={() => navigate(`/proyectos/${id}`)}
          style={{
            background: "none",
            border: "none",
            color: "#2563eb",
            cursor: "pointer",
            marginBottom: "20px",
            fontWeight: "600",
            padding: 0
          }}
        >
          ← Volver al proyecto
        </button>

        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "10px" }}>✏️</div>
          <h1 style={{ margin: 0, color: "#111827", fontSize: "2.2rem" }}>
            Editar Proyecto
          </h1>
          <p style={{ color: "#6b7280", marginTop: "10px" }}>
            Modificá los datos del proyecto y su equipo.
          </p>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: "#fee2e2",
              color: "#b91c1c",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px"
            }}
          >
            {error}
          </div>
        )}

        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "35px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
          }}
        >
          <ProyectoForm
            initialData={proyecto}
            onSubmit={handleUpdate}
            modoEdicion={true}
          />
        </div>

      </div>

    </MainLayout>
  );

}
