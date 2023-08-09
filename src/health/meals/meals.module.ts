import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MealsComponent } from './containers/meals/meals.component';
import { SharedModule } from '../shared/shared.module';
import { MealComponent } from './containers/meal/meal.component';
import { MealFormComponent } from './containers/meals/components/meal-form/meal-form.component';

const ROUTES: Routes = [
    { path: '', component: MealsComponent },
    { path: 'new', component: MealComponent }
];

@NgModule({
  declarations: [ 
    MealsComponent, 
    MealComponent, 
    MealFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
})
export class MealsModule { }
