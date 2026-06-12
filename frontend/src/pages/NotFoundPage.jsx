import { Link } from "react-router-dom";

export default function NotFoundPage() {

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #eff6ff, #dbeafe)",
        padding: "20px"
      }}
    >

      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "24px",
          padding: "50px",
          textAlign: "center",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)"
        }}
      >

        <div
          style={{
            fontSize: "6rem",
            marginBottom: "10px"
          }}
        >
          🚧
        </div>

        <h1
          style={{
            fontSize: "5rem",
            margin: 0,
            color: "#2563eb",
            lineHeight: 1
          }}
        >
          404
        </h1>

        <h2
          style={{
            marginTop: "15px",
            color: "#111827"
          }}
        >
          Página no encontrada
        </h2>

        <p
          style={{
            color: "#6b7280",
            fontSize: "1.1rem",
            marginBottom: "35px"
          }}
        >
          La página que intentás visitar no existe
          o fue movida a otra ubicación.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap"
          }}
        >

          <Link
            to="/tareas"
            style={{
              textDecoration: "none",
              padding: "12px 24px",
              borderRadius: "10px",
              backgroundColor: "#2563eb",
              color: "white",
              fontWeight: "600"
            }}
          >
            📋 Ver tareas
          </Link>

          <Link
            to="/proyectos"
            style={{
              textDecoration: "none",
              padding: "12px 24px",
              borderRadius: "10px",
              backgroundColor: "#f3f4f6",
              color: "#111827",
              fontWeight: "600"
            }}
          >
            📁 Ver proyectos
          </Link>

        </div>

      </div>

    </div>

  );

}