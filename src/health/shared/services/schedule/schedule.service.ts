import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { BehaviorSubject, Observable, map, switchMap, tap } from "rxjs";

import { Store } from "src/app/store";
import { Meal } from "../meals/meals.service";
import { AuthService } from "src/auth/shared/services/auth/auth.service";

export interface Workout {
    name: string,
    type: string,
    strength: any,
    endurance: any,
    timestamp: number,
    key: string | null,
    $exists: () => boolean,
}

export interface ScheduleItem {
    meals: Meal[],
    workouts: Workout[],
    section: string,
    timestamp: number,
    $key?: string
  }
  
  export interface ScheduleList {
    morning?: ScheduleItem,
    lunch?: ScheduleItem,
    evening?: ScheduleItem,
    snacks?: ScheduleItem,
    [key: string]: any
  }

@Injectable()
export class ScheduleService {

    private date$ = new BehaviorSubject(new Date());

    schedule$: Observable<ScheduleItem[]> = this.date$.pipe(
        tap((next: any) => this.store.set('date', next)),
        map((day: any) => {

            const startAt = (
                new Date(day.getFullYear(), day.getMonth(), day.getDate())
            ).getTime();

            const endAt = (
                new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
            ).getTime() - 1;

            return { startAt, endAt };

        }),
        switchMap(({ startAt, endAt }) => {
            return this.getSchedule(startAt, endAt);
        }),
        map((data: any) => {
            const mapped: ScheduleList = {};

            for (const prop of data) {
                if (!mapped[prop.section]) {
                    mapped[prop.section] = prop;
                }
            }

            return mapped;
        }),
        tap((next: any) => this.store.set('schedule', next))
    );

    get uid() {
        return this.authService.user.pipe(
            map((user) => user.uid)
        );
    }    

    constructor(
        private store: Store,
        private db: AngularFireDatabase,
        private authService: AuthService,
    ) {}

    updateDate(date: Date) {
        this.date$.next(date);
    }

    private getSchedule(startAt: number, endAt: number) {
        return this.uid.pipe(
            switchMap(uid => {
                return this.db.list(`schedule/${uid}`, ref => {
                    return ref.orderByChild('timestamp').startAt(startAt).endAt(endAt);
                }).valueChanges();
            })
        );
    }    
}