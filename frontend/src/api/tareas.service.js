import api from "./axios";

export function getTareas(
  params = {}
) {

  return api.get(
    "/tareas",
    {
      params
    }
  );

}

export function getTarea(
  id
) {

  return api.get(
    `/tareas/${id}`
  );

}

export function createTarea(
  data
) {

  return api.post(
    "/tareas",
    data
  );

}

export function getHistorialTarea(id) {
  return api.get(`/tareas/${id}/historial`);
}

export function updateTarea(
  id,
  data
) {

  return api.put(
    `/tareas/${id}`,
    data
  );

}

export function iniciarTarea(id) {
  return api.patch(`/tareas/${id}/iniciar`);
}
export function bloquearTarea(id) {
  return api.patch(`/tareas/${id}/bloquear`);
}
export function cancelarTarea(id) {
  return api.patch(`/tareas/${id}/cancelar`);
}
export function finalizarTarea(id) {
  return api.patch(`/tareas/${id}/finalizar`);
}
