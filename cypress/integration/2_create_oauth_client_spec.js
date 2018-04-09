describe('Local OAuth Client', function() {
  it('can be created', function() {
    // Create an OAuth App
    cy.visit('/oauth_clients/new');
    cy.readFile('cypress/fixtures/github_client_id.txt').then((clientId) => {
      cy.get('[data-cy="client-id-field"]').type(clientId);
    });
    cy.readFile('cypress/fixtures/github_client_secret.txt').then((clientSecret) => {
      cy.get('[data-cy="client-secret-field"]').type(clientSecret);
    });
    cy.get('[data-cy="submit"]').click();

    cy.get('[data-cy="callback-url"]').invoke('text').then((callbackUrl) => {
      cy.writeFile('cypress/fixtures/github_callback_url.txt', callbackUrl);
    });
  });
});
