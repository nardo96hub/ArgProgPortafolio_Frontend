import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Acerca } from 'src/app/clases/Acerca/acerca';
import { Perfil } from 'src/app/clases/Perfil/perfil';
import { PortafolioService } from 'src/app/servicio/portafolio.service';


@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css']
})
export class AcercaComponent implements OnInit {

  
  @Input() info?:Perfil;
  @Input() Login?:boolean;
  @Input() oscuro?:boolean;
  name=new FormControl('');
  id=new FormControl('');
  form:FormGroup
 
  constructor(private  builder:FormBuilder,private service:PortafolioService) {
    this.form=this.builder.group({
      acer:[''],
      id:['']
     
    }); 
   }
  

  ngOnInit(): void {
  }
  actualizarAcer(){
    const acer=new Acerca(this.form.get('acer')?.value,this.form.get('id')?.value);
    this.service.actualizarAcerca(acer).subscribe((resul)=>{
      
      
      this.service.obtenerDatos().subscribe((perfil:Perfil)=>{
        this.info=perfil;
      })
    })

  }
  editar_acerca(dato:Acerca){
  
    this.form.get('id')?.setValue(dato.id_acer);
   this.form.get('acer')?.setValue(dato.acer);
  
  }
}
