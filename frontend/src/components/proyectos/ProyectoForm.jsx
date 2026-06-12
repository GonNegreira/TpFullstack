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

  return (

    <form onSubmit={handleSubmit}>

      <div>

        <label>

          Código

        </label>

        <input
          name="codigo"
          value={form.codigo}
          onChange={handleChange}
          required
        />

      </div>

      <div>

        <label>

          Nombre

        </label>

        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />

      </div>

      <div>

        <label>

          Descripción

        </label>

        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          required
        />

      </div>

      <div>

        <label>

          Estado

        </label>

        <select
          name="estado"
          value={form.estado}
          onChange={handleChange}
        >

          <option value="activo">
            Activo
          </option>

          <option value="pausado">
            Pausado
          </option>

          <option value="finalizado">
            Finalizado
          </option>

        </select>

      </div>

      <button type="submit">

        Guardar

      </button>

    </form>

  );

}