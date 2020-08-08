Feature: Weather Feature

@FE
Scenario: Header
When you visit the entry page
Then there is a heading "Weather Checker"

@FE
Scenario: Valid postcodes 
When a valid postcode is entered "W6 0NW" that exists
Then there will be a table that contains the time in the format DD/MM/YYYY HH:mm:ss
And the Temperature
And the Humidity

@FE @BE
Scenario: invalid postcodes
When an invalid postcode is entered "EC1A 1BB"
Then there is an error message "Postcode not valid."

@FE @BE
Scenario: Valid postcodes that isn't found
When a valid postcode is entered that isn't found
Then there is a message "Postcode not found!"
