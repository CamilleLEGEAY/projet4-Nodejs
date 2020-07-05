"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateServices = void 0;
class DateServices {
    formatDate(date) {
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth() + 1).toString();
        var dd = date.getDate().toString();
        return yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]);
    }
    yesterday(date) {
        let yesterday = new Date(date);
        yesterday.setDate(yesterday.getDate() - 1);
        return this.formatDate(yesterday);
    }
    daysAgo(date, daysInDB) {
        let daysAgo = new Date(date);
        daysAgo.setDate(daysAgo.getDate() - (daysInDB + 1));
        return this.formatDate(daysAgo);
    }
}
exports.DateServices = DateServices;
