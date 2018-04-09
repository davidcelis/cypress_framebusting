describe('Local OAuth Client', function() {
  it('can be created', function() {
    cy.visit('/oauth_clients/1');
    cy.get('[data-cy="authorize-oauth-client-link"]').click();

    // The button stays disabled for a second or two
    cy.wait(3000);

    cy.get('button[name="authorize"]').click();

    cy.get('[data-cy="access-token"]').should('not.be.empty');
  });
});
