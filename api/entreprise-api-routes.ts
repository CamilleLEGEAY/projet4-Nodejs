import { Request, Response, NextFunction, Router } from 'express';
import { EtablissementEntrant } from '../data/etablissementEntrant';
import { Builder } from '../services/builder';
import { DateServices } from '../services/date';
import { ReponseApiEtablissements } from '../data/reponsesAPI';
import axios from 'axios';
import { EtablissementSortant } from '../data/etablissementSortant';

export const apiRouter = Router();

const myMongoClient = require('./my_generic_mongo_client');
const builder: Builder = new Builder();
const dateService: DateServices = new DateServices();
const urlEtablissement: string = 'https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/?per_page=100';
const urlUniteLegale: string = 'https://entreprise.data.gouv.fr/api/sirene/v3/unites_legales/?per_page=100';
//var _headers :string = "headers: {'Content-Type': 'application/json'})"; 

///////////////Partie gestion de mongoDB///////////////
/**
 * update mongoDB
 */
apiRouter.route('/test')
    .get(async function (req: Request, res: Response) {
        let dateMAJ = new Date()
        let yesterday = dateService.yesterday(dateMAJ);
        let daysAgo = dateService.daysAgo(dateMAJ, 15);
        let repOne = await cleanMongoDB(daysAgo);
        let repTwo = await fillMongoDB(yesterday);
        res.send("ok "+repOne+" "+repTwo);
    })
/**
 * fill in database with businesses created yesterday
 */
async function fillMongoDB(dateCreation: string): Promise<string> {
    let resultat: Array<EtablissementEntrant> = await findAllPagesEtablissements(dateCreation);
    let listeAEnregistrer: Array<EtablissementSortant> = builder.arrayEtablissementBuilder(resultat);
    for (let etablissement of listeAEnregistrer) {
        myMongoClient.genericInsertOne('etablissement', etablissement);
    }
    return "fillMongoDB lancé";
}
/**
 * crea the liste of new businesses by browsing pages
 * 2 requests/second (API SIRENE allow 7/second) 
 */
async function findAllPagesEtablissements(dateCreation: string): Promise<EtablissementEntrant[]> {
    let page: number = 1;
    let reponse: ReponseApiEtablissements;
    let listeEtablissements: Array<EtablissementEntrant> = new Array<EtablissementEntrant>();
    do {
        reponse = await findOnePageEtablissements(page, dateCreation);
        await new Promise(r => setTimeout(r, 500));
        page++;
        listeEtablissements = listeEtablissements.concat(reponse.etablissements);
    }
    while (reponse.meta.total_pages > reponse.meta.page);
    return listeEtablissements;
}
/**
 * provide a page of results from the API SIRENE for businesses created yesterday
 * no treatment because we need the meta in other function to know the number of pages
 * @param numeroPage 
 */
async function findOnePageEtablissements(numeroPage: number, dateCreation: string): Promise<ReponseApiEtablissements> {
    try {
        let url = urlEtablissement + "&page=" + numeroPage + "&date_creation=" + dateCreation;
        let reponseJSON: ReponseApiEtablissements = (await axios.get(url)).data;
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
async function cleanMongoDB(dateCreation: string): Promise<string> {
    myMongoClient.genericRemove('etablissement', {date_creation : dateCreation});
    return "cleanMongoDB lancé";
}

    ///////////////Partie appel dans mongoDB///////////////





    ///////////////Partie appel direct en externe///////////////