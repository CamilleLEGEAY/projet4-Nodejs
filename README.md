# projet4-Nodejs
Ce micro-service extrait une partie des données gérées par l'API SIRENE via https://entreprise.data.gouv.fr/api/ et les stoque dans mongoDB.

# API SIRENE
Le serveur accepte un maximum de 7 requêtes par seconde.
Seule la V3 est actuellement utilisée dans ce Micro-Service.

V1 : utilise un format de données différent des autres version et dispose d'un outil de suggestion de recherche.
V2 : ajoute des données de géolocalisation, et un lien vers la requête RNM (Répertoire National des Métiers) correspondante pour un SIREN.
V3 : utilise le nouveau format de données mis en place par l'INSEE depuis le 1er janvier 2019

gitHub de l'API : https://github.com/etalab/sirene_as_api

# INSTALLER le projet NodeJs avec express et mongoDB
	Installations nécessaires:
		- nodeJs (si node -v et npm -v se sont pas des commandes reconnues alors télécharger et installer nodeJs)
	
	Cloner le repository
	Ouvrir une fenêtre de commande au niveau du projet
	Faire un "npm install"

##variables d'environnement
	PORT
	DB_NAME
	MONGODB_URI
	COLLECTION
	