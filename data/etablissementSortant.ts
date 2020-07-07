/**
 * un etablissement correspond à un siret
 */
export class EtablissementSortant {

    _id : any;
    siren: string;
    siret: string;
    //n'est pas renseignée des tous les etablissements il faut parfois le recuperer dans l'unite legale
    denomination:  string;
    // format date : AAAA-MM-jj   
    date_creation: Date;
    effectifs: string;
    //format naf detaille 96.02A
    activite_principale: string;
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

    //"O" si l'unité légale emploie des salariés, sinon "N" (exemple Autoentrepreneur) ou null
    caractere_employeur: string;
}