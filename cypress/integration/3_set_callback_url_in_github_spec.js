describe('GitHub OAuth App', function() {
  before(function() {
    cy.loginToGitHub();
  });

  it('can have the correct callback URL set', function() {
    cy.visit('https://github.com/settings/developers');
    cy.get(`a:contains("${Cypress.config('baseUrl')}")`).click();

    cy.readFile('cypress/fixtures/github_callback_url.txt').then((callbackUrl) => {
      cy.get('#oauth_application_callback_url').clear().type(callbackUrl);
    });

    cy.get('button:contains("Update application")').click();
  });
});
