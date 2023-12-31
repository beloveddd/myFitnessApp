import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store } from "src/app/store";

import { Workout, WorkoutsService } from "src/health/shared/services/workouts/workouts.service";

@Component({
    selector: 'workouts',
    templateUrl: 'workouts.component.html',
    styleUrls: ['workouts.component.scss']
})
export class WorkoutsComponent implements OnInit, OnDestroy {

    workouts$!: Observable<Workout[]>;
    subscription$!: Subscription;

    constructor(
        private workoutsService: WorkoutsService, 
        private store: Store,
    ) {}

    ngOnInit(): void {
        this.workouts$ = this.store.select<Workout[]>('workouts');
        this.subscription$ = this.workoutsService.workouts$.subscribe();
    }

    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }

    removeWorkout(event: Workout) {
        this.workoutsService.removeWorkout(event.key as string);
    }
}