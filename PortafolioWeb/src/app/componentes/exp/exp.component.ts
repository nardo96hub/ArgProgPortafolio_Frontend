import { Component,Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Experiencia } from 'src/app/clases/Experiencia/experiencia';
import { Perfil } from 'src/app/clases/Perfil/perfil';
import { PortafolioService } from 'src/app/servicio/portafolio.service';

@Component({
  selector: 'app-exp',
  templateUrl: './exp.component.html',
  styleUrls: ['./exp.component.css']
})
export class ExpComponent implements OnInit {
  @Input() info?:Perfil;
  @Input() Login?:boolean;
  @Input() oscuro?:boolean;
  expForm:FormGroup

  constructor(private builder:FormBuilder,private service:PortafolioService) {
      this.expForm=this.builder.group({
        titulo:[''],
        empresa:[''],
        jornada:[''],
        anio:[''],
        lugar:[''],
        id:['']
      })
   }

  ngOnInit(): void {
  }
  exp:{id:string,emp:string,an:string,jor:string,lug:string,tit:string}={id:"",emp:"",an:"",jor:"",lug:"",tit:""}
  borrarExp(exp:Experiencia){
    this.service.borrarExp(exp).subscribe(r=>this.info=r)
  }
  inicializar(){
    this.expForm.get('empresa')?.setValue("")
    this.expForm.get('jornada')?.setValue("")
    this.expForm.get('anio')?.setValue("")
    this.expForm.get('lugar')?.setValue("")
    this.expForm.get('titulo')?.setValue("")
  }
  crearExp(){
    this.exp.id=this.expForm.get('id')?.value
    this.exp.emp=this.expForm.get('empresa')?.value
    this.exp.jor=this.expForm.get('jornada')?.value
    this.exp.an=this.expForm.get('anio')?.value
    this.exp.lug=this.expForm.get('lugar')?.value
    this.exp.tit=this.expForm.get('titulo')?.value

    const exp:Experiencia=new Experiencia(this.exp.tit,this.exp.emp,this.exp.jor,this.exp.an,this.exp.lug)
    this.service.crearExp(exp).subscribe(r=>this.info=r)
    
  }
  editarExp(){
    this.exp.id=this.expForm.get('id')?.value
    this.exp.emp=this.expForm.get('empresa')?.value
    this.exp.jor=this.expForm.get('jornada')?.value
    this.exp.an=this.expForm.get('anio')?.value
    this.exp.lug=this.expForm.get('lugar')?.value
    this.exp.tit=this.expForm.get('titulo')?.value

    const exp:Experiencia=new Experiencia(this.exp.tit,this.exp.emp,this.exp.jor,this.exp.an,this.exp.lug,this.exp.id)
    this.service.editarExp(exp).subscribe(r=>this.info=r)
  }
  editar_exp(exp:Experiencia){
 
    this.expForm.get('id')?.setValue(exp.id_Exp)
    this.expForm.get('empresa')?.setValue(exp.empresa)
    this.expForm.get('jornada')?.setValue(exp.jornada)
    this.expForm.get('anio')?.setValue(exp.anio)
    this.expForm.get('lugar')?.setValue(exp.lugar)
    this.expForm.get('titulo')?.setValue(exp.titulo)
  }


}
