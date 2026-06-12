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

export function updateTarea(
  id,
  data
) {

  return api.put(
    `/tareas/${id}`,
    data
  );

}

