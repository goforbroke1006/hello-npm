"use strict";

let isNumber = require("./common").isNumber;
let objectCanBeArray = require("./common").objectCanBeArray;

/**
 * Parse URL string to object
 * @param {String} url
 * @returns {{schema: string, host: string, port: number, path: string, query: string, params: Object}}
 */
function parseUrl(url) {
    if (url.indexOf('://') === -1 || url.indexOf(" ") >= 0)
        return {};

    let obj = {
        schema: url.substr(0, url.indexOf('://')),
        host: "",
        port: 0,
        path: "",
        query: "",
        params: {}
    };

    const p = url.indexOf("://");
    const tmp1 = url.substr(p + 3);
    const hostPort = tmp1.substr(0, tmp1.indexOf("/"));
    const hpd = hostPort.indexOf(":");
    if (hpd >= 0) {
        obj.host = hostPort.substr(0, hpd);
        obj.port = parseInt(hostPort.substr(hpd + 1));
    } else
        obj.host = hostPort;

    const pss = tmp1.indexOf("/");
    obj.path = tmp1.substr(pss, tmp1.indexOf("?") - pss || null);

    url.substr(url.indexOf("?") + 1).split("&").forEach(function (value) {
        value = value.replace(/%5D%5B/g, ".").replace(/%5B/g, ".").replace(/%5D/g, "");
        parseParam(obj.params, value);
    });

    return obj;
}

/**
 *
 * @param {Object} holder
 * @param {String} paramStr
 */
function parseParam(holder, paramStr) {
    let name;
    if (paramStr.indexOf('.') >= 0) {
        name = paramStr.substr(0, paramStr.indexOf('.'));
        if (!holder.hasOwnProperty(name)) holder[name] = {};
        parseParam(
            holder[name],
            paramStr.substr(paramStr.indexOf('.') + 1)
        );
        if (objectCanBeArray(holder[name])) {
            // holder[name] = Object.values(holder[name]);
            holder[name] = Object.keys(holder[name]).map(function (key) {
                return holder[name][key];
            });
        }
    } else {
        name = paramStr.substr(0, paramStr.indexOf('='));
        let val = paramStr.substr(paramStr.indexOf('=') + 1);

        if (val === "") val = null;
        if (isNumber(val)) val = parseFloat(val);

        holder[name] = val;
    }
}

class URL {
    constructor(resourceLocator) {
        let obj = parseUrl(resourceLocator);
        Object.assign(this, obj);
    }
}

module.exports.URL = URL;