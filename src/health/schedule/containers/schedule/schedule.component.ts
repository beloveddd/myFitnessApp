import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";

import { ScheduleItem, ScheduleService } from "src/health/shared/services/schedule/schedule.service";
import { Store } from "src/app/store";
import { Workout, WorkoutsService } from "src/health/shared/services/workouts/workouts.service";
import { Meal, MealsService } from "src/health/shared/services/meals/meals.service";
@Component({
    selector: 'schedule',
    templateUrl: 'schedule.component.html',
    styleUrls: ['schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {

    open = false;

    date$!: Observable<Date>;
    schedule$!: Observable<ScheduleItem>;
    selected$!: Observable<any>;
    list$!: Observable<Meal[] | Workout[]>;
    subscriptions$: Subscription[] = [];

    constructor(
        private scheduleService: ScheduleService,
        private store: Store,
        private mealsService: MealsService,
        private workoutService: WorkoutsService,
    ) {}

    ngOnInit(): void {
        this.date$ = this.store.select('date');
        this.schedule$ = this.store.select('schedule');
        this.selected$ = this.store.select('selected');
        this.list$ = this.store.select('list');

        this.subscriptions$ = [
            this.scheduleService.schedule$.subscribe(),
            this.scheduleService.selected$.subscribe(),
            this.mealsService.meals$.subscribe(),
            this.workoutService.workouts$.subscribe(),
            this.scheduleService.list$.subscribe(),
        ];
    }

    ngOnDestroy(): void {
        this.subscriptions$.forEach((sub) => sub.unsubscribe());
    }

    changeDate(date: Date) {
        this.scheduleService.updateDate(date);
    }

    changeSection(event: any) {
        this.open = true;
        this.scheduleService.selectSection(event);
    }
}