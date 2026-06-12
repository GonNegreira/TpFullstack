import { Link } from "react-router-dom";

import { useAuth }
    from "../context/AuthContext";

import EstadoBadge
    from "./EstadoBadge";

import PrioridadBadge
    from "./PrioridadBadge";

export default function TareaCard({ tarea }) {

    const { user } =
        useAuth();
    return (

        <div
            style={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                padding: "18px",
                border: "5px solid #e5e7eb",
                boxShadow:
                    "0 2px 8px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column"
            }}
        >

            <div
                style={{
                    marginBottom: "15px"
                }}
            >

                <div
                    style={{
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        color: "#2563eb",
                        textTransform: "uppercase",
                        marginBottom: "6px"
                    }}
                >
                    Tarea #{tarea.id}
                </div>

                <h3
                    style={{
                        margin: 0,
                        color: "#111827",
                        fontSize: "1.4rem",
                        fontWeight: "700",
                        lineHeight: "1.3"
                    }}
                >
                    {tarea.titulo}
                </h3>

            </div>

            <div
                style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                    marginBottom: "15px"
                }}
            >

                <EstadoBadge
                    estado={tarea.estado}
                />

                <PrioridadBadge
                    prioridad={tarea.prioridad}
                />

            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    fontSize: "0.9rem",
                    color: "#666",
                    marginBottom: "15px"
                }}
            >

                <span>
                    📁 {tarea.Proyecto?.nombre}
                </span>

                <span>
                    ⏳ Límite:
                    {" "}
                    {new Date(
                        tarea.fechaLimite
                    ).toLocaleDateString()}
                </span>

            </div>

            <div
                style={{
                    display: "flex",
                    gap: "10px"
                }}
            >

                <Link
                    to={`/tareas/${tarea.id}`}
                    style={{
                        flex: 1,
                        textDecoration: "none",
                        padding: "10px",
                        textAlign: "center",
                        borderRadius: "8px",
                        backgroundColor: "#2563eb",
                        color: "white",
                        fontWeight: "bold"
                    }}
                >
                    Ver detalle
                </Link>

                {

                    user?.rol === "admin" && (

                        <Link
                            to={`/tareas/${tarea.id}/editar`}
                            style={{
                                flex: 1,
                                textDecoration: "none",
                                padding: "10px",
                                textAlign: "center",
                                borderRadius: "8px",
                                backgroundColor: "#ce8506",
                                color: "white",
                                fontWeight: "bold"
                            }}
                        >
                            Editar
                        </Link>

                    )

                }

            </div>
        </div>

    );

}