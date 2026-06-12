export default function StatCard({

  title,

  value

}) {

  const iconos = {

    Proyectos: "📁",

    Usuarios: "👥",

    Tareas: "✅"

  };

  const colores = {

    Proyectos: "#2563eb",

    Usuarios: "#7c3aed",

    Tareas: "#16a34a"

  };

  return (

    <div
      style={{
        backgroundColor: "#fff",

        border:
          "1px solid #e5e7eb",

        borderRadius: "16px",

        padding: "24px",

        boxShadow:
          "0 4px 12px rgba(0,0,0,0.06)",

        transition:
          "all 0.2s ease"
      }}
    >

      <div
        style={{
          display: "flex",

          justifyContent:
            "space-between",

          alignItems:
            "center",

          marginBottom: "12px"
        }}
      >

        <span
          style={{
            color: "#6b7280",

            fontSize: "0.95rem",

            fontWeight: "500"
          }}
        >
          {title}
        </span>

        <span
          style={{
            fontSize: "1.8rem"
          }}
        >
          {
            iconos[title]
          }
        </span>

      </div>

      <div
        style={{
          fontSize: "2.8rem",

          fontWeight: "700",

          color:
            colores[title]
        }}
      >
        {value}
      </div>

    </div>

  );

}