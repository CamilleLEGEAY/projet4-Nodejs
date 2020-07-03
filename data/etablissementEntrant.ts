import { TrancheEffectif } from "./tranche_effectif";
import { UniteLegaleEntrant } from "./uniteLegaleEntrant";

/**
 * un etablissement correspond à un siret
 */
export class EtablissementEntrant {

    siren: string;
    siret: string;
    //si statut = O alors informations visibles, si = N alors attributs null
    statut_diffusion: string;
    // format date : AAAA-MM-jj   
    date_creation: Date;
    tranche_effectifs: string;
    annee_effectifs: string;
    //format naf detaille 9602AA
    activite_principale_registre_metiers: string;
    //format 2019-06-24T13:33:39
    date_dernier_traitement: Date;
    etablissement_siege: boolean;
    //adresse
    complement_adresse: string;
    numero_voie: number;
    indice_repetition: string;
    type_voie: string;
    libelle_voie: string;
    code_postal: string;
    libelle_commune: string;
    code_cedex: string;
    libelle_cedex: string;

    //etat administratif "A"= ouvert "F"=fermé
    etat_administratif: string;
    enseigne_1: string;
    enseigne_2: string;
    enseigne_3: string;
    denomination_usuelle: string;

    //Naf type : 96.02A
    activite_principale: string;
    nomenclature_activite_principale: string;
    //"O" si l'unité légale emploie des salariés, sinon "N" (exemple Autoentrepreneur) ou null
    caractere_employeur: string;
    unite_legale: UniteLegaleEntrant;
}