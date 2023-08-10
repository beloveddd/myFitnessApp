import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription, switchMap } from "rxjs";

import { Workout, WorkoutsService } from "src/health/shared/services/workouts/workouts.service";

@Component({
    selector: 'workout',
    templateUrl: 'workout.component.html',
    styleUrls: ['workout.component.scss']
})
export class WorkoutComponent implements OnInit, OnDestroy {

    workout$!: Observable<Workout | {} | undefined>;
    subscription$!: Subscription;

    constructor(
        private workoutsService: WorkoutsService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.subscription$ = this.workoutsService.workouts$.subscribe();
        this.workout$ = this.route.params.pipe(
            switchMap((param) => {
                return this.workoutsService.getWorkout(param['id']);
            }));
    }

    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }

    async addWorkout(event: Workout) {
       await this.workoutsService.addWorkout(event);
       this.backToWorkouts();
    }

    async updateWorkout(event: Workout) {
        const key = this.route.snapshot.params['id'];

        await this.workoutsService.updateWorkout(key, event);
        this.backToWorkouts();
    }

    async removeWorkout(event: Workout) {
        const key = this.route.snapshot.params['id'];

        await this.workoutsService.removeWorkout(key);
        this.backToWorkouts();
    }

    backToWorkouts() {
        this.router.navigate(['workouts']);
    }

    hasWorkoutName(workout: Workout | {} | undefined): boolean {
        return !!workout && ('name' in workout) && (workout as Workout).name !== undefined;
    }    
}