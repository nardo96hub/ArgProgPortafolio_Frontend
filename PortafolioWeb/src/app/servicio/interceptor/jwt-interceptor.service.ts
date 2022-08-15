import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private user:UserService) {}

 intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let req=request
    let perfilUrl=environment.api+"/perfil"//"http://localhost:8080/api/perfil"
   if(!req.url.includes(perfilUrl)){
    const token=this.user.obtenerUsuarioLogueado().token
    
      if(token!=null){
        
       req=request.clone({ headers: req.headers.set('Authorization','Bearer ' + token)})
       
      }else{
        console.log("error en jwt Interceptor");
      }
    }
   
   return next.handle(req)
    
  }
}
