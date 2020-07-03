/**
 * We know that num values can be retrieved using the corresponding enum member value.
 * But it is also true that enum members can be retrieved using their values.
 * This is called reverse mapping.
 */
export enum TrancheEffectif{
    'Unités non employeuses'= -1,
    '0 salarié'= 0 ,
    '1 ou 2 salariés'= 1,
    '3 à 5 salariés'= 2,
    '6 à 9 salariés'= 3,
    '10 à 19 salariés' = 11,
    '20 à 49 salariés'= 12,
    '50 à 99 salariés'= 21,
    '100 à 199 salariés'= 22,
    '200 à 249 salariés'= 31,
    '250 à 499 salariés'= 32,
    '500 à 999 salariés'= 41,
    '1 000 à 1 999 salariés'= 42,
    '2 000 à 4 999 salariés'= 51,
    '5 000 à 9 999 salariés'= 52,
    '10 000 salariés et plus'= 53
}