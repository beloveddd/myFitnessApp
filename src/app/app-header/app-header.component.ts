import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { User } from 'src/auth/shared/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.component.html',
  styleUrls: ['app-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderComponent implements OnInit, OnDestroy {
    @Input() user!: User;

    @Output()
    logout = new EventEmitter<any>();

    constructor() {}

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    logoutUser(): void {
        this.logout.emit();
    }
}
