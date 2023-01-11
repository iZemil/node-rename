'use strict';
module.exports = {
    handler: function (text) {
        return text.replace(/\d+\./gi, '');
    },
};
