import api from "./axios";

export function getProyectos() {

  return api.get(
    "/proyectos"
  );

}

export function getProyecto(id) {

  return api.get(
    `/proyectos/${id}`
  );

}

export function createProyecto(data) {

  return api.post(
    "/proyectos",
    data
  );

}

export function updateProyecto(
  id,
  data
) {

  return api.put(
    `/proyectos/${id}`,
    data
  );

}

export function setIntegrantesProyecto(
  id,
  integrantes
) {

  return api.patch(
    `/proyectos/${id}/integrantes`,
    { integrantes }
  );

}

export function deleteProyecto(id) {

  return api.delete(
    `/proyectos/${id}`
  );

}
