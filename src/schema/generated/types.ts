/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Dotaznik {
  /** @format date */
  datumDo?: string;
  /** @format date */
  datumVystaveni: string;
  /** @format date */
  datumVytvoreni: string;
  /** @format int64 */
  id: number;
  jmenoAutora: string;
  kod: string;
  /** @format int64 */
  nadchazejiciVerzeDotaznikuId?: number;
  napoveda: string;
  nazev: string;
  otazkaDotazniku?: OtazkaDotazniku[];
  popis: string;
  prijmeniAutora: string;
}

export interface DotaznikAclDto {
  /** @format int64 */
  dotaznikId: number;
  canEdit: boolean;
}

export interface DotaznikDto {
  /** @format int64 */
  id: number;
  /** @format date */
  datumVystaveni: string;
  /** @format date */
  datumVytvoreni: string;
  /** @format int64 */
  nadchazejiciVerzeDotaznikuId?: number;
  kod: string;
  jmenoAutora: string;
  prijmeniAutora: string;
  nazev: string;
  popis: string;
  napoveda: string;
}

export interface ErrorBean {
  detail?: string;
  /** @format int32 */
  httpStatus?: number;
  errorCode?: string;
  errorSubCode?: string;
  message?: string;
}

export type Map = any;

export interface MatchAnyDto {
  field?: string;
  query?: string[];
}

export interface MatchDto {
  field?: string;
  query?: string;
}

export interface MoznostOdpovedi {
  /** @format int64 */
  id: number;
  /** @format int64 */
  jednotka?: number;
  /** @format int64 */
  maxHodnota?: number;
  /** @format int64 */
  minHodnota?: number;
  otazkaDotazniku?: OtazkaDotazniku;
  /** @format int64 */
  poradi: number;
  typ: 'UZAVRENA' | 'OTEVRENA' | 'SKALA';
  zneniOdpovedi?: string;
}

export interface NestedDto {
  filter?: QueryConditionDto;
  path?: string;
}

export interface OdpovedDotazniku {
  doplnujiciOdpoved?: string;
  /** @format int64 */
  id?: number;
  /** @format int64 */
  otazkaId: number;
  textOdpovedi?: string;
  zaznamDotazniku?: ZaznamDotazniku;
}

export interface OdpovedDotaznikuDto {
  /** @format int64 */
  id: number;
  otazka: OtazkaDotazniku;
  doplnujiciOdpoved?: string;
  textOdpovedi?: string;
}

export interface OtazkaDotazniku {
  dotaznik?: Dotaznik;
  /** @format int64 */
  id: number;
  moznostOdpovedi?: MoznostOdpovedi[];
  napoveda: string;
  popisOtazky: string;
  /** @format int64 */
  poradi: number;
  povinnostOdpovedi: boolean;
  viceOdpovedi: boolean;
}

export interface PaginationDto {
  /** @format int64 */
  count?: number;
  order?: string[];
  /** @format int64 */
  start?: number;
}

export interface QueryConditionDto {
  match?: MatchDto;
  matchAny?: MatchAnyDto;
  must?: QueryConditionDto[];
  mustNot?: QueryConditionDto[];
  nested?: NestedDto;
  range?: RangeDto;
  should?: QueryConditionDto[];
  simpleString?: SimpleStringDto;
}

export interface QueryRequestDto {
  aggs?: Map;
  fetch?: string[];
  index?: string[];
  pagination?: PaginationDto;
  query?: QueryConditionDto;
}

export interface QueryResultListDto {
  aggregations?: Map;
  /** @format int64 */
  count?: number;
  list?: object;
  /** @format int64 */
  took?: number;
}

export interface RangeDto {
  field?: string;
  gt?: string;
  gte?: string;
  lt?: string;
  lte?: string;
}

export interface SimpleStringDto {
  defaultOperatorAnd?: boolean;
  fields?: string[];
  flags?: ('ALL' | 'NONE' | 'AND' | 'OR' | 'NOT' | 'PREFIX' | 'PHRASE' | 'PRECEDENCE' | 'ESCAPE' | 'WHITESPACE' | 'FUZZY' | 'NEAR' | 'SLOP')[];
  prefix?: boolean;
  query?: string;
}

export interface ZaznamDotazniku {
  /** @format date-time */
  casVolani: string;
  /** @format date-time */
  casVyplneni: string;
  /** @format int64 */
  dotaznikId: number;
  /** @format int64 */
  id?: number;
  odpovedDotazniku?: OdpovedDotazniku[];
  priznakFormulare?: string;
  token: string;
}

export interface ZaznamDotaznikuDto {
  /** @format int64 */
  id: number;
  dotaznik: DotaznikDto;
  /** @format date-time */
  casVolani: string;
  /** @format date-time */
  casVyplneni: string;
  token: string;
  odpovedDotazniku: OdpovedDotaznikuDto[];
}
