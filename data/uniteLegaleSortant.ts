import { EtablissementSortant } from "./etablissementSortant";
import { TrancheEffectif } from "./tranche_effectif";

/**
 * une unite legale correspond à un siren
 */
export class UniteLegaleSortant {

    siren: string;
    // format date : AAAA-MM-jj   
    date_creation: Date;
    denomination:  string;
    identifiant_association: string;
    effectifs: string;
    // PME ETI GE
    categorie_entreprise: string;
    //Actif Ferme
    etat_administratif: string;
    activite_principale:  string;
    caractere_employeur:  string;
    etablissement_siege: EtablissementSortant;
    etablissements: Array<EtablissementSortant>;
}