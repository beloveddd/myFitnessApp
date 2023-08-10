import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { WorkoutComponent } from './containers/workout/workout.component';
import { WorkoutsComponent } from './containers/workouts/workouts.component';
import { WorkoutFormComponent } from './containers/workouts/components/workout-form/workout-form.component';

const ROUTES: Routes = [
    { path: '', component: WorkoutsComponent},
    { path: 'new', component: WorkoutComponent },
    { path: ':id', component: WorkoutComponent }
];

@NgModule({
  declarations: [ 
    WorkoutsComponent, 
    WorkoutComponent, 
    WorkoutFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
})
export class WorkoutsModule { }
