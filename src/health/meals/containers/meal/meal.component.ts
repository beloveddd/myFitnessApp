import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription, switchMap } from "rxjs";

import { Meal, MealsService } from "src/health/shared/services/meals/meals.service";

@Component({
    selector: 'meal',
    templateUrl: 'meal.component.html',
    styleUrls: ['meal.component.scss']
})
export class MealComponent implements OnInit, OnDestroy {

    meal$!: Observable<Meal | {} | undefined>;
    subscription$!: Subscription;

    constructor(
        private mealsService: MealsService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.subscription$ = this.mealsService.meals$.subscribe();
        this.meal$ = this.route.params.pipe(
            switchMap((param) => {
                return this.mealsService.getMeal(param['id']);
            }));
    }

    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }

    async addMeal(event: Meal) {
       await this.mealsService.addMeal(event);
       this.backToMeals();
    }

    async updateMeal(event: Meal) {
        const key = this.route.snapshot.params['id'];

        await this.mealsService.updateMeal(key, event);
        this.backToMeals();
    }

    async removeMeal(event: Meal) {
        const key = this.route.snapshot.params['id'];

        await this.mealsService.removeMeal(key);
        this.backToMeals();
    }

    backToMeals() {
        this.router.navigate(['meals']);
    }

    hasMealName(meal: Meal | {} | undefined): boolean {
        return !!meal && ('name' in meal) && (meal as Meal).name !== undefined;
    }    
}