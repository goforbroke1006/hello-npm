/**
 * Created by SCherk01 on 21.07.17.
 */

exports.isTMNT = function (yourName) {
    var names = ['leonardo', 'donatello', 'raphael', 'michaelangelo'],
        res = false;
    names.some(function (el, i) {
        if (yourName.toLowerCase() == el.toLowerCase()) {
            res = true;
            return true;
        }
    });

    return res;
};