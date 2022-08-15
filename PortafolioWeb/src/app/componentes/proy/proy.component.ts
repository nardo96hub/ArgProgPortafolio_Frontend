import { Component,Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Perfil } from 'src/app/clases/Perfil/perfil';
import { Proyecto } from 'src/app/clases/Proyecto/proyecto';
import { PortafolioService } from 'src/app/servicio/portafolio.service';

@Component({
  selector: 'app-proy',
  templateUrl: './proy.component.html',
  styleUrls: ['./proy.component.css']
})
export class ProyComponent implements OnInit {
  @Input() info?:Perfil;
  @Input() Login?:boolean
  @Input() oscuro?:boolean

  proyForm:FormGroup
  constructor(private builder:FormBuilder,private service:PortafolioService) {
    this.proyForm=this.builder.group({
      id:[''],
      nombreP:[''],
      descripcion:[''],
      url:['']
    })
   }

  ngOnInit(): void {
  }

  borrarProy(proy:Proyecto){
    this.service.borrarProy(proy).subscribe(r=>this.info=r)
  }

  inicializar(){
    this.proyForm.get('id')?.setValue("")
    this.proyForm.get('url')?.setValue("")
    this.proyForm.get('nombreP')?.setValue("")
    this.proyForm.get('descripcion')?.setValue("")
  }
  proy:{nombre:string,url:string,desc:string}={nombre:"",url:"",desc:""}
  crearProy(){
    this.proy.nombre=this.proyForm.get('nombreP')?.value
    this.proy.url=this.proyForm.get('url')?.value
    this.proy.desc=this.proyForm.get('descripcion')?.value
  
    const proy:Proyecto=new Proyecto(this.proy.nombre,this.proy.desc,this.proy.url)
    this.service.crearProy(proy).subscribe(r=>this.info=r)
  }  
  editar_proy(proy:Proyecto){
    this.proyForm.get('id')?.setValue(proy.id_proyecto)
    this.proyForm.get('url')?.setValue(proy.link)
    this.proyForm.get('nombreP')?.setValue(proy.nombreP)
    this.proyForm.get('descripcion')?.setValue(proy.descripcion)
  }
  editarProy(){
    const id=this.proyForm.get('id')?.value
    const nom=this.proyForm.get('nombreP')?.value
    const desc=this.proyForm.get('descripcion')?.value
    const url=this.proyForm.get('url')?.value

    const proy:Proyecto=new Proyecto(nom,desc,url,id)
    this.service.editarProy(proy).subscribe(r=>this.info=r)
  
  }

}
