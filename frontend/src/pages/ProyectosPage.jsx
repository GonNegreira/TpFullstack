import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import {
    getProyectos,
    deleteProyecto
} from "../api/proyectos.service";

import { useAuth } from "../context/AuthContext";

export default function ProyectosPage() {

    const [proyectos, setProyectos] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const { user } =
        useAuth();

    useEffect(() => {

        loadProyectos();

    }, []);

    async function loadProyectos() {

        try {

            setLoading(true);

            const response =
                await getProyectos();

            setProyectos(
                response.data
            );

        } catch (error) {

            console.error(error);

            alert(
                "Error al cargar proyectos"
            );

        } finally {

            setLoading(false);

        }

    }

    async function handleDelete(id) {

        const confirmar =
            window.confirm(
                "¿Está seguro que desea eliminar este proyecto?"
            );

        if (!confirmar) return;

        try {

            await deleteProyecto(id);

            await loadProyectos();

        } catch (error) {

            alert(
                error.response?.data?.error ||
                "Error al eliminar proyecto"
            );

        }

    }

    function getEstadoColor(estado) {

        switch (estado) {

            case "activo":
                return "#22c55e";

            case "pausado":
                return "#f59e0b";

            case "finalizado":
                return "#64748b";

            default:
                return "#3b82f6";

        }

    }

    return (

        <MainLayout>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "30px"
                }}
            >

                <div>

                    <h1
                        style={{
                            margin: 0,
                            fontSize: "2rem"
                        }}
                    >
                        📁 Proyectos
                    </h1>

                    <p
                        style={{
                            color: "#64748b",
                            marginTop: "5px"
                        }}
                    >
                        Administración y seguimiento de proyectos
                    </p>

                </div>

                {

                    user?.rol === "admin" && (

                        <Link
                            to="/proyectos/nuevo"
                        >

                            <button
                                style={{
                                    background:
                                        "#2563eb",
                                    color: "white",
                                    border: "none",
                                    padding:
                                        "12px 18px",
                                    borderRadius:
                                        "8px",
                                    cursor: "pointer",
                                    fontWeight:
                                        "bold"
                                }}
                            >
                                ➕ Nuevo Proyecto
                            </button>

                        </Link>

                    )

                }

            </div>

            {

                loading ? (

                    <div
                        style={{
                            textAlign: "center",
                            padding: "50px"
                        }}
                    >
                        <h3>
                            Cargando proyectos...
                        </h3>
                    </div>

                ) : (

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fill, minmax(340px, 1fr))",
                            gap: "20px"
                        }}
                    >

                        {

                            proyectos.map(
                                proyecto => (

                                    <div
                                        key={
                                            proyecto.id
                                        }
                                        style={{
                                            background:
                                                "#fff",
                                            border:
                                                "1px solid #e5e7eb",
                                            borderRadius:
                                                "12px",
                                            padding:
                                                "20px",
                                            boxShadow:
                                                "0 2px 8px rgba(0,0,0,0.06)",
                                            display:
                                                "flex",
                                            flexDirection:
                                                "column",
                                            gap: "10px"
                                        }}
                                    >

                                        <div
                                            style={{
                                                display:
                                                    "flex",
                                                justifyContent:
                                                    "space-between",
                                                alignItems:
                                                    "center"
                                            }}
                                        >

                                            <span
                                                style={{
                                                    fontSize:
                                                        "0.8rem",
                                                    color:
                                                        "#64748b"
                                                }}
                                            >
                                                {
                                                    proyecto.codigo
                                                }
                                            </span>

                                            <span
                                                style={{
                                                    background:
                                                        getEstadoColor(
                                                            proyecto.estado
                                                        ),
                                                    color:
                                                        "white",
                                                    padding:
                                                        "4px 10px",
                                                    borderRadius:
                                                        "20px",
                                                    fontSize:
                                                        "0.8rem",
                                                    fontWeight:
                                                        "bold"
                                                }}
                                            >
                                                {
                                                    proyecto.estado
                                                }
                                            </span>

                                        </div>

                                        <h2
                                            style={{
                                                margin:
                                                    "5px 0",
                                                color:
                                                    "#0f172a"
                                            }}
                                        >
                                            {
                                                proyecto.nombre
                                            }
                                        </h2>

                                        <p
                                            style={{
                                                color:
                                                    "#475569",
                                                minHeight:
                                                    "50px"
                                            }}
                                        >
                                            {
                                                proyecto.descripcion
                                            }
                                        </p>

                                        <div
                                            style={{
                                                display:
                                                    "flex",
                                                gap: "20px",
                                                fontSize:
                                                    "0.95rem"
                                            }}
                                        >

                                            <span>
                                                👥{" "}
                                                <strong>
                                                    {
                                                        proyecto.Usuarios?.length || 0
                                                    }
                                                </strong>
                                            </span>

                                            <span>
                                                ✅{" "}
                                                <strong>
                                                    {
                                                        proyecto.Tareas?.length || 0
                                                    }
                                                </strong>
                                            </span>

                                        </div>

                                        <hr
                                            style={{
                                                border:
                                                    "none",
                                                borderTop:
                                                    "1px solid #e5e7eb"
                                            }}
                                        />

                                        <div
                                            style={{
                                                display:
                                                    "flex",
                                                gap: "10px",
                                                flexWrap:
                                                    "wrap"
                                            }}
                                        >

                                            <Link
                                                to={`/proyectos/${proyecto.id}`}
                                            >

                                                <button style={{
                                                    background:
                                                        "#2626dc",
                                                    color:
                                                        "white",
                                                    border:
                                                        "none",
                                                    padding:
                                                        "6px 12px",
                                                    borderRadius:
                                                        "6px",
                                                    cursor:
                                                        "pointer"
                                                }}>
                                                    Ver
                                                </button>

                                            </Link>

                                            {

                                                user?.rol === "admin" && (

                                                    <>

                                                        <Link
                                                            to={`/proyectos/${proyecto.id}/editar`}
                                                        >

                                                            <button style={{
                                                                background:
                                                                    "#2626dc",
                                                                color:
                                                                    "white",
                                                                border:
                                                                    "none",
                                                                padding:
                                                                    "6px 12px",
                                                                borderRadius:
                                                                    "6px",
                                                                cursor:
                                                                    "pointer"
                                                            }}>
                                                                Editar
                                                            </button>

                                                        </Link>

                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    proyecto.id
                                                                )
                                                            }
                                                            style={{
                                                                background:
                                                                    "#dc2626",
                                                                color:
                                                                    "white",
                                                                border:
                                                                    "none",
                                                                padding:
                                                                    "6px 12px",
                                                                borderRadius:
                                                                    "6px",
                                                                cursor:
                                                                    "pointer"
                                                            }}
                                                        >
                                                            Eliminar
                                                        </button>

                                                    </>

                                                )

                                            }

                                        </div>

                                    </div>

                                )

                            )

                        }

                    </div>

                )

            }

        </MainLayout>

    );

}