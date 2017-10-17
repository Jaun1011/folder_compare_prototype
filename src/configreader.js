'use strict';

const fs = require('fs');

/**
 * JSON files cant be loaded over the require way.
 * You have to load it over fs..
 * @param path
 */
function loadConfigFile(path) {
    let config = fs.readFileSync(path).toString();
    return JSON.parse(config);
}

module.exports = {
    loadConfigFile: loadConfigFile
};