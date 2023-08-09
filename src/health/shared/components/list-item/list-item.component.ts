import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'list-item',
    templateUrl: 'list-item.component.html',
    styleUrls: ['list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {

    @Input()
    item: any;

    @Output()
    remove = new EventEmitter<any>();

    toggled = false;

    constructor() {}

    getRoute(item: any) {
        return [`../meals`, item.key];
    }

    toggle():void {
        this.toggled = !this.toggled;
    } 
    
    removeItem():void {
        this.remove.emit(this.item);
    }
}