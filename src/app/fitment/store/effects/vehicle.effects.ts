import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IMakeResponse, IModelResponse, ITrimResponse, IYearsResponse } from '../../../models/i-Model';
import * as VehicleActions from '../actions/vehicle.action';
import { FetchStyle } from '../actions/vehicle.action';
import * as fromApp from '../reducers/vehicle.reducer';

@Injectable()
export class VehicleEffects {
  @Effect()
  fetchYears = this.actions$.pipe(
    ofType(VehicleActions.LOAD_YEARS),
    switchMap(() => {
      return this.http.get<IYearsResponse>('https://6080be3273292b0017cdbf2a.mockapi.io/years');
    }),
    map((years) => years.year),
    map((years) => {
      this.store.dispatch(new VehicleActions.LoadYearsSuccess());
      return new VehicleActions.SetYears(years);
    }),
    catchError((err) => {
      this.store.dispatch(new VehicleActions.LoadYearsFail());
      return err;
    })
  );

  @Effect()
  fetchMake = this.actions$.pipe(
    ofType(VehicleActions.FETCH_MAKE),
    switchMap((action: VehicleActions.FetchMake) => {
      console.log(action.payload);
      return this.http.get<IMakeResponse>('https://6080be3273292b0017cdbf2a.mockapi.io/makes');
    }),
    map((make) => make.make),
    map((make) => {
      return new VehicleActions.SetMake(make);
    }),
    catchError((err) => {
      return err;
    })
  );

  @Effect()
  fetchModels = this.actions$.pipe(
    ofType(VehicleActions.FETCH_MODELS),
    switchMap((action: VehicleActions.FetchModels) => {
      console.log(action.payload);
      return this.http.get<IModelResponse>('https://6080be3273292b0017cdbf2a.mockapi.io/models');
    }),
    map((models) => models.model),
    map((model) => {
      return new VehicleActions.SetModel(model);
    }),
    catchError((err) => {
      return err;
    })
  );

  @Effect()
  fetchStyle = this.actions$.pipe(
    ofType(VehicleActions.FETCH_STYLE),
    switchMap((action: FetchStyle) => {
      console.log(action.payload);
      return this.http.get<ITrimResponse>('https://6080be3273292b0017cdbf2a.mockapi.io/trim');
    }),
    map((trim) => trim.trim),
    map((trim) => {
      return new VehicleActions.SetStyle(trim);
    }),
    catchError((err) => {
      return err;
    })
  );
  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.VehicleState>) {}
}
