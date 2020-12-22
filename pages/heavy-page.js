import { formatBytesAsKb } from "../shared/formatBytesAsKb";
import { generateCargo } from "../shared/generateCargo";

export default function HeavyPage({ message, cargo }) {
  return (
    <div>
      <div>{message}</div>
      <div style={{ visibility: "hidden" }}>{cargo}</div>
    </div>
  );
}

export function getServerSideProps(req) {
  let uncompressedHttpBodySize =
    req.query.uncompressedHttpBodySize ?? 1024 * 10;

  const message = `Approx uncompressed http body size: ${uncompressedHttpBodySize} B (${formatBytesAsKb(
    uncompressedHttpBodySize
  )} KB)`;

  const wrapperHtmlLength = process.env.NODE_ENV === "production" ? 1935 : 1707; // calculated imperially by setting message and cargo to "", then rendering the page
  const cargoLength = Math.floor(
    (uncompressedHttpBodySize - message.length * 2 - wrapperHtmlLength) / 2 -
      `${uncompressedHttpBodySize}`.length
  );
  const cargo = generateCargo(cargoLength);

  return {
    props: {
      message,
      cargo,
    },
  };
}
