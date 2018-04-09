// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('loginToGitHub', () => {
  cy.visit('https://github.com/login');

  cy.url().then((url) => {
    if (url.match(/login/)) {
      cy.get('#login_field').type(Cypress.env('GITHUB_USERNAME'));
      cy.get('#password').type(Cypress.env('GITHUB_PASSWORD'));
      cy.get('.btn[value="Sign in"]').click();
    } else {
      return;
    }
  });
});
