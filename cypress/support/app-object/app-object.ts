export class AppObject {
    private _path: string;

    constructor(path: string) { 
        this._path = path;
    }
    public visit(): void{ 
        cy.visit(this._path);
    }

}