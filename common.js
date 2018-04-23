"use strict";

/**
 * Chec is number
 * @param str
 * @returns {boolean}
 */
module.exports.isNumber = function (str) {
    return str === parseFloat(str).toString();
};

/**
 * Check object has key like "0", "1", ..., "n" or not
 * @param {Object} obj
 * @returns {boolean}
 */
module.exports.objectCanBeArray = function (obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] !== i.toString()) {
            return false;
        }
    }
    return true;
};