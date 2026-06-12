import TareaCard from "./TareaCard";

export default function TareasList({ tareas }) {

  if (!tareas || tareas.length === 0) {

    return (

      <p>
        No hay tareas para mostrar.
      </p>

    );

  }

  return (

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fill, minmax(380px, 1fr))",
        gap: "20px",
        alignItems: "start"
      }}
    >

      {tareas.map((tarea) => (

        <TareaCard
          key={tarea.id}
          tarea={tarea}
        />

      ))}

    </div>

  );

}