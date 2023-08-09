import { ChangeDetectionStrategy, Component, EventEmitter, Output } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { Meal } from "src/health/shared/services/meals/meals.service";

@Component({
    selector: 'meal-form',
    templateUrl: 'meal-form.component.html',
    styleUrls: ['meal-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealFormComponent{

    @Output()
    create = new EventEmitter<Meal>();

    form: FormGroup<any> = this.fb.group({
        name: ['', Validators.required],
        ingredients: this.fb.array(['']),
    });

    constructor(private fb: FormBuilder) {}

    get ingredients() {
        return this.form.get('ingredients') as FormArray;
    }

    get required() {
        return this.form.get('name')?.hasError('required') && this.form.get('name')?.touched;
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
}