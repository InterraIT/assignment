import { ChangeDetectorRef, Component } from '@angular/core';
import { CustomToastrService } from './services/custom-toastr.service';
import { Subscription } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger(
      'toastrAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000)',
              style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000)',
              style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})

export class AppComponent {
  title = 'rethink';
  private toastrSubscription: Subscription;
  toastrData: any = {};
  private timeoutID: any = undefined;
  constructor(private toastr: CustomToastrService, private _changeDetect: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.toastrSubscription = this.toastr.showToastr.subscribe(
      (toastrData: any) => {
        this.toastrData = toastrData;
        if (Object.entries(toastrData).length > 0) {
          if (this.timeoutID) {
            clearTimeout(this.timeoutID);
            this.timeoutID = undefined;
          };

          this.timeoutID = setTimeout(() => {
            this.toastrData = {};
          }, 500);

        } else {
          clearTimeout(this.timeoutID);
        };
        this._changeDetect.markForCheck();

      });
  }
  ngOnDestroy(): void {
    this.toastrSubscription.unsubscribe();
  }
  closeAction(toastrAction: any) {
    this.toastrData = toastrAction;
  }
}
