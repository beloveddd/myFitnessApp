import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Meal } from "src/health/shared/services/meals/meals.service";
import { ScheduleItem } from "src/health/shared/services/schedule/schedule.service";
import { Workout } from "src/health/shared/services/workouts/workouts.service";


@Component({
    selector: 'schedule-assign',
    templateUrl: 'schedule-assign.component.html',
    styleUrls: ['schedule-assign.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleAssignComponent implements OnInit {

    @Input()
    section!: any;
  
    @Input()
    list!: (Meal | Workout)[];
  
    @Output()
    update = new EventEmitter<any>();

    @Output()
    cancel = new EventEmitter<any>();

    isItemSelected!: boolean;

    private selected: string[] = [];

    ngOnInit(): void {
        this.selected = [...this.section.assigned];
    }

    getRoute(name: string) {
        return [`../${name}/new`];
    }

    exists(name: string) {
        return !!~this.selected.indexOf(name);
    }

    toggleItem(name: string) {
        if (this.exists(name)) {
            this.isItemSelected = true;
            this.selected = this.selected.filter(item => item !== name);
        } else {
            this.isItemSelected = false;
            this.selected = [...this.selected, name]; 
        }
    }

    updateAssign() {
        this.update.emit({
            [this.section.type]: this.selected
        });
    }

    cancelAssign() {
        this.cancel.emit();
    }
}