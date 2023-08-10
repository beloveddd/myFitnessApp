import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";


@Component({
    selector: 'schedule-controls',
    templateUrl: 'schedule-controls.component.html',
    styleUrls: ['schedule-controls.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleControlsComponent {

    @Input()
    selected!: Date;

    @Output()
    move = new EventEmitter<number>;

    offset = 0;

    moveDate(offset: number) {
        this.offset = offset;
        this.move.emit(this.offset);
    }

}