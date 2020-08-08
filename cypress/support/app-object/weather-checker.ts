import { AppObject } from './app-object';

export class WeatherChecker extends AppObject { 

    constructor() { 
        const path: string = '/';
        super(path);
    }

    public header(): Cypress.Chainable<JQuery> { 
       return cy.get('h2.header');
    }

    public searchLocationForm(): Cypress.Chainable<JQuery> {
        return cy.get('#searchLocation');
    }

    public weatherDetails(): Cypress.Chainable<JQuery> { 
        return cy.get('table');
    }
}