import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { Meal } from "src/health/shared/services/meals/meals.service";
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
    });

    // get ingredients() {
    //     return this.form.get('ingredients') as FormArray;
    // }

    get required() {
        return this.form.get('name')?.hasError('required') && this.form.get('name')?.touched;
    }

    constructor(private fb: FormBuilder) {}

    ngOnChanges(): void {
        // if (this.meal && (this.meal as Meal).name) {
        //     const value = this.meal;

        //     this.form.patchValue(value);
        //     this.exists = true;

        //     this.emptyIngredients();

        //     if ((value as Meal).ingredients) {
        //         for (const item of (value as Meal).ingredients) {
        //             this.ingredients.push(new FormControl(item));
        //         }
        //     }
        // }
    }

    // emptyIngredients() {
    //     while(this.ingredients.controls.length) {
    //         this.ingredients.removeAt(0);
    //     }
    // }

    // addIngredient() {
    //     this.ingredients.push(new FormControl(''));
    // }

    // removeIngredient(index: number) {
    //     this.ingredients.removeAt(index);
    // }

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