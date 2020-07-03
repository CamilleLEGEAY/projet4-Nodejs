"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyAppConfig = void 0;
class MyAppConfig {
    constructor() {
        this.dbName = "etablissements";
        this.mongoDbUrl = 'mongodb://127.0.0.1:27017/' + this.dbName;
    }
}
exports.MyAppConfig = MyAppConfig;
