import { Component, Input, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormBuilder } from '@angular/forms';
import { Educacion } from 'src/app/clases/Edu/educacion';
import { Perfil } from 'src/app/clases/Perfil/perfil';
import { PortafolioService } from 'src/app/servicio/portafolio.service';

@Component({
  selector: 'app-edu',
  templateUrl: './edu.component.html',
  styleUrls: ['./edu.component.css']
})
export class EduComponent implements OnInit {
 // crear="crearEdu";
  @Input() info?:Perfil
  @Input() Login?:boolean;
  @Input() oscuro?:boolean;
  eduForm:FormGroup
  constructor(private builder:FormBuilder,private service:PortafolioService) { 
      this.eduForm=this.builder.group({
        id:[''],
        lugar:[''], 
        titulo:[''], 
        anio:[''] 
      })
  }

  ngOnInit(): void {
  }
  inicializar(){
   
    this.eduForm.get('lugar')?.setValue("")
    this.eduForm.get('titulo')?.setValue("")
    this.eduForm.get('anio')?.setValue("")
  }
  borrarEdu(edu:Educacion){
    this.service.borrarEdu(edu).subscribe(r=>this.info=r)
  }

  editar_edu(edu:Educacion){
    this.eduForm.get('id')?.setValue(edu.id_Edu)
    this.eduForm.get('lugar')?.setValue(edu.lugar)
    this.eduForm.get('titulo')?.setValue(edu.titulo)
    this.eduForm.get('anio')?.setValue(edu.anio)
  }
  edu:{lug:string,tit:string,an:string}={tit:"",an:"",lug:""}
  crearEdu(){
     this.edu.an=this.eduForm.get('anio')?.value
     this.edu.tit=this.eduForm.get('titulo')?.value
     this.edu.lug=this.eduForm.get('lugar')?.value

     const edu:Educacion=new Educacion(this.edu.lug,this.edu.tit,this.edu.an)
    this.service.crearEdu(edu).subscribe(r=>this.info=r)
  }
  editarEdu(){
    const id=this.eduForm.get('id')?.value
    const an=this.eduForm.get('anio')?.value
    const tit=this.eduForm.get('titulo')?.value
    const lug=this.eduForm.get('lugar')?.value

    const edu:Educacion=new Educacion(lug,tit,an,id)
    this.service.editarEdu(edu).subscribe(r=>this.info=r)
  }

}
