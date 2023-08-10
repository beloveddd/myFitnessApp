import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Workout } from "src/health/shared/services/workouts/workouts.service";

@Component({
    selector: 'workout-form',
    templateUrl: 'workout-form.component.html',
    styleUrls: ['workout-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutFormComponent implements OnChanges{

    @Input()
    workout!: Workout| {};

    @Output()
    create = new EventEmitter<Workout>();

    @Output()
    update = new EventEmitter<Workout>();

    @Output()
    remove = new EventEmitter<Workout>();

    toggled: boolean = false;
    exists: boolean = false;

    form: FormGroup<any> = this.fb.group({
        name: ['', Validators.required],
        type: 'strength',
        strength: this.fb.group({
            reps: 0,
            sets: 0,
            weight: 0,
        }),
        endurance: this.fb.group({
            distance: 0,
            duration: 0,
        }),
    });

    get required() {
        return this.form.get('name')?.hasError('required') && this.form.get('name')?.touched;
    }

    get placeholder() {
        return `e.g. ${ this.form.get('type')?.value === 'strength' ? 'Benchpress' : 'Treadmill'}`;
    }

    constructor(private fb: FormBuilder) {}

    ngOnChanges(): void {
        if (this.workout && (this.workout as Workout).name) {
            const value = this.workout;

            this.form.patchValue(value);
            this.exists = true;
        }
    }

    createWorkout() {
        if (this.form.valid) {
            this.create.emit(this.form.value);
        }
    }

    updateWorkout() {
        if (this.form.valid) {
            this.update.emit(this.form.value);
        }
    }

    removeWorkout() {
        this.remove.emit(this.form.value);
    }

    toggle() {
        this.toggled = !this.toggled;
    }
}