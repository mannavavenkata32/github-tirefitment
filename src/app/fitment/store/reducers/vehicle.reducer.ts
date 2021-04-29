import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromVehicle from '../actions/vehicle.action';

export interface VehicleState {
  years: string[];
  loaded: boolean;
  loading: boolean;
  make: string[];
  model: string[];
  style: string[];
}

export const initialState: VehicleState = {
  years: null,
  make: null,
  model: null,
  loaded: false,
  loading: false,
  style: null,
};

export function reducer(state = initialState, action: fromVehicle.VehicleAction): VehicleState {
  switch (action.type) {
    case fromVehicle.LOAD_YEARS: {
      return {
        ...state,
        loading: true,
      };
    }
    case fromVehicle.LOAD_YEARS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false,
      };
    }
    case fromVehicle.LOAD_YEARS_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
      };
    }
    case fromVehicle.SET_YEARS: {
      return {
        ...state,
        years: [...action.payload],
      };
    }
    case fromVehicle.SET_MAKE: {
      return {
        ...state,
        make: [...action.payload],
      };
    }
    case fromVehicle.SET_MODEL: {
      return {
        ...state,
        model: [...action.payload],
      };
    }
    case fromVehicle.SET_STYLE: {
      return {
        ...state,
        style: action.payload,
      };
    }
    default:
      return state;
  }
}

export interface Fitment {
  vehicle: VehicleState;
}

export interface AppState {
  fitment: Fitment;
}

export const getYears = createFeatureSelector<Fitment>('fitment');

export const getYearsSelector = createSelector(getYears, (state: { vehicle: VehicleState }) => state.vehicle.years);
export const getMakeSelector = createSelector(getYears, (state: { vehicle: VehicleState }) => state.vehicle.make);
export const getModelSelector = createSelector(getYears, (state: { vehicle: VehicleState }) => state.vehicle.model);
export const getStyleSelector = createSelector(getYears, (state: { vehicle: VehicleState }) => state.vehicle.style);
