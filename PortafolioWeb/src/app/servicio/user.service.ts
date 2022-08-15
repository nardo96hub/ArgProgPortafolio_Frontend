import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtDto } from '../clases/Security/jwt-dto';
import { Login } from '../clases/Security/login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url=environment.api
  private currentUserSubject:BehaviorSubject<any>
  constructor(private http:HttpClient) { 
    this.currentUserSubject=new BehaviorSubject<JwtDto>(JSON.parse(sessionStorage.getItem('User')!))
  }

  public agregarSession(data:JwtDto){

    sessionStorage.setItem('User',JSON.stringify(data))
    this.currentUserSubject.next(data)

  }
  public logout():Observable<any>{
    const dato:Observable<any>=this.http.get<any>(`${this.url}/perfil/logout`)
     sessionStorage.removeItem('User')
     this.currentUserSubject.next(null)
    return dato
   }
   public login(login:Login):Observable<JwtDto>{
    return this.http.post<JwtDto>(`${this.url}/perfil/login`,login)
  }
  public obtenerUsuarioLogueado():JwtDto{
    return this.currentUserSubject.value
  }
}
