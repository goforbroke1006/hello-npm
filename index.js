/**
 * Parse URL string to object
 * @param {String} url
 * @returns null|{{schema: string, host: string, path: string, query: string, params: Array}}
 */
var parseUrl = function (url) {
    if (url.indexOf('://') === -1 || url.indexOf(" ") >= 0)
        return null;

    var obj = {
        schema: url.substr(0, url.indexOf('://')),
        host: "",
        port: "",
        path: "",
        query: "",
        params: {}
    };

    var p = url.indexOf("://");
    var tmp1 = url.substr(p + 3);
    var hostPort = tmp1.substr(0, tmp1.indexOf("/"));
    var hpd = hostPort.indexOf(":");
    if (hpd >= 0) {
        obj.host = hostPort.substr(0, hpd);
        obj.port = hostPort.substr(hpd + 1);
    } else
        obj.host = hostPort;

    var pss = tmp1.indexOf("/");
    obj.path = tmp1.substr(pss, tmp1.indexOf("?") - pss || null);

    url.substr(url.indexOf("?") + 1).split("&").forEach(function (value, index) {
        value = value.replace(/%5D%5B/g, ".").replace(/%5B/g, ".").replace(/%5D/g, "");
        parseParam(obj.params, value);
    });

    return obj;
};

/**
 * Check object has key like "0", "1", ..., "n" or not
 * @param {Object} obj
 * @returns {boolean}
 */
var objectCanBeArray = function (obj) {
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
        if (keys[i] !== i.toString()) {
            return false;
        }
    }
    return true;
};

/**
 *
 * @param {Object} holder
 * @param {String} paramStr
 */
function parseParam(holder, paramStr) {
    var name;
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
        var val = paramStr.substr(paramStr.indexOf('=') + 1);

        if (val === "") val = null;
        if (isNumber(val)) val = parseFloat(val);

        holder[name] = val;
    }
}

var isNumber = function (str) {
    return str === parseFloat(str).toString();
};

module.exports = {
    isTMNT: function (yourName) {
        if (typeof yourName !== 'string') return false;

        var names = ['leonardo', 'donatello', 'raphael', 'michaelangelo'],
            res = false;
        names.some(function (el, i) {
            if (yourName.toLowerCase() === el.toLowerCase()) {
                res = true;
                return true;
            }
        });

        return res;
    },
    parseUrl: parseUrl,
    isNumber: isNumber,
    objectCanBeArray: objectCanBeArray,
};

String.prototype.parseUrl = function () {
    return parseUrl(this)
};