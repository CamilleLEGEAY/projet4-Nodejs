import { Request, Response, NextFunction, Router } from 'express';
import { EtablissementEntrant } from '../data/etablissementEntrant';
//import { MyMongoClient } from './my_generic_mongo_client';
import { Builder } from '../services/builder';
import { ReponseApiEtablissements } from '../data/reponsesAPI';
import axios from 'axios';

export const apiRouter = Router();

//const myMongoClient : MyMongoClient = new MyMongoClient();
//const myMongoClient = require('./my_generic_mongo_client');
//const builder: Builder = new Builder();
//const optionDate = { year: "numeric", month: "2-digit", day: "2-digit" }
const urlEtablissement: string = 'https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/';
const urlUniteLegale: string = 'https://entreprise.data.gouv.fr/api/sirene/v3/unites_legales/';
//var _headers :string = "headers: {'Content-Type': 'application/json'})"; 


    
    

    //get https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/?date_creation=2020-06-01
    // 13 426 entreprises créées
    //get https://entreprise.data.gouv.fr/api/sirene/v3/unites_legales/?date_creation=2020-06-01
    // 8931 entites créées

    ///////////////Partie gestion de mongoDB///////////////

    //methode remplissage de mongoDB
    
    apiRouter.route('/test')
    .get(async function (req : Request, res: Response){
        //test
        let resultat : ReponseApiEtablissements = await findOnePageEtablissements();
        res.send(JSON.stringify(resultat));
        
        
        //get etablissements crees hier sur l'API gouv de toutes les pages
        //les transformer en etablissementSortant et les enregistrer dans mongoDB
        
    })
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    //methode get etablissements crees hier sur l'API gouv de toutes les pages////////////////////////////////////////
    //async function findAllPagesEtablissements() {
    // let page : number = 1;
    // var  listeEtablissements : Array<Etablissement> = new Array();
    // do {
    //    let reponse = findOnePageEtablissements(page);
    //    setTimeout(function(){page+=},1000);
    //    listeEtablissements.push(response.liste des établissements)
    //  }   
    //while (response.meta.total_pages>response.meta.page);
    //}
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    //methode get etablissements crees hier sur l'API gouv d'une page/////////////////////////////////////////////////
    async function findOnePageEtablissements() {   
        try{
            let reponseJSON : ReponseApiEtablissements = (await axios.get(urlEtablissement/*+"?page="+numeroPage+"&date_creation="+new Date()*/)).data;
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