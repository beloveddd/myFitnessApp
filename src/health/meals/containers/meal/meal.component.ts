import { Component } from "@angular/core";

import { Meal } from "src/health/shared/services/meals/meals.service";

@Component({
    selector: 'meal',
    templateUrl: 'meal.component.html',
    styleUrls: ['meal.component.scss']
})
export class MealComponent {

    constructor() {}

    addMeal(event: Meal) {
        console.log(event);
    }
}