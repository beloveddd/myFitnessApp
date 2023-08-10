import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { BehaviorSubject, Observable, tap } from "rxjs";

import { Store } from "src/app/store";

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
export class ScheduleService {

    private date$ = new BehaviorSubject(new Date());

    schedule$: Observable<any[]> = this.date$.pipe(
        tap((next: any) => this.store.set('date', next))
    );

    constructor(
        private store: Store,
        private db: AngularFireDatabase,
    ) {}
}