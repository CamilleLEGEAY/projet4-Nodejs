"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const myMongoClient = require('./my_generic_mongo_client');
exports.apiRouter = express_1.Router();
/**
 * return all etablissement of MongoDB
 */
exports.apiRouter.route('/findAll')
    .get(function (req, res, next) {
    myMongoClient.genericFindList('etablissement', {}, function (err, liste) {
        if (err)
            res.send(err);
        else
            res.send(liste);
    });
});
///////////////Partie appel direct en externe///////////////
