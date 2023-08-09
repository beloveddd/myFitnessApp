import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
    { path: 'schedule',  loadChildren: () => import('./schedule/schedule.module').then(x => x.ScheduleModule) },
    { path: 'meals',  loadChildren: () => import('./meals/meals.module').then(x => x.MealsModule) },
    { path: 'workouts',  loadChildren: () => import('./workouts/workouts.module').then(x => x.WorkoutsModule) },
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
})
export class HealthModule { }
