import { EtablissementEntrant } from "./etablissementEntrant";

/**
 * une unite legale correspond à un siren
 */
export class UniteLegaleEntrant {

    siren: string;
    //si statut = O alors informations visibles, si = N alors attributs null
    statut_diffusion: string;
    // format date : AAAA-MM-jj   
    date_creation: Date;
    date_debut: Date;
    sigle : any;
    prenom_1: string;
    pseudonyme: string;
    identifiant_association: string;
    tranche_effectifs: string;
    annee_effectifs: string;
    date_dernier_traitement: Date;
    // PME ETI GE
    categorie_entreprise: string;
    // format date : AAAA-MM-jj
    date_fin: Date;
    etat_administratif: string;
    nom: string;
    nom_usage: string;
    denomination:  string;
    denomination_usuelle_1: string;
    denomination_usuelle_2:  string;
    denomination_usuelle_3: string;
    activite_principale:  string;
    nomenclature_activite_principale: string;
    caractere_employeur:  string;
    etablissement_siege: EtablissementEntrant;
    etablissements: Array<EtablissementEntrant>;
}