describe('Pollsage Polls', () => {
    it('Creates a new poll', () => {
      cy.visit('/');
      cy.get('input[name="question"]').type('Favorite Color?');
      cy.get('input[name="options"]').type('Red, Blue, Green');
      cy.get('button[type="submit"]').click();
      // Assert that the new poll is visible on the page
      cy.contains('Favorite Color?');
    });
  });