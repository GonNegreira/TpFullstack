import {
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

import "../styles/navbar.css";

export default function Navbar() {

  const {
    user,
    logout
  } = useAuth();

  const navigate =
    useNavigate();

  const location =
    useLocation();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function isActive(path) {
    return location.pathname === path;  // <- exacto en vez de startsWith
  }

  return (

    <nav className="navbar">

      <div className="navbar-logo">

        <div>

          <div className="navbar-title">
            DDS Tracker
          </div>

          <div className="navbar-subtitle">
            Gestión de Proyectos
          </div>

        </div>

      </div>

      <div className="navbar-links">

        <Link
          to="/tareas"
          className={
            isActive("/tareas")
              ? "nav-link active"
              : "nav-link"
          }
        >
          📌 Tareas
        </Link>

        <Link
          to="/proyectos"
          className={
            isActive("/proyectos")
              ? "nav-link active"
              : "nav-link"
          }
        >
          📁 Proyectos
        </Link>

        {user?.rol === "admin" && (

          <Link
            to="/tareas/resumen"          // <- ruta corregida
            className={
              isActive("/tareas/resumen") // <- ruta corregida
                ? "nav-link active"
                : "nav-link"
            }
          >
            📊 Resumen                    
          </Link>

        )}

      </div>

      <div className="navbar-user">

        {user && (

          <div className="user-info">

            <strong>
              {user.nombre}
            </strong>

            <span className="role-badge">
              {user.rol}
            </span>

          </div>

        )}

        <button
          onClick={handleLogout}
          className="logout-button"
        >
          Salir
        </button>

      </div>

    </nav>

  );

}