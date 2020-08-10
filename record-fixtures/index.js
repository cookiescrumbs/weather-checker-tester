#!/usr/bin/env node

const newman = require('newman'),
fs = require('fs'),
md5 = require('crypto-js/md5');

const fixturesFolderPath = 'cypress/fixtures';

newman.run({
    collection: require('./weather-app-api.postman_collection'),
    reporters: 'cli'
}).on('request', function (error, args) {
    const requestBody = args.request.body.raw.replace(/\n|\s/g, '');
    const fixtureFileName = md5(`${args.request.method}${requestBody}${args.request.url.path[0]}`);
    if (error) {
        console.error(error);
    }
    else {
        fs.writeFile(`${fixturesFolderPath}/${fixtureFileName}.json`, args.response.stream, function (error) {
            if (error) { 
                console.error(error); 
            }
        });        
    }
});