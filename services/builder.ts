import { EtablissementEntrant } from '../data/etablissementEntrant';
import { EtablissementSortant } from '../data/etablissementSortant';
import { TrancheEffectif } from '../data/tranche_effectif';
import { UniteLegaleEntrant } from '../data/uniteLegaleEntrant';
import { UniteLegaleSortant } from '../data/uniteLegaleSortant';

export class Builder {

    /**
     * can sand an empty object if denomination = null
     * @param EtablissementEntrant
     * @returns EtablissementSortant
     */
    public etablissementEntrantToSortant(entrant: EtablissementEntrant): EtablissementSortant {
        var sortant: EtablissementSortant = new EtablissementSortant;
        sortant.denomination = this.findDenominationEtablissement(entrant);
        if (sortant.denomination === null) {
            return sortant;
        }
        sortant._id = entrant.siret;
        sortant.siren = entrant.siren;
        sortant.siret = entrant.siret;
        sortant.date_creation = entrant.date_creation;
        sortant.effectifs = TrancheEffectif[this.findEffectif(entrant.tranche_effectifs)];
        sortant.activite_principale = this.findActivite(entrant);
        if(entrant.etablissement_siege===false){
            sortant.etablissement_siege = entrant.etablissement_siege;
        }else {
            sortant.etablissement_siege = true;
        }
        sortant.complement_adresse = entrant.complement_adresse;
        sortant.numero_voie = entrant.numero_voie;
        sortant.indice_repetition = entrant.indice_repetition;
        sortant.type_voie = entrant.type_voie;
        sortant.libelle_voie = entrant.libelle_voie;
        sortant.code_postal = entrant.code_postal;
        sortant.libelle_commune = entrant.libelle_commune;
        sortant.code_cedex = entrant.code_cedex;
        sortant.libelle_cedex = entrant.libelle_cedex;
        sortant.etat_administratif = entrant.etat_administratif;
        sortant.caractere_employeur = entrant.caractere_employeur;
        return sortant;
    }

    /**
     * @param UniteLegaleEntrant
     * @returns UniteLegaleSortant
     */
    public uniteLegaleEntrantToSortant(entrant: UniteLegaleEntrant): UniteLegaleSortant {
        var sortant: UniteLegaleSortant = new UniteLegaleSortant;
        sortant.denomination = this.findDenominationUniteLegale(entrant);
        if (sortant.denomination = null) {
            return sortant;
        }
        sortant.siren = entrant.siren;
        sortant.date_creation = this.findCreationUniteLegale(entrant);
        sortant.identifiant_association = entrant.identifiant_association;
        sortant.effectifs = TrancheEffectif[this.findEffectif(entrant.tranche_effectifs)];
        sortant.categorie_entreprise = entrant.categorie_entreprise;
        sortant.etat_administratif = entrant.etat_administratif;
        sortant.activite_principale = entrant.activite_principale;
        sortant.caractere_employeur = entrant.caractere_employeur;
        sortant.etablissement_siege = this.etablissementEntrantToSortant(entrant.etablissement_siege);
        sortant.etablissements = this.arrayEtablissementBuilder(entrant.etablissements);
        return sortant;
    }
    /**
     * @param listeEtablissementEntrant
     * @returns listeEtablissementSortant 
     */
    public arrayEtablissementBuilder(listeEntrant: Array<EtablissementEntrant>): Array<EtablissementSortant> {
        var listeSortant: Array<EtablissementSortant> = new Array<EtablissementSortant>();
        for (let etablissement of listeEntrant) {
            listeSortant.push(this.etablissementEntrantToSortant(etablissement));
        }
        return listeSortant;
    }

    private findDenominationEtablissement(entrant: EtablissementEntrant): string {
        var denomination: string;
        if (entrant.enseigne_1 != null) {
            denomination = entrant.enseigne_1;
        } else {
            if (entrant.enseigne_2 != null) {
                denomination = entrant.enseigne_2;
            } else {
                if (entrant.enseigne_3 != null) {
                    denomination = entrant.enseigne_3;
                } else {
                    if (entrant.denomination_usuelle != null) {
                        denomination = entrant.denomination_usuelle;
                    } else {
                        if (entrant.unite_legale != null) {
                            denomination = this.findDenominationUniteLegale(entrant.unite_legale);
                        }
                    }
                }
            }
        }
        return denomination;
    }

    private findDenominationUniteLegale(entrant: UniteLegaleEntrant): string {
        var denomination: string;
        if (entrant.denomination_usuelle_1 != null) {
            denomination = entrant.denomination_usuelle_1;
        } else {
            if (entrant.denomination_usuelle_2 != null) {
                denomination = entrant.denomination_usuelle_2;
            } else {
                if (entrant.denomination_usuelle_3 != null) {
                    denomination = entrant.denomination_usuelle_3;
                } else {
                    if (entrant.nom != null) {
                        denomination = entrant.nom + " " + entrant.prenom_1;
                    }
                }
            }
        }
        return denomination;
    }

    private findActivite(entrant: EtablissementEntrant): string {
        var activite: string;
        if (entrant.activite_principale != null) {
            activite = entrant.activite_principale;
        } else {
            if (entrant.activite_principale_registre_metiers != null)
                activite = entrant.activite_principale_registre_metiers.substring(0, 2) + "." + entrant.activite_principale_registre_metiers.substring(2, 5);
        }
        return activite;
    }

    private findCreationUniteLegale(entrant: UniteLegaleEntrant): Date {
        var date: Date;
        if (entrant.date_creation != null) {
            date = entrant.date_creation;
        } else {
            date = entrant.date_debut;
        }
        return date;
    }

    private findEffectif(tranche: string): number {
        let code_effectif: number;
        if (tranche === null) {
            return code_effectif = TrancheEffectif["Unités non employeuses"];
        } else {
            try {
                return code_effectif = parseInt(tranche);
            } catch {
                return code_effectif = TrancheEffectif["Unités non employeuses"];
            }
        }
    }
}