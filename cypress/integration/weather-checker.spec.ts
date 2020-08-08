import { WeatherChecker } from '../support/app-object/weather-checker';
import * as moment from 'moment';



describe('Feature: Weather Checker', () => {
    let app: WeatherChecker;
    
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

    describe.only('Scenario: Valid postcode', () => {
        beforeEach(() => {
            cy.server({});
            cy.route('POST', '/api', 'fixture:valid-postcode.json').as('validPostcode');

            app.searchLocationForm().within(() => {
                cy.get('input').type('W6 0NW');
                cy.contains('Search').click();
            });
        });
        describe('When a valid postcode is entered "W6 0NW" that exists', () => {
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


    // describe('Scenario: Invalid postcode', () => {
    //     describe('When an invalid postcode is entered "EC1A 1BB"', () => {
    //         it('Then there is an error message "Postcode not valid."', () => {


    //         });
    //     });
    // });


    // describe('Scenario: Valid postcodes that isn\'t found', () => {
    //     describe('When a valid postcode is entered that isn\'t found', () => {
    //         it('Then there is a message "Postcode not found!"', () => {


    //         });
    //     });
    // });

});