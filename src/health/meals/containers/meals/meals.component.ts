import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store } from "src/app/store";

import { Meal, MealsService } from "src/health/shared/services/meals/meals.service";

@Component({
    selector: 'meals',
    templateUrl: 'meals.component.html',
    styleUrls: ['meals.component.scss']
})
export class MealsComponent implements OnInit, OnDestroy {

    meals$!: Observable<Meal[]>;
    subscription$!: Subscription;

    constructor(
        private mealsService: MealsService, 
        private store: Store,
        private cd: ChangeDetectorRef
        ) {}

    ngOnInit(): void {
        this.meals$ = this.store.select<Meal[]>('meals');
        this.subscription$ = this.mealsService.meals$.subscribe();
    }

    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }

    removeMeal(event: Meal) {
        this.mealsService.removeMeal(event.key as string);
        this.cd.markForCheck()
        this.meals$.subscribe((meals) => console.log(meals))
    }
}