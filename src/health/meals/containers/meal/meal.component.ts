import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { Meal, MealsService } from "src/health/shared/services/meals/meals.service";

@Component({
    selector: 'meal',
    templateUrl: 'meal.component.html',
    styleUrls: ['meal.component.scss']
})
export class MealComponent {

    constructor(
        private mealsService: MealsService,
        private router: Router,
    ) {}

    async addMeal(event: Meal) {
       await this.mealsService.addMeal(event);
       this.backToMeals();
    }

    backToMeals() {
        this.router.navigate(['meals']);
    }
}