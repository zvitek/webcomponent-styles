import { Dotaznik } from '../schema/generated/types';

export default {
  id: 1,
  datumVystaveni: '1682812800000',
  datumVytvoreni: '1677628800000',
  predchazejiciVerzeDotaznikuId: null,
  kod: 'KOD_TEST',
  jmenoAutora: 'Tester',
  prijmeniAutora: 'Tesrovací',
  nazev: 'Testovací dotazník',
  popis: 'Popis testovacího dotazníku',
  napoveda: 'Nápověda dotazníku',
  otazkaDotazniku: [
    {
      id: 1,
      moznostOdpovedi: [
        {
          id: 1,
          poradi: 1,
          typ: 'OTEVRENA',
          zneniOdpovedi: undefined,
        },
      ],
      napoveda: undefined,
      popisOtazky: 'Jaká je tvoje oblíbená příchuť zmrzliny?',
      poradi: 0,
      povinnostOdpovedi: true,
      viceOdpovedi: false,
    },
    {
      id: 4,
      moznostOdpovedi: [
        {
          id: 1,
          poradi: 1,
          typ: 'SKALA',
          jednotka: 10,
          maxHodnota: 500,
          minHodnota: 0,
          zneniOdpovedi: undefined,
        },
      ],
      napoveda: undefined,
      popisOtazky: 'Jak jsi starý',
      poradi: 0,
      povinnostOdpovedi: true,
      viceOdpovedi: false,
    },
    {
      id: 2,
      moznostOdpovedi: [
        {
          id: 1,
          poradi: 1,
          typ: 'OTEVRENA',
          zneniOdpovedi: 'Panna',
        },
        {
          id: 2,
          poradi: 2,
          typ: 'OTEVRENA',
          zneniOdpovedi: 'Lev',
        },
        {
          id: 3,
          poradi: 3,
          typ: 'OTEVRENA',
          zneniOdpovedi: 'Býk',
        },
        {
          id: 4,
          poradi: 4,
          typ: 'UZAVRENA',
          zneniOdpovedi: undefined,
        },
      ],
      napoveda: 'Případně vyber nejbližší svému znamení',
      popisOtazky: 'Co jsi za znamení?',
      poradi: 0,
      povinnostOdpovedi: true,
      viceOdpovedi: false,
    },
    {
      id: 3,
      moznostOdpovedi: [
        {
          id: 1,
          poradi: 1,
          typ: 'UZAVRENA',
          zneniOdpovedi: 'Jahodová',
        },
        {
          id: 2,
          poradi: 2,
          typ: 'UZAVRENA',
          zneniOdpovedi: 'Vanilková',
        },
        {
          id: 3,
          poradi: 3,
          typ: 'UZAVRENA',
          zneniOdpovedi: 'Pistáciová',
        },
      ],
      napoveda: 'Případně vyber nejbližší svému znamení',
      popisOtazky: 'Jaká je tvoje oblíbená příchuť zmrzliny?',
      poradi: 0,
      povinnostOdpovedi: false,
      viceOdpovedi: true,
    },
  ],
} as Dotaznik;
