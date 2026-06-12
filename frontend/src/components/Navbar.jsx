import {
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

export default function Navbar() {

  const {
    user,
    logout
  } = useAuth();

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const handleLogout =
    () => {

      logout();

      navigate("/login");

    };

  function isActive(path) {

    return location.pathname.startsWith(path);

  }

  return (

    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 24px",
        backgroundColor: "rgb(206, 206, 206)",
        borderBottom:
          "1px solid #e2e8f0",
        boxShadow:
          "0 2px 8px rgba(0,0,0,0.04)",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}
    >

      {/* Logo */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}
      >

        <span
          style={{
            fontSize: "1.8rem"
          }}
        >
          
        </span>

        <div>

          <div
            style={{
              fontSize: "1.2rem",
              fontWeight: "700",
              color: "#1e293b"
            }}
          >
            DDS Tracker
          </div>

          <div
            style={{
              fontSize: "0.8rem",
              color: "#64748b"
            }}
          >
            Gestión de Proyectos
          </div>

        </div>

      </div>

      {/* Navegación */}

      <div
        style={{
          display: "flex",
          gap: "10px"
        }}
      >

        <Link
          to="/tareas"
          style={{
            ...linkStyle,
            ...(isActive("/tareas")
              ? activeLinkStyle
              : {})
          }}
        >
          📌 Tareas
        </Link>

        <Link
          to="/proyectos"
          style={{
            ...linkStyle,
            ...(isActive("/proyectos")
              ? activeLinkStyle
              : {})
          }}
        >
          📁 Proyectos
        </Link>

        {
          user?.rol === "admin" && (

            <Link
              to="/dashboard"
              style={{
                ...linkStyle,
                ...(isActive("/dashboard")
                  ? activeLinkStyle
                  : {})
              }}
            >
              📊 Dashboard
            </Link>

          )
        }

      </div>

      {/* Usuario */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px"
        }}
      >

        {

          user && (

            <div
              style={{
                display: "flex",
                flexDirection:
                  "column",
                alignItems:
                  "flex-end"
              }}
            >

              <strong>
                {user.nombre}
              </strong>

              <span
                style={{
                  background:
                    "#dbeafe",
                  color:
                    "#1d4ed8",
                  padding:
                    "2px 8px",
                  borderRadius:
                    "999px",
                  fontSize:
                    "12px",
                  fontWeight:
                    "600"
                }}
              >
                {user.rol}
              </span>

            </div>

          )

        }

        <button
          onClick={
            handleLogout
          }
          style={{
            border: "none",
            background:
              "#ef4444",
            color: "white",
            padding:
              "8px 14px",
            borderRadius:
              "8px",
            cursor:
              "pointer",
            fontWeight:
              "600"
          }}
        >
          Salir
        </button>

      </div>

    </nav>

  );

}

const linkStyle = {

  textDecoration:
    "none",

  color:
    "#475569",

  padding:
    "8px 14px",

  borderRadius:
    "8px",

  fontWeight:
    "600",

  transition:
    "all 0.2s"

};

const activeLinkStyle = {

  background:
    "#2563eb",

  color:
    "white"

};