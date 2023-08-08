import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: 'app-nav.component.html',
  styleUrls: ['app-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppNavComponent implements OnInit, OnDestroy{

  constructor() {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
