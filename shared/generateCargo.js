export const generateCargo = (cargoLength) =>
  Array.from(Array(cargoLength))
    .map(() => `${Math.random()}`[2])
    .join("");
