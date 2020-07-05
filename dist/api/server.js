"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const bodyParser = tslib_1.__importStar(require("body-parser"));
const dailyUpdate_1 = require("./dailyUpdate");
var app = express_1.default();
var jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(dailyUpdate_1.apiRouter);
app.listen(9998, function () {
    console.log("http://localhost:9998");
});
const cron = require("node-cron");
let shell = require("shelljs");
//cron.schedule("*/2 * * * *", async () => this.servicesManager.startPoll()
cron.schedule("* * * * *", async () => {
    console.log("Scheduler running");
    dailyUpdate_1.update();
});
