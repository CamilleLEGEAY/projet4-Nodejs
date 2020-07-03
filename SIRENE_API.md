# API SIRENE
Le serveur accepte un maximum de 7 requêtes par seconde.
V1 : utilise un format de données différent des autres version et dispose d'un outil de suggestion de recherche.
V2 : ajoute des données de géolocalisation, et un lien vers la requête RNM (Répertoire National des Métiers) correspondante pour un SIREN.
V3 : utilise le nouveau format de données mis en place par l'INSEE depuis le 1er janvier 2019

gitHub de l'API : https://github.com/etalab/sirene_as_api

# Requêtes V1

## Recherche FullText

Il s'agit de l'endpoint principal. Vous pouvez faire des requêtes avec Curl :

    curl 'localhost:3000/v1/full_text/MA_RECHERCHE'

ou simplement en copiant l'adresse ´localhost:3000/v1/full_text/MA_RECHERCHE´ dans votre navigateur.

### Format de réponse

L'API renvoie les réponses au format JSON avec les attributs suivant :

| Attribut      | Valeur                       |
|---------------|------------------------------|
| total_results | Total résultats              |
| total_pages   | Total de pages               |
| per_page      | Nombre de résultats par page |
| page          | Page actuelle                |
| etablissement | Résultats                    |
| spellcheck    | Correction orthographique suggérée |
| suggestions   | Suggestions de recherche |

### Filtrage par faceting

Les options suivantes de filtrage sont disponibles :

| Filtrage désiré                                           | Requête GET               | Valeur                                              |
|-----------------------------------------------------------|---------------------------|-----------------------------------------------------|
| Activité principale de l'entreprise (code NAF)            | activite_principale       | Le code `activité principale` (code NAF)            |
| Code postal                                               | code_postal               | Le code postal désiré                               |
| Code commune INSEE                                        | code_commune              | Le code INSEE de la commune                         |
| Departement                                               | departement               | Le departement désiré                               |
| Appartenance au champs de l'économie sociale et solidaire | is_ess                    | `O` pour Oui, `N` pour Non, `I` pour Invalide       |
| Entreprises individuelles                                 | is_entrepreneur_individuel| `yes` pour Oui, `no` pour Non                       |
| Tranche effectif salarié de l'entreprise                  | tranche_effectif_salarie_entreprise | le code INSEE pour cette tranche d'effectif salarié |

# Requêtes v3

## Recherche globale : Format de réponse

L'API renvoie les réponses au format JSON 
Comme suit si l'url utilisé est /etablissements, sinons "'unites_legales':" remplace "'etablissements':" si l'url est /unites_legales

    {
    "etablissements":[{"id": 30520044, "siren": "332464809", "nic": "00018", "siret": "33246480900018",…,
    "meta":{
    "total_results": 31145464,
    "per_page": 20,
    "total_pages": 1557274,
    "page": 1
        }
    }

## Options de filtrage
Il est possible de filtrer les résultats sur ces endpoints par n'importe lesquels des attributs des ressources unités légales ou établissements. 

Exemple de requête
Pour renvoyer tous les établissements actifs (etat_administratif=A) qui correspondent au siren 345184428 : 
GET https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/?etat_administratif=A&siren=345184428

## Recherche directe par SIREN ou SIRET

La requête directe pour une unité légale se fait ainsi :

    curl 'localhost:3000/v3/unites_legales/:siren'

La requête directe pour un établissement se fait ainsi :

    curl 'localhost:3000/v3/etablissements/:siret'

## Recherche plus large

Pour ces endpoints, vous pouvez filtrer les résultats par n'importe lequel des champs des ressources demandées en passant les paramètres dans la requête. Exemple :

    # recherche de tous les établissments ouverts pour un siren donné
    curl 'localhost:3000/v3/etablissements/?etat_administratif=A&siren=345184428'

    # recherche de toutes les unité légales ouvertes du code postal 59 380
    curl 'localhost:3000/v3/unites_legales/?etat_administratif=A&code_postal=59380'

La pagination est controlée par les paramètres `page` et `per_page`.
Les options Solr telles que le full-text ou la géolocalisation ne sont pas encore disponibles sur ces endpoints.