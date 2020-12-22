import { formatBytesAsKb } from "../shared/formatBytesAsKb";

const redirects = [
  ["/heavy-page", 1024 * 8],
  ["/heavy-page", 1024 * 16 - 64],
  ["/heavy-page", 1024 * 16],
  ["/heavy-page", 1024 * 32],
  ["/heavy-page", 1024 * 64],
  ["/api/heavy-handler", 1024 * 8],
  ["/api/heavy-handler", 1024 * 16 - 64],
  ["/api/heavy-handler", 1024 * 16],
  ["/api/heavy-handler", 1024 * 32],
  ["/api/heavy-handler", 1024 * 64],
];

export default function Index() {
  return (
    <div>
      <h1>Testing redirects</h1>
      <ul>
        {redirects.map(([targetPath, expectedHttpBodySize], index) => {
          const targetUrl = `${targetPath}?expectedHttpBodySize=${expectedHttpBodySize}`;
          return (
            <li key={index}>
              <a href={targetUrl}>direct</a> •{" "}
              <a href={`/api/redirect?to=${encodeURIComponent(targetUrl)}`}>
                via redirect
              </a>{" "}
              • {targetPath}{" "}
              <span>{formatBytesAsKb(expectedHttpBodySize)} KB</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
