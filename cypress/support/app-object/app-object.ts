export class AppObject {
    private _path: string;

    constructor(path: string) { 
        this._path = path;
    }

    public visit(): void{ 
        cy.visit(this._path);
    }

    public body(): Cypress.Chainable<JQuery> {
        return cy.get('body');
    }
}