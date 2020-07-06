import { Router } from 'express';

const myMongoClient = require('./my_generic_mongo_client');

export const apiRouter = Router();

/**
 * return all etablissement of MongoDB
 */
apiRouter.route('/findAll')
    .get(function (req, res, next) {
        myMongoClient.genericFindList('etablissement', {}, function (err: any, liste: any) {
            if (err)
                res.send(err)
            else res.send(liste);
        })
    });