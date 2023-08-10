import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, pluck } from 'rxjs';

import { User } from './../auth/shared/services/auth/auth.service';
import { Meal } from 'src/health/shared/services/meals/meals.service';
import { Workout } from 'src/health/shared/services/workouts/workouts.service';

export interface State {
  user: User,
  meals: Meal[],
  workouts: Workout[],
  date: Date,
  [key: string]: any
}

const state: State = {
  user: undefined!,
  meals: undefined!,
  workouts: undefined!,
  date: undefined!,
}

@Injectable({
  providedIn: 'root'
})
export class Store {

  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }

}