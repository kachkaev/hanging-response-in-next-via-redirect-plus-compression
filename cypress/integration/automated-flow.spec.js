/// <reference types="cypress" />

import { formatBytesAsKb } from "../../shared/formatBytesAsKb";

Cypress.config("pageLoadTimeout", 5 * 1000);

const cases = [
  ["/heavy-page", 1024 * 100, 1024 * 100],
  ["/heavy-page", 1024 * 16, 1024 * 32],
  ["/heavy-page", 1024 * 16, 1024 * 64],
  ["/heavy-page", 1024 * 64, 1024 * 16],
  ["/api/heavy-handler", 1024 * 16, 1024 * 16],
  ["/api/heavy-handler", 1024 * 16, 1024 * 32],
  ["/api/heavy-handler", 1024 * 16, 1024 * 64],
  ["/api/heavy-handler", 1024 * 64, 1024 * 16],
];

const generateTest = (
  pathname,
  uncompressedHttpBodySize1,
  uncompressedHttpBodySize2
) => {
  it(`${pathname} ${formatBytesAsKb(
    uncompressedHttpBodySize1
  )} KB, then ${formatBytesAsKb(uncompressedHttpBodySize2)} KB`, () => {
    cy.visit(
      `${pathname}?uncompressedHttpBodySize=${uncompressedHttpBodySize1}`
    );
    cy.visit(
      `${pathname}?uncompressedHttpBodySize=${uncompressedHttpBodySize2}`
    );
    cy.wait(10000); // page load timeout / cool-off period between tests
  });
};

context("Automated flow", () => {
  cases.forEach((args) => generateTest(...args));
});
