function canTransition(
  actual,
  nuevo
) {

  const transitions = {

    activo: [
      "pausado",
      "finalizado"
    ],

    pausado: [
      "activo",
      "finalizado"
    ],

    finalizado: []

  };

  return transitions[actual]
    ?.includes(nuevo);

}

module.exports = {
  canTransition
};