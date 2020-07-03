"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const bodyParser = tslib_1.__importStar(require("body-parser"));
const entreprise_api_routes_1 = require("./entreprise-api-routes");
var app = express_1.default();
//support parsing of JSON post data
var jsonParser = bodyParser.json();
app.use(jsonParser);
//les routes en /html/... seront gérées par express
//par de simples renvois des fichiers statiques du répertoire "./html"
app.use('/html', express_1.default.static(__dirname + "/html"));
app.get('/', function (req, res) {
    res.redirect('/html/index.html');
});
app.use(entreprise_api_routes_1.apiRouter); //delegate REST API routes to apiRouter(s)
app.listen(9998, function () {
    console.log("http://localhost:9998");
});
