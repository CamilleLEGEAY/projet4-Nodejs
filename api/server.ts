import express  from 'express';
import * as bodyParser from 'body-parser';
import { apiRouter } from './entreprise-api-routes';

var app = express();

//support parsing of JSON post data
var jsonParser = bodyParser.json() ;
app.use(jsonParser);

//les routes en /html/... seront gérées par express
//par de simples renvois des fichiers statiques du répertoire "./html"
app.use('/html', express.static(__dirname + "/html"));

app.get('/', function (req, res) {
    res.redirect('/html/index.html');
});
app.use(apiRouter); //delegate REST API routes to apiRouter(s)


app.listen(9998 , function () {
  console.log("http://localhost:9998");
});