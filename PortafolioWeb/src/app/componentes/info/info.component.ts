import { Component, Input ,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Imagen } from 'src/app/clases/Imagen/imagen';
import { Perfil } from 'src/app/clases/Perfil/perfil';
import { Redes } from 'src/app/clases/Personal/redes';
import { PortafolioService } from 'src/app/servicio/portafolio.service';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  @Input() info?:Perfil;
  @Input() Login?:boolean;
  @Input() oscuro?:boolean;
  infoForm:FormGroup
  redForm:FormGroup
  imgForm:FormGroup
  activador:{inf:boolean,img:boolean,red:boolean}={red:true,inf:true,img:true}
  
  perfilOriginal:string=""
  portadaOriginal:string=""
  perfil=""
  portada=""
  

  constructor(private builder:FormBuilder,private service:PortafolioService) { 
    this.infoForm=this.builder.group({
      puesto:[''],
      localidad:['']
    })
    this.redForm=this.builder.group({
      face:[''],
      twi:[''],
      ins:[''],
      git:[''],
      link:[''],
    })
    this.imgForm=this.builder.group({
      perfil:[''],
      portada:['']
    })
  }

  ngOnInit(): void {
  }
  editar_info(){
   this.cambioBotones("1")
   this.imgForm.get('perfil')?.setValue(this.info?.imagen.perfil)
   this.imgForm.get('portada')?.setValue(this.info?.imagen.portada)
   this.perfilOriginal=this.info?.imagen.perfil!
   this.portadaOriginal=this.info?.imagen.portada!
   this.redForm.get('face')?.setValue(this.info?.personal.redes.facebook)
   this.redForm.get('twi')?.setValue(this.info?.personal.redes.twitter)
   this.redForm.get('ins')?.setValue(this.info?.personal.redes.instagram)
   this.redForm.get('git')?.setValue(this.info?.personal.redes.github)
   this.redForm.get('link')?.setValue(this.info?.personal.redes.linkedin)
   this.infoForm.get('puesto')?.setValue(this.info?.puesto)
   this.infoForm.get('localidad')?.setValue(this.info?.personal.localidad)
  
  }
  editarRedes(){
    const fac=this.redForm.get('face')?.value
    const twi=this.redForm.get('twi')?.value
    const ins=this.redForm.get('ins')?.value
    const git=this.redForm.get('git')?.value
    const lin=this.redForm.get('link')?.value
    const red:Redes=new Redes(twi,fac,ins,git,lin)

    this.service.editarRedes(red).subscribe(r=>this.info=r)
  }
  editarInfo(){
    const pue= this.infoForm.get('puesto')?.value
    const loc= this.infoForm.get('localidad')?.value
    const per=this.info
    per?.puesto!=pue
    per?.personal?.localidad!=loc
    this.service.editarInfoP(per!).subscribe(r=>this.info=r)
  }
  editarImagen(){
    const per=this.imgForm.get('perfil')?.value
    const por=this.imgForm.get('portada')?.value
    const foto=new Imagen(por,per)
    this.service.editarFoto(foto).subscribe(r=>this.info=r)
  }
  cambioBotones(a:string){
    switch(a){
      case "1":{
        this.activador.red=false
        this.activador.inf=true
        this.activador.img=false

        break
      }
      case "2":{
        this.portada=this.imgForm.get('portada')?.value
        this.perfil=this.imgForm.get('perfil')?.value
        this.portadaOriginal=this.portada
        this.perfilOriginal=this.perfil

        this.activador.red=false
        this.activador.inf=false
        this.activador.img=true


       break
      }
      case "3":{
        this.activador.red=true
    this.activador.inf=false
    this.activador.img=false

        break
      }
    }
    
  }
  imagenPerfil(event:any){
    this.perfil=event.target.value
  }
  imagenPortada(event:any){
    this.portada=event.target.value
  }
  volverPerfil(){
    this.imgForm.get('perfil')?.setValue(this.perfilOriginal)
    this.perfil=this.imgForm.get('perfil')?.value
  }
  volverPortada(){
    this.imgForm.get('portada')?.setValue(this.portadaOriginal)
    this.portada=this.imgForm.get('portada')?.value
  }
  borrarPerfil(){
    this.imgForm.get('perfil')?.setValue("")
    this.perfil=this.imgForm.get('perfil')?.value
  }
  borrarPortada(){
    this.imgForm.get('portada')?.setValue("")
    this.portada=this.imgForm.get('portada')?.value
  }

}
