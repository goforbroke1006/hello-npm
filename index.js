"use strict";

require("./http-foundation");
require("./common");

/**
 * Check subject is TMNT
 * @param {String} yourName
 * @returns {boolean}
 */
module.exports.isTMNT = function (yourName) {
    if (typeof yourName !== 'string') return false;

    const names = ['leonardo', 'donatello', 'raphael', 'michaelangelo'];
    let res = false;
    names.some(function (el) {
        if (yourName.toLowerCase() === el.toLowerCase()) {
            res = true;
            return true;
        }
    });

    return res;
};