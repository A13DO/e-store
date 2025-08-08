import { ChangeDetectorRef, Component } from '@angular/core';
import { LoadingService } from './loading.service';
import { BaseComponent } from 'global/base/base.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent extends BaseComponent {
  constructor(
    private loadingService: LoadingService,
    private cdRef: ChangeDetectorRef
  ) {
    super();
    this.init();
  }
  isLoading: boolean = false;

  init() {
    this.loadingService
      .getSpinnerObsrv()
      .pipe(takeUntil(this.destroy$))
      .subscribe((status) => {
        this.isLoading = status === 'start';
        // this.cdRef.detectChanges();
      });
  }
}
