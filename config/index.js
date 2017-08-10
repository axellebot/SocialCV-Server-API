"use strict";

/**
 * Handle config thanks to the NODE_ENV var
 * @namespace handle config
 */

'use strict';

/**
 * Require the right config name according to the NODE_ENV variables
 * @return {string} A Point object.
 * @memberof handle config
 */
function requiredProcessEnv() {
    console.log("Requiring Process Env");
    if (process.env.NODE_ENV === "prod") {
        process.env.NODE_ENV = "production";
    }

    if (process.env.NODE_ENV === "test") {
        process.env.NODE_ENV = "testing";
    }

    if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = "testing"
    }
    console.log(process.env.NODE_ENV, "env required");
    return process.env.NODE_ENV;
}

//Require the right configuration file
var config = require('./' + requiredProcessEnv());

module.exports = config;
