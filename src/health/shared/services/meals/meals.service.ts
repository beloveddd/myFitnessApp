import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Observable, first, map, tap } from "rxjs";

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

    meals$!: any;
    uid!: string;

    constructor(
        private store: Store,
        private db: AngularFireDatabase,
        private authService: AuthService,
    ) {
        this.getUid();
    }

    getUid() {
        this.authService.user.pipe(first()).subscribe((user) => {
            this.uid = user.uid;

            this.meals$ = this.db.list<Meal>(`meals/${user.uid}`).snapshotChanges().pipe(
                map(changes => {
                    return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
                }),
                first(),
                tap(next => {
                    this.store.set('meals', next);
                })
            );
    })
    }

    addMeal(meal: Meal) {
        return this.db.list(`meals/${this.uid}`).push(meal);
    }

    removeMeal(key: string) {
        return this.db.list(`meals/${this.uid}`).remove(key);
    }
}