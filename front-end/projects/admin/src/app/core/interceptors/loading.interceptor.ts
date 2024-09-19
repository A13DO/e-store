import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { LoadingService } from "../../shared/loading/loading.service";


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const urlHasSort = req.url.includes('sort=createdAt');
    // Check if the request is made using fetch
    if (req.method === 'GET') {
      this.loadingService.requestStarted();
    }
    return next.handle(req)
    .pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            if (req.method === 'GET') {
              this.loadingService.requestEnded() // Hide the loading screen
            }
          }
        },
        (error: HttpErrorResponse) => {
          if (req.method === 'GET') {
            this.loadingService.resetSpinner()
          }
          throw error
        }
      )
    )
  }
}
