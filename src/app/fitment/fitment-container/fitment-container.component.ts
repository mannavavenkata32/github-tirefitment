import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as VehicleActions from './../store/actions/vehicle.action';
import { AppState, getMakeSelector, getModelSelector, getStyleSelector, getYearsSelector } from './../store/reducers/vehicle.reducer';
enum State {
  YEAR,
  MAKE,
  MODEL,
  STYLE,
}

@Component({
  selector: 'app-fitment-container',
  templateUrl: './fitment-container.component.html',
  styleUrls: ['./fitment-container.component.scss'],
})
export class FitmentContainerComponent implements OnInit {
  subTitle: string;
  years$: Observable<string[]>;
  make$: Observable<string[]>;
  model$: Observable<string[]>;
  style$: Observable<string[]>;
  selectionState: State = State.YEAR;
  state = State;
  tyreDetails = {
    year: null,
    make: null,
    model: null,
    style: null,
  };
  showTyreDetails = false;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.subTitle = 'What year is your vehicle?';
    this.years$ = this.store.select(getYearsSelector);
    this.make$ = this.store.select(getMakeSelector);
    this.model$ = this.store.select(getModelSelector);
    this.style$ = this.store.select(getStyleSelector);
  }

  getYears() {
    this.showTyreDetails = true;
    this.tyreDetails = {
      year: null,
      make: null,
      model: null,
      style: null,
    };
    this.selectionState = State.YEAR;
    this.store.dispatch(new VehicleActions.LoadYears());
  }
  getSelectedValue(value) {
    switch (this.selectionState) {
      case State.YEAR:
        this.subTitle = 'Select a Make';
        this.tyreDetails.year = value;
        this.selectionState = State.MAKE;
        this.store.dispatch(new VehicleActions.FetchMake(`year=${this.tyreDetails.year}`));
        break;
      case State.MAKE:
        this.subTitle = 'Select a Model';
        this.selectionState = State.MODEL;
        this.tyreDetails.make = value;
        this.store.dispatch(new VehicleActions.FetchModels(`year=${this.tyreDetails.year}&make=${this.tyreDetails.make}`));
        break;
      case State.MODEL:
        this.subTitle = 'Select a Style';
        this.selectionState = State.STYLE;
        this.tyreDetails.model = value;
        this.store.dispatch(
          new VehicleActions.FetchStyle(`year=${this.tyreDetails.year}&make=${this.tyreDetails.make}&model=${this.tyreDetails.model}`)
        );
        break;
      case State.STYLE:
        this.tyreDetails.style = value;
        this.showTyreDetails = false;
        break;
    }
  }
}
