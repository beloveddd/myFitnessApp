import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";

import { ScheduleService } from "src/health/shared/services/schedule/schedule.service";
import { Store } from "src/app/store";
@Component({
    selector: 'schedule',
    templateUrl: 'schedule.component.html',
    styleUrls: ['schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {

    date$!: Observable<Date>;
    subscriptions$: Subscription[] = [];

    constructor(
        private scheduleService: ScheduleService,
        private store: Store
    ) {}

    ngOnInit(): void {
        this.date$ = this.store.select('date');

        this.subscriptions$ = [
            this.scheduleService.schedule$.subscribe()
        ];
    }

    ngOnDestroy(): void {
        this.subscriptions$.forEach((sub) => sub.unsubscribe());
    }
}