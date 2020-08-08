Feature: Weather Feature

Scenario: Header
When you visit the entry page
Then there is a heading "Weather Checker"

Scenario: Valid postcodes 
When a valid postcode is entered "W6 0NW" that exists
Then there will be a table that contains the time in the format "DD/MM/YYYY HH:mm:ss"
And the Temperature
And the Humidity

Scenario: Invalid postcodes
When an invalid postcode is entered "EC1A 1BB"
Then there is an error message "Postcode not valid."

Scenario: Valid postcodes that isn't found
When a valid postcode is entered that isn't found "B99 9AA"
Then there is a message "Postcode not found!"
