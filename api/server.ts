import express  from 'express';
import * as bodyParser from 'body-parser';
import { update } from './dailyUpdate';
import { apiRouter } from './api-routes';

var app = express();
var jsonParser = bodyParser.json() ;

app.use(jsonParser);

app.use(apiRouter);

app.listen(9998 , function () {
  console.log("http://localhost:9998");
});

const cron = require("node-cron");
cron.schedule("* 3 * * *", async ()=>{
  console.log("Scheduler running");
  update();
});