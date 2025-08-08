import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-base',
  imports: [],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent implements OnDestroy {

   protected destroy$ = new Subject<void>();
  
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
}

