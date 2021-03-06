import * as React from "react";
import { formatBytesAsKb } from "../shared/formatBytesAsKb";

const minUncompressedHttpBodySize = 1024 * 2;
const suggestedUncompressedHttpBodySizes = [
  1024 * 16,
  1024 * 32,
  1024 * 64,
  1024 * 128,
];

function customParseInt(value) {
  const r = parseInt(value, 10);
  return `${r}` === value ? r : NaN;
}

function Opener({ title, pathname, uncompressedHttpBodySize, doubleEndCall }) {
  const targetUrl = `${pathname}?uncompressedHttpBodySize=${uncompressedHttpBodySize}`;
  return (
    <div>
      {title}: <a href={targetUrl}>immediately</a> /{" "}
      <a
        href={`/api/redirect?to=${encodeURIComponent(targetUrl)}${
          doubleEndCall ? "&doubleEndCall=true" : ""
        }`}
      >
        via redirect
      </a>
    </div>
  );
}

export default function Index() {
  const [
    rawUncompressedHttpBodySize,
    setRawUncompressedHttpBodySize,
  ] = React.useState(`${suggestedUncompressedHttpBodySizes[0]}`);

  const [doubleEndCall, setDoubleEndCall] = React.useState(false);

  const uncompressedHttpBodySize = customParseInt(rawUncompressedHttpBodySize);

  return (
    <div>
      <h1>Testing subsequent request hanging</h1>
      <p>
        <label>Uncompressed http body size:</label>
        <br />
        <input
          value={rawUncompressedHttpBodySize}
          onChange={(e) => {
            setRawUncompressedHttpBodySize(e.target.value);
          }}
        />{" "}
        ({formatBytesAsKb(uncompressedHttpBodySize)} KB)
      </p>
      <p>
        {suggestedUncompressedHttpBodySizes.map((suggestedSize) => (
          <React.Fragment key={suggestedSize}>
            <span
              title={`${suggestedSize} bytes`}
              style={{ borderBottom: "1px dotted", cursor: "pointer" }}
              onClick={() => {
                setRawUncompressedHttpBodySize(`${suggestedSize}`);
              }}
            >
              {formatBytesAsKb(suggestedSize)} KB
            </span>{" "}
          </React.Fragment>
        ))}
      </p>
      <div>
        <input
          type="checkbox"
          checked={doubleEndCall}
          onChange={() => setDoubleEndCall(!doubleEndCall)}
        />{" "}
        <label>Call res.end() after res.redirect() in /api/redirect</label>
      </div>
      {uncompressedHttpBodySize < minUncompressedHttpBodySize ? (
        <p>Value should be greater than {minUncompressedHttpBodySize} B</p>
      ) : (
        <p>
          <Opener
            title="open heavy page"
            pathname="/heavy-page"
            uncompressedHttpBodySize={uncompressedHttpBodySize}
            doubleEndCall={doubleEndCall}
          />
          <Opener
            title="open heavy api handler"
            pathname="/api/heavy-handler"
            uncompressedHttpBodySize={uncompressedHttpBodySize}
            doubleEndCall={doubleEndCall}
          />
        </p>
      )}
    </div>
  );
}
