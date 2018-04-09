describe('GitHub OAuth App', function() {
  before(function() {
    cy.loginToGitHub();
  });

  it('can be created', function() {
    // Create an OAuth App
    cy.visit('https://github.com/settings/applications/new');
    cy.get('#oauth_application_name').type(Cypress.config('baseUrl'));
    cy.get('#oauth_application_url').type(Cypress.config('baseUrl'));
    cy.get('#oauth_application_callback_url').type(Cypress.config('baseUrl')); // Temporary
    cy.get('button:contains("Register application")').click();

    // Get settings, save globally
    cy.get('.oauth-app-info-container .keys > dd:nth-of-type(1)').invoke('text').then((clientId) => {
      cy.writeFile('cypress/fixtures/github_client_id.txt', clientId);
      cy.get('.oauth-app-info-container .keys > dd:nth-of-type(2)').invoke('text').then((clientSecret) => {
        cy.writeFile('cypress/fixtures/github_client_secret.txt', clientSecret);
      });
    });
  });
});
