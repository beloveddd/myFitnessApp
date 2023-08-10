import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Observable, filter, first, map, of, switchMap, tap } from "rxjs";

import { Store } from "src/app/store";
import { AuthService } from 'src/auth/shared/services/auth/auth.service';

export interface Workout {
    name: string,
    type: string,
    strength: any,
    endurance: any,
    timestamp: number,
    key: string | null,
    $exists: () => boolean,
}

@Injectable()
export class WorkoutsService {

    uid!: string;
    workouts$: Observable<Workout[]> = this.authService.user.pipe(
        first(),
        switchMap(user => {
            this.uid = user.uid;
            return this.db.list<Workout>(`workouts/${this.uid}`).snapshotChanges();
        }),
        map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() })) as Workout[];
        }),
        tap(next => {
            this.store.set('workouts', next);
        })
    );

    constructor(
        private store: Store,
        private db: AngularFireDatabase,
        private authService: AuthService,
    ) {}

    addWorkout(workout: Workout) {
        return this.db.list(`workouts/${this.uid}`).push(workout);
    }

    updateWorkout(key: string, workout: Workout) {
        return this.db.object(`workouts/${this.uid}/${key}`).update(workout);

    }

    removeWorkout(key: string) {
        return this.db.list(`workouts/${this.uid}`).remove(key);
    }

    getWorkout(key: string) {
        if (!key) {
            return of({});
        }

        return this.store.select<Workout[]>('workouts').pipe(
            filter(Boolean),
            map((workouts) => workouts.find((Workout: Workout) => Workout.key === key))
        );
    }
}