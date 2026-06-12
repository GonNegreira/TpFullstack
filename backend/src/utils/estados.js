const transitions = {

  pendiente: [
    "en_progreso",
    "cancelada"
  ],

  en_progreso: [
    "bloqueada",
    "finalizada",
    "cancelada"
  ],

  bloqueada: [
    "en_progreso",
    "cancelada"
  ],

  finalizada: [],

  cancelada: []
};

function canTransition(
  currentState,
  newState
) {

  return (
    transitions[currentState]
      ?.includes(newState)
  );
}

module.exports = {
  transitions,
  canTransition
};