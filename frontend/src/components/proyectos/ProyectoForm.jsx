import { useState, useEffect } from "react";

import { getUsuarios } from "../../api/usuarios.service";

import "../../styles/forms.css";
import "../../styles/buttons.css";

export default function ProyectoForm({
  initialData,
  onSubmit,
  // Si es edición, ocultamos "Estado" porque se maneja con botones separados
  modoEdicion = false
}) {

  const [form, setForm] = useState({
    codigo: initialData?.codigo || "",
    nombre: initialData?.nombre || "",
    descripcion: initialData?.descripcion || "",
    estado: initialData?.estado || "activo",
    integrantes: initialData?.Usuarios?.map(u => u.id) || []
  });

  const [usuarios, setUsuarios] = useState([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(true);

  useEffect(() => {
    loadUsuarios();
  }, []);

  async function loadUsuarios() {
    try {
      const response = await getUsuarios();
      console.log("URL base:", response.config.url);        // ← qué URL usó
      console.log("Request URL:", response.request.responseURL); // ← URL final
      console.log("DATOS:", response.data);
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    } finally {
      setLoadingUsuarios(false);
    }
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleToggleIntegrante(usuarioId) {
    const yaEsta = form.integrantes.includes(usuarioId);
    setForm({
      ...form,
      integrantes: yaEsta
        ? form.integrantes.filter(id => id !== usuarioId)
        : [...form.integrantes, usuarioId]
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  const ROL_LABELS = {
    admin: "👑 Admin",
    lider: "🔷 Líder",
    colaborador: "👤 Colaborador"
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">

      {/* CÓDIGO */}
      <div className="form-group">
        <label htmlFor="codigo" className="form-label">
          Código del Proyecto
        </label>
        <input
          id="codigo"
          name="codigo"
          value={form.codigo}
          onChange={handleChange}
          required
          placeholder="Ej: DDS-005"
          className="form-input"
        />
      </div>

      {/* NOMBRE */}
      <div className="form-group">
        <label htmlFor="nombre" className="form-label">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          placeholder="Ej: Sistema de Ventas"
          className="form-input"
        />
      </div>

      {/* DESCRIPCIÓN */}
      <div className="form-group">
        <label htmlFor="descripcion" className="form-label">
          Descripción
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Describe brevemente el objetivo del proyecto..."
          className="form-textarea"
        />
      </div>

      {/* ESTADO — solo en edición */}
      {modoEdicion && (
        <div className="form-group">
          <label htmlFor="estado" className="form-label">
            Estado Actual
          </label>
          <select
            id="estado"
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="form-select"
          >
            <option value="activo">🟢 Activo</option>
            <option value="pausado">🟡 Pausado</option>
            <option value="finalizado">🔵 Finalizado</option>
          </select>
        </div>
      )}

      {/* EQUIPO */}
      <div className="form-group">
        <label className="form-label">
          Equipo del Proyecto
        </label>
        <small style={{ color: "#6b7280", marginBottom: "10px", display: "block" }}>
          Seleccioná los usuarios que pueden ser responsables de tareas en este proyecto.
        </small>

        {loadingUsuarios ? (
          <p style={{ color: "#9ca3af" }}>Cargando usuarios...</p>
        ) : usuarios.length === 0 ? (
          <p style={{ color: "#9ca3af" }}>No hay usuarios disponibles.</p>
        ) : (
          <div
            style={{
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              overflow: "hidden"
            }}
          >
            {usuarios.map((usuario, index) => {
              const seleccionado = form.integrantes.includes(usuario.id);
              return (
                <div
                  key={usuario.id}
                  onClick={() => handleToggleIntegrante(usuario.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 16px",
                    cursor: "pointer",
                    backgroundColor: seleccionado ? "#eff6ff" : "white",
                    borderBottom: index < usuarios.length - 1
                      ? "1px solid #f3f4f6"
                      : "none",
                    transition: "background-color 0.15s"
                  }}
                >
                  <input
                    type="checkbox"
                    checked={seleccionado}
                    onChange={() => handleToggleIntegrante(usuario.id)}
                    onClick={e => e.stopPropagation()}
                    style={{ width: "16px", height: "16px", cursor: "pointer" }}
                  />
                  <div style={{ flex: 1 }}>
                    <strong style={{ color: "#111827" }}>
                      {usuario.nombre}
                    </strong>
                    <span style={{ color: "#6b7280", fontSize: "13px", marginLeft: "8px" }}>
                      {usuario.email}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: seleccionado ? "#2563eb" : "#9ca3af"
                    }}
                  >
                    {ROL_LABELS[usuario.rol] || usuario.rol}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {form.integrantes.length > 0 && (
          <small style={{ color: "#2563eb", marginTop: "8px", display: "block" }}>
            ✓ {form.integrantes.length} integrante{form.integrantes.length !== 1 ? "s" : ""} seleccionado{form.integrantes.length !== 1 ? "s" : ""}
          </small>
        )}
      </div>

      {/* ACCIONES */}
      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
        >
          💾 Guardar Proyecto
        </button>
      </div>

    </form>
  );

}
