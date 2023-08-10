import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Observable, first, map, switchMap, tap } from "rxjs";

import { Store } from "src/app/store";
import { AuthService } from 'src/auth/shared/services/auth/auth.service';

export interface Meal {
    name: string,
    ingredients: string[],
    timestamp: number,
    key: string | null,
    $exists: () => boolean,
}

@Injectable()
export class MealsService {

    uid!: string;
    meals$: Observable<Meal[]> = this.authService.user.pipe(
        first(),
        switchMap(user => {
            this.uid = user.uid;
            return this.db.list<Meal>(`meals/${this.uid}`).snapshotChanges();
        }),
        map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() })) as Meal[];
        }),
        tap(next => {
            this.store.set('meals', next);
        })
    );

    constructor(
        private store: Store,
        private db: AngularFireDatabase,
        private authService: AuthService,
    ) {}

    addMeal(meal: Meal) {
        return this.db.list(`meals/${this.uid}`).push(meal);
    }

    removeMeal(key: string) {
        return this.db.list(`meals/${this.uid}`).remove(key);
    }
}