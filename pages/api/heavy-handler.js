import { generateCargo } from "../../shared/generateCargo";

export default (req, res) => {
  const cargoLength = parseInt(req.query.expectedHttpBodySize) || 1000;
  const cargo = generateCargo(cargoLength);
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write(cargo);
  res.end();
};
