
import express  from 'express';
import * as bodyParser from 'body-parser';
import { update } from './dailyUpdate';
import { apiRouter } from './api-routes';
require('dotenv').config()

var app = express();
var jsonParser = bodyParser.json() ;

app.use(jsonParser);

app.use(apiRouter);

app.listen(process.env.PORT , function () {
});

const cron = require("node-cron");
cron.schedule("* 3 * * *", async ()=>{
  console.log("Scheduler running");
  update();
});