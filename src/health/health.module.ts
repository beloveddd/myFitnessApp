import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IsAuthGuard } from 'src/auth/shared/guards/auth.guard';
import { SharedModule } from './shared/shared.module';

const ROUTES: Routes = [
    { path: 'schedule', canActivate: [IsAuthGuard], loadChildren: () => import('./schedule/schedule.module').then(x => x.ScheduleModule) },
    { path: 'meals', canActivate: [IsAuthGuard], loadChildren: () => import('./meals/meals.module').then(x => x.MealsModule) },
    { path: 'workouts', canActivate: [IsAuthGuard], loadChildren: () => import('./workouts/workouts.module').then(x => x.WorkoutsModule) },
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    SharedModule.forRoot()
  ],
})
export class HealthModule { }
