import { ChangeDetectionStrategy, Component, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export const TYPE_CONTROL_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WorkoutTypeComponent),
    multi: true,
  };

@Component({
    selector: 'workout-type',
    templateUrl: 'workout-type.component.html',
    styleUrls: ['workout-type.component.scss'],
    providers: [TYPE_CONTROL_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutTypeComponent implements ControlValueAccessor {
    selectors = ['strength', 'endurance'];

    value!: string;

    private onModelChange: Function = () => {};
    private onTouch: Function = () => {};

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    registerOnChange(fn: any): void {
        this.onModelChange = fn;
    }

    writeValue(value: string): void {
        this.value = value;
    }

    setSelected(value: string) {
        this.value = value;
        this.onModelChange(this.value);
    }
}