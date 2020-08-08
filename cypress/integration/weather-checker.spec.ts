import { WeatherChecker } from '../support/app-object/weather-checker';
import * as moment from 'moment';

describe('Feature: Weather Checker', () => {
    let app: WeatherChecker;
    const validPostcode: string = 'W6 0NW';
    const invalidPostcode: string = 'EC1A 1BB';
    const validNoneExistingPostcode: string = 'B99 9AA';
    
    beforeEach(() => {
        app = new WeatherChecker();
        app.visit();
    });

    describe('Scenario: Header', () => {
        describe('When you visit the entry page', () => {
            it('Then there is a heading "Weather Checker"', () => {
                app.header().should('contain','Weather Checker');
            });
        });
    });

    describe('Scenario: Valid postcode', () => {
        describe('When a valid postcode is entered "W6 0NW" that exists', () => {
            beforeEach(() => {
                cy.server({});
                cy.route('POST', '/api', 'fixture:valid-postcode.json').as('validPostcode');
    
                app.searchLocationForm().within(() => {
                    cy.get('input').type(validPostcode);
                    cy.contains('Search').click();
                });
            });
            describe(`Then there will be a table that contains the 
            time in the format DD/MM/YYYY HH:mm:ss`, () => {
                describe('And the Temperature', () => {
                    it('And the Humidity', () => {
                        cy.wait('@validPostcode')
                        .then((xhr: any) => { // would use a shared type definition with the BE here
                            const currently =  xhr.responseBody.currently;
                            const timestamp =  currently.time;
                            const temperature = currently.temperature;
                            const humidity = currently.humidity;
                            const formattedDateTime = moment.unix(timestamp).format('DD/MM/YYYY HH:mm:ss');

                            app.weatherDetails().should('contain', formattedDateTime);
                            app.weatherDetails().should('contain', temperature);
                            app.weatherDetails().should('contain', humidity);
                        });
                    });
                });
            });
        });
    });


    describe('Scenario: Invalid postcode', () => {
        describe('When an invalid postcode is entered "EC1A 1BB"', () => {
            beforeEach(() => {
                cy.server({});
                cy.route({
                    method: 'POST',
                    url: '/api',
                    status: 433,
                    response: {"errorMessage":"Problem with Geocode API: Unable to find that address."}
                    
                });
                app.searchLocationForm().within(() => {
                    cy.get('input').type(invalidPostcode);
                    cy.contains('Search').click();
                });
            });
            it('Then there is an error message "Postcode not valid."', () => {
                app.body().should('contain', 'Postcode not valid.');
            });
        });
    });


    describe('Scenario: Valid postcode that isn\'t found', () => {
        describe('When a valid postcode is entered that isn\'t found "B99 9AA"', () => {
            beforeEach(() => {
                app.searchLocationForm().within(() => {
                    cy.server({});
                    cy.route({
                        method: 'POST',
                        url: '/api',
                        status: 433,
                        response: { "errorMessage": "Problem with Geocode API: Unable to find that address." }
                    });
                    cy.get('input').type(validNoneExistingPostcode);
                    cy.contains('Search').click();
                });
            });
            it('Then there is a message "Postcode not found!"', () => {
                app.body().should('contain', 'Postcode not found!');
            });
        });
    });

});