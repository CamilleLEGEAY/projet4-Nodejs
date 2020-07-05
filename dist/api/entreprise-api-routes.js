"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const builder_1 = require("../services/builder");
const date_1 = require("../services/date");
const axios_1 = tslib_1.__importDefault(require("axios"));
exports.apiRouter = express_1.Router();
const myMongoClient = require('./my_generic_mongo_client');
const builder = new builder_1.Builder();
const dateService = new date_1.DateServices();
const urlEtablissement = 'https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/?per_page=100';
const urlUniteLegale = 'https://entreprise.data.gouv.fr/api/sirene/v3/unites_legales/?per_page=100';
//var _headers :string = "headers: {'Content-Type': 'application/json'})"; 
///////////////Partie gestion de mongoDB///////////////
/**
 * update mongoDB
 */
exports.apiRouter.route('/test')
    .get(async function (req, res) {
    let dateMAJ = new Date();
    let yesterday = dateService.yesterday(dateMAJ);
    let daysAgo = dateService.daysAgo(dateMAJ, 15);
    let repOne = await cleanMongoDB(daysAgo);
    let repTwo = await fillMongoDB(yesterday);
    res.send("ok " + repOne + " " + repTwo);
});
/**
 * fill in database with businesses created yesterday
 */
async function fillMongoDB(dateCreation) {
    let resultat = await findAllPagesEtablissements(dateCreation);
    let listeAEnregistrer = builder.arrayEtablissementBuilder(resultat);
    for (let etablissement of listeAEnregistrer) {
        myMongoClient.genericInsertOne('etablissement', etablissement);
    }
    return "fillMongoDB lancé";
}
/**
 * crea the liste of new businesses by browsing pages
 * 2 requests/second (API SIRENE allow 7/second)
 */
async function findAllPagesEtablissements(dateCreation) {
    let page = 1;
    let reponse;
    let listeEtablissements = new Array();
    do {
        reponse = await findOnePageEtablissements(page, dateCreation);
        await new Promise(r => setTimeout(r, 500));
        page++;
        listeEtablissements = listeEtablissements.concat(reponse.etablissements);
    } while (reponse.meta.total_pages > reponse.meta.page);
    return listeEtablissements;
}
/**
 * provide a page of results from the API SIRENE for businesses created yesterday
 * no treatment because we need the meta in other function to know the number of pages
 * @param numeroPage
 */
async function findOnePageEtablissements(numeroPage, dateCreation) {
    try {
        let url = urlEtablissement + "&page=" + numeroPage + "&date_creation=" + dateCreation;
        let reponseJSON = (await axios_1.default.get(url)).data;
        return reponseJSON;
    }
    catch (e) {
        console.log(e);
        throw new Error(e);
    }
}
/**
 * remove oldest data from mongoDB
 * @param dateCreation
 */
async function cleanMongoDB(dateCreation) {
    myMongoClient.genericRemove('etablissement', { date_creation: dateCreation });
    return "cleanMongoDB lancé";
}
///////////////Partie appel dans mongoDB///////////////
///////////////Partie appel direct en externe///////////////
