import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Acerca } from '../clases/Acerca/acerca';
import { Educacion } from '../clases/Edu/educacion';
import { Experiencia } from '../clases/Experiencia/experiencia';
import { Imagen } from '../clases/Imagen/imagen';
import { Perfil } from '../clases/Perfil/perfil';
import { Redes } from '../clases/Personal/redes';
import { Proyecto } from '../clases/Proyecto/proyecto';
import { Skill } from '../clases/Skill/skill';

@Injectable({
  providedIn: 'root'
})
export class PortafolioService {

  url:string=environment.api
  constructor(private http:HttpClient) { }
  obtenerDatos():Observable<Perfil>{
    return this.http.get<Perfil>(`${this.url}/perfil/get`);
   
  }
  
  // Acerca
  actualizarAcerca(acer:Acerca):Observable<Perfil>{
    return this.http.put<Perfil>(`${this.url}/acerca`,acer)
  }
  //Informacio
  editarInfoP(per:Perfil):Observable<Perfil>{
    return this.http.put<Perfil>(`${this.url}/info/editar/infoP`,per)
  }
  editarRedes(red:Redes):Observable<Perfil>{
    return this.http.put<Perfil>(`${this.url}/info/editar/redes`,red)
  }
  editarFoto(foto:Imagen):Observable<Perfil>{
    return this.http.put<Perfil>(`${this.url}/info/editar/fotos`,foto)
  }
  //Experiencia
  crearExp(exp:Experiencia):Observable<Perfil>{
    return this.http.post<Perfil>(`${this.url}/exp/crear`,exp)
  }
  editarExp(exp:Experiencia):Observable<Perfil>{
    return this.http.put<Perfil>(`${this.url}/exp/editar/${exp.id_Exp}`,exp)
  }
  borrarExp(exp:Experiencia):Observable<Perfil>{
    return this.http.delete<Perfil>(`${this.url}/exp/eliminar/${exp.id_Exp}`)
  }

  //Educacion
  crearEdu(edu:Educacion):Observable<Perfil>{
    return this.http.post<Perfil>(`${this.url}/edu/crear`,edu)
  }
  editarEdu(edu:Educacion):Observable<Perfil>{
    return this.http.put<Perfil>(`${this.url}/edu/editar/${edu.id_Edu}`,edu)
  }
  borrarEdu(edu:Educacion):Observable<Perfil>{
    return this.http.delete<Perfil>(`${this.url}/edu/eliminar/${edu.id_Edu}`)
  }
  // Skill
  crearSkill(skill:Skill):Observable<Perfil>{
    return this.http.post<Perfil>(`${this.url}/skill`,skill)
  }

  editarSkill(skill:Skill):Observable<Perfil>{
    return this.http.put<Perfil>(`${this.url}/skill/editar/${skill.id_Skill}`,skill);
  }

  borrarSkillId(skill:Skill):Observable<Perfil>{
    return this.http.delete<Perfil>(`${this.url}/skill/borrar/${skill.id_Skill}`)
  }
  //Proyecto
  crearProy(proy:Proyecto):Observable<Perfil>{
    return this.http.post<Perfil>(`${this.url}/proy/crear`,proy)
  }
  editarProy(proy:Proyecto):Observable<Perfil>{
    return this.http.put<Perfil>(`${this.url}/proy/editar/${proy.id_proyecto}`,proy)
  }
  borrarProy(proy:Proyecto):Observable<Perfil>{
    return this.http.delete<Perfil>(`${this.url}/proy/eliminar/${proy.id_proyecto}`)
  }
}
