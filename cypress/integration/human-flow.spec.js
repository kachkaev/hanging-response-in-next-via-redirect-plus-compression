/// <reference types="cypress" />

import { formatBytesAsKb } from "../../shared/formatBytesAsKb";

Cypress.config("pageLoadTimeout", 5 * 1000);

const coveredUncompressedHttpBodySizes = [
  //
  // 1024 * 16,
  // 1024 * 32,
  1024 * 64,
];

const generateTest = (what, how, uncompressedHttpBodySize) => {
  it(`${what} ${how} ${formatBytesAsKb(uncompressedHttpBodySize)} KB`, () => {
    cy.visit("/");
    cy.wait(5000); // cool-off period after page load
    cy.get("input").type(`{selectall}${uncompressedHttpBodySize}`);
    cy.contains(what).contains(how).click();
    cy.wait(10000); // page load timeout / cool-off period between tests
  });
};

context("Human flow", () => {
  coveredUncompressedHttpBodySizes.forEach((uncompressedHttpBodySize) => {
    // generateTest(
    //   "open heavy page",
    //   "immediately",
    //   uncompressedHttpBodySize //
    // );
    generateTest(
      "open heavy page",
      "via redirect",
      uncompressedHttpBodySize //
    );
    // generateTest(
    //   "open heavy api handler",
    //   "immediately",
    //   uncompressedHttpBodySize //
    // );
    generateTest(
      "open heavy api handler",
      "via redirect",
      uncompressedHttpBodySize //
    );
  });
});
