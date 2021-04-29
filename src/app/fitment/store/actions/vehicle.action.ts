import { Action } from '@ngrx/store';
// import model/interface from db.json here...

// Action constants
export const LOAD_YEARS = '[Fitment] Load Years';
export const LOAD_YEARS_FAIL = '[Fitment] Load Years Fail';
export const LOAD_YEARS_SUCCESS = '[Fitment] Load Years Success';
export const SET_YEARS = '[Fitment] Set Years';
export const SET_MAKE = '[Fitment] Set Make';
export const SET_MODEL = '[Fitment] Set Model';
export const FETCH_MODELS = '[Fitment] Fetch Models';
export const FETCH_MAKE = '[Fitment] Fetch Make';

export const SET_STYLE = '[Fitment] Set style';
export const FETCH_STYLE = '[Fitment] Fetch style';

// Action creators
export class LoadYears implements Action {
  readonly type = LOAD_YEARS;
}
export class LoadYearsFail implements Action {
  readonly type = LOAD_YEARS_FAIL;
}
export class LoadYearsSuccess implements Action {
  readonly type = LOAD_YEARS_SUCCESS;
}
export class SetYears implements Action {
  readonly type = SET_YEARS;
  constructor(public payload: string[]) {}
}
export class FetchMake implements Action {
  readonly type = FETCH_MAKE;
  constructor(public payload: string) {}
}
export class FetchModels implements Action {
  readonly type = FETCH_MODELS;
  constructor(public payload: string) {}
}
export class SetMake implements Action {
  readonly type = SET_MAKE;
  constructor(public payload: string[]) {}
}

export class SetModel implements Action {
  readonly type = SET_MODEL;
  constructor(public payload: string[]) {}
}

export class FetchStyle implements Action {
  readonly type = FETCH_STYLE;
  constructor(public payload: string) {}
}
export class SetStyle implements Action {
  readonly type = SET_STYLE;
  constructor(public payload: string[]) {}
}

// Action types
export type VehicleAction = LoadYears | LoadYearsFail | LoadYearsSuccess | SetYears | SetMake | SetModel | SetStyle;
