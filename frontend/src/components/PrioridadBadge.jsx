export default function PrioridadBadge({ prioridad }) {

  const estilos = {

    baja: {
      backgroundColor: "#9ca3af",
      color: "#fff"
    },

    media: {
      backgroundColor: "#3b82f6",
      color: "#fff"
    },

    alta: {
      backgroundColor: "#f97316",
      color: "#fff"
    },

    critica: {
      backgroundColor: "#dc2626",
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
        ...estilos[prioridad]
      }}
    >

      {prioridad}

    </span>

  );

}