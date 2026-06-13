import api from "./axios";

export function getUsuarios() {
  return api.get("/usuarios");
}