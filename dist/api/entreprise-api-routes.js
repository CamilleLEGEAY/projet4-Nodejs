"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
//import { MyMongoClient } from './my_generic_mongo_client';
const builder_1 = require("../services/builder");
const axios_1 = tslib_1.__importDefault(require("axios"));
exports.apiRouter = express_1.Router();
//const myMongoClient : MyMongoClient = new MyMongoClient();
//const myMongoClient = require('./my_generic_mongo_client');
const builder = new builder_1.Builder();
//const optionDate = { year: "numeric", month: "2-digit", day: "2-digit" }
const urlEtablissement = 'https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/?per_page=100';
const urlUniteLegale = 'https://entreprise.data.gouv.fr/api/sirene/v3/unites_legales/?per_page=100';
//var _headers :string = "headers: {'Content-Type': 'application/json'})"; 
var dateHier = "2020-07-03"; //mise à jour dans la méthode de remplissage de mongoDB
//get https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/?date_creation=2020-06-01
// 13 426 entreprises créées
//get https://entreprise.data.gouv.fr/api/sirene/v3/unites_legales/?date_creation=2020-06-01
// 8931 entites créées
///////////////Partie gestion de mongoDB///////////////
//methode lancement mise à jour de mongoDB
//calculer la date d'hier au format AAAA-MM-jj
//lancer la suppression des entreprise créée il y a plus de x jours dans mongoDB
//lancer le remplissage de mongoDB avec les entreprises créées ou modifiée hier
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//methode remplissage de mongoDB 
exports.apiRouter.route('/test')
    .get(async function (req, res) {
    //get etablissements crees hier sur l'API gouv de toutes les pages
    let resultat = await findAllPagesEtablissements();
    //les transformer en etablissementSortant et les enregistrer dans mongoDB
    let listeAEnregistrer = builder.arrayEtablissementBuilder(resultat);
    res.send("ok");
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//methode get etablissements crees hier sur l'API gouv de toutes les pages////////////////////////////////////////
/**
 * crea the liste of incomming businesses by browsing pages
 */
async function findAllPagesEtablissements() {
    let page = 1;
    let reponse;
    let listeEtablissements = new Array();
    do {
        reponse = await findOnePageEtablissements(page);
        await new Promise(r => setTimeout(r, 500));
        page++;
        listeEtablissements = listeEtablissements.concat(reponse.etablissements);
    } while (reponse.meta.total_pages > reponse.meta.page);
    return listeEtablissements;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//methode get etablissements crees hier sur l'API gouv d'une page/////////////////////////////////////////////////
/**
 * provide a page of results from the API SIRENE for businesses created yesterday
 * no treatment because we need the meta in other function to know the number of pages
 * @param numeroPage
 */
async function findOnePageEtablissements(numeroPage) {
    try {
        let url = urlEtablissement + "&page=" + numeroPage + "&date_creation=" + dateHier;
        let reponseJSON = (await axios_1.default.get(url)).data;
        return reponseJSON;
    }
    catch (e) {
        console.log(e);
        throw new Error(e);
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//methode delete etablissements crees il y a un mois
//recuperer list des entreprises créée il y a plus d'un mois
//supprimer tous les établissements de la liste dans mongodb
///////////////Partie appel dans mongoDB///////////////
///////////////Partie appel direct en externe///////////////
