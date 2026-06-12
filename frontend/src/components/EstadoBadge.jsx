export default function EstadoBadge({ estado }) {

    const nombres = {

  pendiente: "Pendiente",

  en_progreso: "En progreso",

  bloqueada: "Bloqueada",

  finalizada: "Finalizada",

  cancelada: "Cancelada"

};

  const estilos = {

    pendiente: {
      backgroundColor: "#facc15",
      color: "#000"
    },

    en_progreso: {
      backgroundColor: "#3b82f6",
      color: "#fff"
    },

    bloqueada: {
      backgroundColor: "#ef4444",
      color: "#fff"
    },

    finalizada: {
      backgroundColor: "#22c55e",
      color: "#fff"
    },

    cancelada: {
      backgroundColor: "#6b7280",
      color: "#fff"
    }

  };

  return (

    <span
      style={{
        padding: "4px 10px",
        borderRadius: "20px",
        fontSize: "0.8rem",
        fontWeight: "bold",
        ...estilos[estado]
      }}
    >

      {nombres[estado]}

    </span>

  );

}