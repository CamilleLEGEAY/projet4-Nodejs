import { Request, Response, NextFunction, Router } from 'express';
import { EtablissementEntrant } from '../data/etablissementEntrant';
//import { MyMongoClient } from './my_generic_mongo_client';
import { Builder } from '../services/builder';
import { ReponseApiEtablissements } from '../data/reponsesAPI';
import axios from 'axios';
import { EtablissementSortant } from '../data/etablissementSortant';

export const apiRouter = Router();

//const myMongoClient : MyMongoClient = new MyMongoClient();
//const myMongoClient = require('./my_generic_mongo_client');
const builder: Builder = new Builder();
//const optionDate = { year: "numeric", month: "2-digit", day: "2-digit" }
const urlEtablissement: string = 'https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/?per_page=100';
const urlUniteLegale: string = 'https://entreprise.data.gouv.fr/api/sirene/v3/unites_legales/?per_page=100';
//var _headers :string = "headers: {'Content-Type': 'application/json'})"; 
var dateHier : string = "2020-07-03"; //mise à jour dans la méthode de remplissage de mongoDB
    

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
    apiRouter.route('/test')
    .get(async function (req : Request, res: Response){
        //get etablissements crees hier sur l'API gouv de toutes les pages
        let resultat : Array<EtablissementEntrant> = await findAllPagesEtablissements();
        //les transformer en etablissementSortant et les enregistrer dans mongoDB
        let listeAEnregistrer : Array<EtablissementSortant> = builder.arrayEtablissementBuilder(resultat);
        res.send("ok");
    })
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    //methode get etablissements crees hier sur l'API gouv de toutes les pages////////////////////////////////////////
    /**
     * crea the liste of incomming businesses by browsing pages
     */
    async function findAllPagesEtablissements() : Promise<EtablissementEntrant[]>{
     let page : number = 1;
     let reponse : ReponseApiEtablissements;
     let  listeEtablissements : Array<EtablissementEntrant> = new Array<EtablissementEntrant>();
     do {
        reponse = await findOnePageEtablissements(page);
        await new Promise(r => setTimeout(r, 500));
        page++;
        listeEtablissements = listeEtablissements.concat(reponse.etablissements);
        }   
        while (reponse.meta.total_pages>reponse.meta.page);
        return listeEtablissements;
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    //methode get etablissements crees hier sur l'API gouv d'une page/////////////////////////////////////////////////
    /**
     * provide a page of results from the API SIRENE for businesses created yesterday
     * no treatment because we need the meta in other function to know the number of pages
     * @param numeroPage 
     */
    async function findOnePageEtablissements(numeroPage : number) : Promise<ReponseApiEtablissements> {   
        try{
            let url = urlEtablissement+"&page="+numeroPage+"&date_creation="+dateHier;
            let reponseJSON : ReponseApiEtablissements = (await axios.get(url)).data;
            return reponseJSON;
        }
        catch(e){
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