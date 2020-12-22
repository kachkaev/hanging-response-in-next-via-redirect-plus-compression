import { formatBytesAsKb } from "../shared/formatBytesAsKb";
import { generateCargo } from "../shared/generateCargo";

export default function HeavyPage({ expectedHttpBodySize }) {
  const message = `Expected body size: ${expectedHttpBodySize} B (${formatBytesAsKb(
    expectedHttpBodySize
  )} KB)`;

  const wrapperHtmlLength = process.env.NODE_ENV === "production" ? 1935 : 1694; // calculated imperially by setting message and cargo to "", then rendering the page
  const cargoLength = expectedHttpBodySize - message.length - wrapperHtmlLength;
  const cargo = generateCargo(cargoLength);

  return (
    <div>
      <div>{message}</div>
      <div style={{ display: "none" }}>{cargo}</div>
    </div>
  );
}

export function getServerSideProps(req) {
  let expectedHttpBodySize = req.query.expectedHttpBodySize;
  return {
    props: {
      expectedHttpBodySize: expectedHttpBodySize ?? 1024 * 10,
    },
  };
}
