import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { WorkoutsComponent } from './containers/workouts/workouts.component';


const ROUTES: Routes = [
    { path: '', component: WorkoutsComponent }
];

@NgModule({
  declarations: [ WorkoutsComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
})
export class WorkoutsModule { }
