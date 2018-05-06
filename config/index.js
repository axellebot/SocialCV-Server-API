"use strict";

/**
 * Handle config thanks to the NODE_ENV var
 * @namespace handle config
 */

/**
 * Require the right config name according to the NODE_ENV variables
 * @return {string} A Point object.
 * @memberof handle config
 */
 
function requiredProcessEnv() {
    console.info("Requiring Process Env");
    if (process.env.NODE_ENV === "prod") {
        process.env.NODE_ENV = "production";
    }else if (process.env.NODE_ENV === "dev") {
        process.env.NODE_ENV = "development";
    } else if (process.env.NODE_ENV === "test") {
        process.env.NODE_ENV = "test";
    } else {
        process.env.NODE_ENV = "development";
    }
    console.info(process.env.NODE_ENV, "env will be required");
    return process.env.NODE_ENV;
}

//Require the right configuration file
var config = require('./' + requiredProcessEnv());

module.exports = config;