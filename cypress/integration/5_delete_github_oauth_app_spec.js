describe('GitHub OAuth App', function() {
  before(function() {
    cy.loginToGitHub();
  });

  it('can be deleted as a part of the teardown process', function() {
    cy.visit('https://github.com/settings/developers');
    cy.get(`a:contains("${Cypress.config('baseUrl')}")`).click();
    cy.get('#cancel_info form button[type="submit"]').click({ force: true });

    // Also reset the local database because we always expect to be working with
    // an OAuthClient with an ID of 1.
    cy.exec('rails db:reset');
  });
});
