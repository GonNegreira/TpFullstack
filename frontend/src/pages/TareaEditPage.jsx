import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import MainLayout
    from "../layouts/MainLayout";

import {
    getTarea,
    updateTarea
} from "../api/tareas.service";

export default function TareaEditPage() {

    const { id } =
        useParams();

    const navigate =
        useNavigate();

    const [titulo,
        setTitulo] =
        useState("");

    const [descripcion,
        setDescripcion] =
        useState("");

    const [prioridad,
        setPrioridad] =
        useState("");

    const [estado,
        setEstado] =
        useState("");

    const [fechaLimite,
        setFechaLimite] =
        useState("");

    const [proyectoId,
        setProyectoId] =
        useState("");

    const [responsableId,
        setResponsableId] =
        useState("");

    useEffect(() => {

        loadTarea();

    }, []);

    async function loadTarea() {

        try {

            const response =
                await getTarea(id);

            const tarea =
                response.data;

            setTitulo(
                tarea.titulo
            );

            setDescripcion(
                tarea.descripcion
            );

            setPrioridad(
                tarea.prioridad
            );

            setEstado(
                tarea.estado
            );

            setFechaLimite(
                tarea.fechaLimite
                    ?.split("T")[0] ||
                tarea.fechaLimite
            );

            setProyectoId(
                tarea.proyectoId
            );

            setResponsableId(
                tarea.responsableId
            );

        } catch (error) {

            console.error(
                error
            );

        }

    }

    async function handleSubmit(
        e
    ) {

        e.preventDefault();

        try {

            await updateTarea(

                id,

                {

                    titulo,

                    descripcion,

                    prioridad,

                    estado,

                    fechaLimite,

                    proyectoId,

                    responsableId

                }

            );

            navigate(
                `/tareas/${id}`
            );

        } catch (
        error
        ) {

            console.error(
                error
            );

        }

    }

    return (

        <MainLayout>

            <h1>
                Editar tarea
            </h1>

            <form
                onSubmit={
                    handleSubmit
                }
            >
                <div>

                    <label>
                        Título
                    </label>

                    <br />

                    <input
                        value={titulo}
                        onChange={e =>
                            setTitulo(
                                e.target.value
                            )
                        }
                    />

                </div>

                <br />

                <div>

                    <label>
                        Descripción
                    </label>

                    <br />

                    <textarea
                        value={
                            descripcion
                        }
                        onChange={e =>
                            setDescripcion(
                                e.target.value
                            )
                        }
                    />

                </div>

                <br />

                <div>

                    <label>
                        Prioridad
                    </label>

                    <br />

                    <select
                        value={
                            prioridad
                        }
                        onChange={e =>
                            setPrioridad(
                                e.target.value
                            )
                        }
                    >

                        <option value="baja">
                            Baja
                        </option>

                        <option value="media">
                            Media
                        </option>

                        <option value="alta">
                            Alta
                        </option>

                        <option value="critica">
                            Crítica
                        </option>

                    </select>

                </div>

                <br />

                <div>

                    <label>
                        Estado
                    </label>

                    <br />

                    <select
                        value={estado}
                        onChange={e =>
                            setEstado(
                                e.target.value
                            )
                        }
                    >

                        <option value="pendiente">
                            Pendiente
                        </option>

                        <option value="en_progreso">
                            En progreso
                        </option>

                        <option value="bloqueada">
                            Bloqueada
                        </option>

                        <option value="finalizada">
                            Finalizada
                        </option>

                        <option value="cancelada">
                            Cancelada
                        </option>

                    </select>

                </div>

                <br />

                <div>

                    <label>
                        Fecha límite
                    </label>

                    <br />

                    <input
                        type="date"
                        value={
                            fechaLimite
                        }
                        onChange={e =>
                            setFechaLimite(
                                e.target.value
                            )
                        }
                    />

                </div>

                <br />

                <div>

                    <label>
                        Responsable ID
                    </label>

                    <br />

                    <input
                        type="number"
                        value={
                            responsableId
                        }
                        onChange={e =>
                            setResponsableId(
                                Number(
                                    e.target.value
                                )
                            )
                        }
                    />

                </div>

                <br />

                <button
                    type="submit"
                >

                    Guardar cambios

                </button>

            </form>

        </MainLayout>

    );

}