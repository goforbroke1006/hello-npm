module.exports = {
    isTMNT: function (yourName) {
        if (typeof yourName != 'string') return false;

        var names = ['leonardo', 'donatello', 'raphael', 'michaelangelo'],
            res = false;
        names.some(function (el, i) {
            if (yourName.toLowerCase() == el.toLowerCase()) {
                res = true;
                return true;
            }
        });

        return res;
    }
};