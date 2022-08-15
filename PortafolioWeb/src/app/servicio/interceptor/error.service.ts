import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable,throwError  } from 'rxjs';
import { UserService } from '../user.service';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ErrorService implements HttpInterceptor{

  constructor(private user:UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(this.errorHandler))
  }

  errorHandler(error:HttpErrorResponse){
    if(error.status===401|| error.status===403){
      console.warn("Ocurrio un problema en Error");
      this.user.logout()
    }
    return throwError(error.message)
  }
}
