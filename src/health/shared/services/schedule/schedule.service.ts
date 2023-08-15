import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { BehaviorSubject, Observable, Subject, map, switchMap, tap, withLatestFrom } from "rxjs";

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
    meals: Meal[] | null,
    workouts: Workout[] | null,
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
    private section$ = new Subject();
    private itemList$ = new Subject();

    userId!: string;

    items$ = this.itemList$.pipe(
        withLatestFrom(this.section$),
        map(([items, section]: any[]) => {
            const id = section.data.key;
            const defaults: ScheduleItem = {
                workouts: null,
                meals: null,
                section: section.section,
                timestamp: new Date(section.day).getTime(),
            };
            const payload = {
                ...(id ? section.data : defaults),
                ...items
            };

            if (id) {
                return this.updateSection(id, payload);
            } else {
                return this.createSection(payload);
            }
        })
    );

    selected$ = this.section$.pipe(
        tap((next: any) => {
            this.store.set('selected', next)
        })
    )

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

    list$ = this.section$.pipe(
        map((value: any) => this.store.value[value.type]),
        tap((next: any) => this.store.set('list', next))
    )

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

    selectSection(event: any) {
        this.section$.next(event);
    }

    updateItems(items: string[]) {
        this.itemList$.next(items);
    }

    private createSection(payload: ScheduleItem) {
        return this.db.list(`schedule/${this.userId}`).push(payload);
    }

    private updateSection(key: string, payload: ScheduleItem) {
        return this.db.object(`schedule/${this.userId}/${key}`).update(payload);
    }

    private getSchedule(startAt: number, endAt: number) {
        return this.uid.pipe(
            switchMap(uid => {
                this.userId = uid;
                return this.db.list<ScheduleItem>(`schedule/${uid}`, ref => {
                    return ref.orderByChild('timestamp').startAt(startAt).endAt(endAt);
                }).snapshotChanges();
            }),
            map(changes => {
                return changes.map(c => ({ key: c.payload.key, ...c.payload.val() })) as ScheduleItem[];
            })
        );
    }    
}