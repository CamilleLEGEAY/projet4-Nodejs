//myGenericMongoClient module (with MongoDB/MongoClient)
import { MongoClient, ObjectID } from 'mongodb';
import * as assert from 'assert';
import { MyAppConfig } from './MyAppConfig';


export class MyMongoClient {

	appConfig = new MyAppConfig();
	currentDb = null; //current MongoDB connection


	closeCurrentMongoDBConnection = function () {
		currentDb.close();
		currentDb = null;
	}

	executeInMongoDbConnection = function (callback_with_db) {
		if (currentDb == null) {
			MongoClient.connect(appConfig.mongoDbUrl, { useUnifiedTopology: true }, function (err, db) {
				if (err != null) {
					console.log("mongoDb connection error = " + err + " for dbUrl=" + appConfig.mongoDbUrl);
				}
				assert.equal(null, err);
				console.log("Connected correctly to mongodb database");
				//currentDb = db; //with mongodb client v2.x
				currentDb = db.db(appConfig.dbName);//with mongodb client >= v3.x
				callback_with_db(currentDb);
			});
		} else {
			callback_with_db(currentDb);
		}
	}

	genericUpdateOne = function (collectionName, id, changes, arrayFilters, callback_with_err_and_results) {
		executeInMongoDbConnection(function (db) {
			db.collection(collectionName).updateOne({ '_id': id }, { $set: changes }, { arrayFilters },
				function (err, results) {
					if (err != null) {
						console.log("genericUpdateOne error = " + err);
					}
					callback_with_err_and_results(err, results);
				});
		});
	};

	genericUpsertOne = function (collectionName, id, changes, callback_with_err_and_results) {
		executeInMongoDbConnection(function (db) {
			db.collection(collectionName).updateOne({ '_id': id }, { $set: changes }, { upsert: true },
				function (err, results) {
					if (err != null) {
						console.log("genericUpsertOne error = " + err);
					}
					callback_with_err_and_results(err, results);
				});
		});
	};

	genericInsertOne = function (collectionName, newOne, callback_with_err_and_newId) {
		executeInMongoDbConnection(function (db) {
			db.collection(collectionName).insertOne(newOne, function (err, result) {
				if (err != null) {
					console.log("genericInsertOne error = " + err);
					newId = null;
				}
				else {
					newId = newOne._id;
				}
				callback_with_err_and_newId(err, newId);
			});
		});
	};

	genericFindList = function (collectionName, query, callback_with_err_and_array) {
		executeInMongoDbConnection(function (db) {
			var cursor = db.collection(collectionName).find(query);
			cursor.toArray(function (err, arr) {
				callback_with_err_and_array(err, arr);
			});
		});
	};

	genericRemove = function (collectionName, query, callback_with_err_and_result) {
		executeInMongoDbConnection(function (db) {
			db.collection(collectionName).remove(query, function (err, obj) {
				if (err != null) {
					console.log("genericRemove error = " + err);
				}
				//if (err) throw err;
				console.log(obj.result.n + " document(s) deleted");
				callback_with_err_and_result(err, obj.result);
			});
		});
	};

	genericDeleteOneById = function (collectionName, mongoIdAsString, callback_with_err_and_booleanResult) {
		executeInMongoDbConnection(function (db) {
			db.collection(collectionName).deleteOne({ '_id': new ObjectID(mongoIdAsString) }, function (err, obj) {
				if (err != null) {
					console.log("genericDeleteOneById error = " + err);
					callback_with_err_and_booleanResult(err, false);
				}
				else
					console.log(" 1 document deleted");
				callback_with_err_and_booleanResult(err, true);
			});
		});
	};

	genericFindOne = function (collectionName, query, callback_with_err_and_item) {
		executeInMongoDbConnection(function (db) {
			db.collection(collectionName).findOne(query, function (err, item) {
				if (err != null) {
					console.log("genericFindById error = " + err);
				}
				assert.equal(null, err);
				callback_with_err_and_item(err, item);
			});
		});
	};

}