"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const bodyParser = tslib_1.__importStar(require("body-parser"));
const dailyUpdate_1 = require("./dailyUpdate");
const api_routes_1 = require("./api-routes");
require('dotenv').config();
var app = express_1.default();
var jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(api_routes_1.apiRouter);
app.listen(process.env.PORT, function () {
});
const cron = require("node-cron");
cron.schedule("* 3 * * *", async () => {
    console.log("Scheduler running");
    dailyUpdate_1.update();
});
