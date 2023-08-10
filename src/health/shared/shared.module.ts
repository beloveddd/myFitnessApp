
import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { RouterModule } from "@angular/router";

import { MealsService } from "./services/meals/meals.service";
import { ListItemComponent } from "./components/list-item/list-item.component";
import { WorkoutsService } from "./services/workouts/workouts.service";
import { JoinPipe } from "./pipes/join.pipe";
import { WorkoutPipe } from "./pipes/workout.pipe";
import { ScheduleService } from "./services/schedule/schedule.service";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AngularFireDatabaseModule,
    ],
    declarations: [ 
        ListItemComponent, 
        JoinPipe, 
        WorkoutPipe 
    ],
    exports: [ ListItemComponent, JoinPipe ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: SharedModule,
            providers: [
                MealsService,
                WorkoutsService,
                ScheduleService
            ]
        }
    }
}