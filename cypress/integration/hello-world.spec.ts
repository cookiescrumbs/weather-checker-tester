describe('When I visit the Weather Checker', () => {
    it('Then I see a header "Weather Checker"', () => {
        cy.visit('/');
        cy.get('h2.header').should('contain','Weather Checker');
    });
});