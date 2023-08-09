import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Observable, first, tap } from "rxjs";

import { Store } from "src/app/store";
import { AuthService } from 'src/auth/shared/services/auth/auth.service';

export interface Meal {
    name: string,
    ingredients: string[],
    timestamp: number,
    $key: string,
    $exists: () => boolean,
}

@Injectable()
export class MealsService {

    meals$!: Observable<Meal[]>;

    constructor(
        private store: Store,
        private db: AngularFireDatabase,
        private authService: AuthService,
    ) {
        this.getUid();
    }

    getUid() {
        this.authService.user.pipe(first()).subscribe((user) => {
            this.meals$ = this.db.list<Meal>(`meals/${user.uid}`).valueChanges().pipe(
                first(),
                tap((next) => {
                    this.store.set('meals', next)
                })
            );    
        });
    }
}