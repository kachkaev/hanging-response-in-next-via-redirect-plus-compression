import { generateCargo } from "../../shared/generateCargo";

export default (req, res) => {
  const cargoLength = parseInt(req.query.uncompressedHttpBodySize) || 1000;
  const cargo = generateCargo(cargoLength);
  res.writeHead(200, {
    "Content-Type": "text/html",
    "Content-Length": cargoLength,
  });
  res.write(cargo);
  res.end();
};
