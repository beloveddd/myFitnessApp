import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { Meal } from "src/health/shared/services/meals/meals.service";

@Component({
    selector: 'meal-form',
    templateUrl: 'meal-form.component.html',
    styleUrls: ['meal-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealFormComponent implements OnChanges{

    @Input()
    meal!: Meal | {};

    @Output()
    create = new EventEmitter<Meal>();

    @Output()
    update = new EventEmitter<Meal>();

    @Output()
    remove = new EventEmitter<Meal>();

    toggled: boolean = false;
    exists: boolean = false;

    form: FormGroup<any> = this.fb.group({
        name: ['', Validators.required],
        ingredients: this.fb.array(['']),
    });

    get ingredients() {
        return this.form.get('ingredients') as FormArray;
    }

    get required() {
        return this.form.get('name')?.hasError('required') && this.form.get('name')?.touched;
    }

    constructor(private fb: FormBuilder) {}

    ngOnChanges(): void {
        if (this.meal && (this.meal as Meal).name) {
            const value = this.meal;

            this.form.patchValue(value);
            this.exists = true;

            this.emptyIngredients();

            if ((value as Meal).ingredients) {
                for (const item of (value as Meal).ingredients) {
                    this.ingredients.push(new FormControl(item));
                }
            }
        }
    }

    emptyIngredients() {
        while(this.ingredients.controls.length) {
            this.ingredients.removeAt(0);
        }
    }

    addIngredient() {
        this.ingredients.push(new FormControl(''));
    }

    removeIngredient(index: number) {
        this.ingredients.removeAt(index);
    }

    createMeal() {
        if (this.form.valid) {
            this.create.emit(this.form.value);
        }
    }

    updateMeal() {
        if (this.form.valid) {
            this.update.emit(this.form.value);
        }
    }

    removeMeal() {
        this.remove.emit(this.form.value);
    }

    toggle() {
        this.toggled = !this.toggled;
    }
}