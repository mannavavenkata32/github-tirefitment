import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FitmentContainerComponent } from './fitment-container/fitment-container.component';
import { ListComponent } from './list/list.component';
import { reducers } from './store';
import { VehicleEffects } from './store/effects/vehicle.effects';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('fitment', reducers), EffectsModule.forFeature([VehicleEffects])],
  declarations: [FitmentContainerComponent, ListComponent],
  exports: [FitmentContainerComponent],
})
export class FitmentModule {}
