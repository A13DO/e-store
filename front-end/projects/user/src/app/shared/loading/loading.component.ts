import { ChangeDetectorRef, Component } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  constructor(private loadingService: LoadingService, private cdRef: ChangeDetectorRef) {
    this.init()
  }
  isLoading: boolean = false;

  init() {
    this.loadingService.getSpinnerObsrv().subscribe(
      status => {
        this.isLoading = status === "start";
        // this.cdRef.detectChanges();
      }
    )
  }



}
