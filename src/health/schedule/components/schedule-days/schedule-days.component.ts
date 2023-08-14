import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";


@Component({
    selector: 'schedule-days',
    templateUrl: 'schedule-days.component.html',
    styleUrls: ['schedule-days.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleDaysComponent {

    @Input()
    selected!: number;

    @Output()
    select = new EventEmitter<number>();

    days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    selectDay(index: number) {
        this.select.emit(index);
    }

}