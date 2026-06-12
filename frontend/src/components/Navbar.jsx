import {
    Link,
    useNavigate
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

    const handleLogout =
        () => {

            logout();

            navigate("/login");

        };

    return (


        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px 20px",
                backgroundColor: "#222",
                color: "white"
            }}
        >
            <h2>

                DDS Tracker

            </h2>
            <div
                style={{
                    display: "flex",
                    gap: "15px"
                }}
            >

                <Link
                    to="/tareas"
                    style={{
                        color: "white"
                    }}
                >
                    Tareas
                </Link>

                <Link
                    to="/proyectos"
                    style={{
                        color: "white"
                    }}
                >
                    Proyectos
                </Link>

                {
                    user?.rol === "admin" && (

                        <Link
                            to="/dashboard"
                            style={{
                                color: "white"
                            }}
                        >
                            Dashboard
                        </Link>

                    )
                }

            </div>

            <div>

                {
                    user && (

                        <>
                            <span
                                style={{
                                    marginRight: "15px"
                                }}
                            >
                                {user.nombre}
                                {" "}
                                ({user.rol})
                            </span>

                            <button
                                onClick={
                                    handleLogout
                                }
                            >
                                Salir
                            </button>
                        </>

                    )
                }

            </div>

        </nav>

    );

}