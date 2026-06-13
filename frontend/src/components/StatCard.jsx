import "../styles/stat-card.css";

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

    Proyectos: "stat-card-value proyectos",

    Usuarios: "stat-card-value usuarios",

    Tareas: "stat-card-value tareas"

  };

  return (

    <div className="stat-card">

      <div className="stat-card-header">

        <span className="stat-card-title">

          {title}

        </span>

        <span className="stat-card-icon">

          {iconos[title]}

        </span>

      </div>

      <div className={colores[title]}>

        {value}

      </div>

    </div>

  );

}