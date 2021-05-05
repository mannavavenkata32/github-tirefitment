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
  tireDetails = {
    year: null,
    make: null,
    model: null,
    style: null,
  };
  showtireDetails = false;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.subTitle = 'What year is your vehicle?';
    this.years$ = this.store.select(getYearsSelector);
    this.make$ = this.store.select(getMakeSelector);
    this.model$ = this.store.select(getModelSelector);
    this.style$ = this.store.select(getStyleSelector);
  }

  getYears() {
    this.showtireDetails = true;
    this.tireDetails = {
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
        this.tireDetails.year = value;
        this.selectionState = State.MAKE;
        this.store.dispatch(new VehicleActions.FetchMake(`year=${this.tireDetails.year}`));
        break;
      case State.MAKE:
        this.subTitle = 'Select a Model';
        this.selectionState = State.MODEL;
        this.tireDetails.make = value;
        this.store.dispatch(new VehicleActions.FetchModels(`year=${this.tireDetails.year}&make=${this.tireDetails.make}`));
        break;
      case State.MODEL:
        this.subTitle = 'Select a Style';
        this.selectionState = State.STYLE;
        this.tireDetails.model = value;
        this.store.dispatch(
          new VehicleActions.FetchStyle(`year=${this.tireDetails.year}&make=${this.tireDetails.make}&model=${this.tireDetails.model}`)
        );
        break;
      case State.STYLE:
        this.tireDetails.style = value;
        this.showtireDetails = false;
        break;
    }
  }
}
