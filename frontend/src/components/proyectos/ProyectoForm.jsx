import { useState } from "react";

export default function ProyectoForm({
  initialData,
  onSubmit
}) {

  const [form,
    setForm] = useState({

    codigo:
      initialData?.codigo || "",

    nombre:
      initialData?.nombre || "",

    descripcion:
      initialData?.descripcion || "",

    estado:
      initialData?.estado || "activo"

  });

  function handleChange(e) {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value

    });

  }

  function handleSubmit(e) {

    e.preventDefault();

    onSubmit(form);

  }

  const inputStyle = {

    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "0.95rem",
    boxSizing: "border-box",
    marginTop: "6px"

  };

  const labelStyle = {

    display: "block",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "4px"

  };

  return (

    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "22px"
      }}
    >

      <div>

        <label
          htmlFor="codigo"
          style={labelStyle}
        >
          Código del Proyecto
        </label>

        <input
          id="codigo"
          name="codigo"
          value={form.codigo}
          onChange={handleChange}
          required
          placeholder="Ej: DDS-005"
          style={inputStyle}
        />

      </div>

      <div>

        <label
          htmlFor="nombre"
          style={labelStyle}
        >
          Nombre
        </label>

        <input
          id="nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          placeholder="Ej: Sistema de Ventas"
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
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Describe brevemente el objetivo del proyecto..."
          style={{
            ...inputStyle,
            resize: "vertical"
          }}
        />

      </div>

      <div>

        <label
          htmlFor="estado"
          style={labelStyle}
        >
          Estado Inicial
        </label>

        <select
          id="estado"
          name="estado"
          value={form.estado}
          onChange={handleChange}
          style={{
            ...inputStyle,
            cursor: "pointer",
            backgroundColor: "#fff"
          }}
        >

          <option value="activo">
            🟢 Activo
          </option>

          <option value="pausado">
            🟡 Pausado
          </option>

          <option value="finalizado">
            🔵 Finalizado
          </option>

        </select>

      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "10px"
        }}
      >

        <button
          type="submit"
          style={{
            padding:
              "12px 24px",
            border: "none",
            borderRadius: "10px",
            backgroundColor:
              "#2563eb",
            color: "white",
            fontWeight: "600",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow:
              "0 4px 12px rgba(37,99,235,0.25)"
          }}
        >
          💾 Guardar Proyecto
        </button>

      </div>

    </form>

  );

}