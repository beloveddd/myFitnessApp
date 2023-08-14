import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { ScheduleItem, ScheduleList } from "src/health/shared/services/schedule/schedule.service";


@Component({
    selector: 'schedule-calendar',
    templateUrl: 'schedule-calendar.component.html',
    styleUrls: ['schedule-calendar.component.scss']
})
export class ScheduleCalendarComponent implements OnChanges {

    @Input()
    set date(date: Date) {
        this.selectedDate = new Date(date.getTime());
    }

    @Input()
    items!: ScheduleList;

    @Output()
    change = new EventEmitter<Date>;

    selectedDayIndex!: number;
    selectedDate!: Date;
    selectedWeek!: Date;

    sections = [
        { key: 'morning', name: 'Morning' },
        { key: 'lunch', name: 'Lunch' },
        { key: 'evening', name: 'Evening' },
        { key: 'snacks', name: 'Snacks and Drinks' },
    ];

    ngOnChanges(): void {
        this.selectedDayIndex = this.getToday(this.selectedDate);
        this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDate));
    }

    getSection(name: string): ScheduleItem {
        return this.items && this.items[name] || {};
    }

    onChange(weekOffset: number) {
        const startOfWeek = this.getStartOfWeek(new Date());
        const startDate = (
            new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate())
        );

        startDate.setDate(startDate.getDate() + (weekOffset *7));
        this.change.emit(startDate);
    }

    selectDay(index: number) {
        const selectedDay = new Date(this.selectedWeek);

        selectedDay.setDate(selectedDay.getDate() + index);
        this.change.emit(selectedDay);
    }

    private getStartOfWeek(date: Date) {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);

        return new Date(date.setDate(diff));
    }

    private getToday(date: Date) {
        let today = date.getDay() - 1;

        if (today < 0) {
            today = 6;
        }

        return today;
    }

}