import { Component, ElementRef, ViewChild } from '@angular/core';

import { Perfil } from './clases/Perfil/perfil';

import { PortafolioService } from './servicio/portafolio.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'PortafolioWeb';


  datos?:Perfil;
  oscuro:boolean=false;
  login:boolean=false;

constructor(private datosPortafolio:PortafolioService){
 
  this.datosPortafolio.obtenerDatos().subscribe((data:Perfil) =>{
    console.log(data);

       this.datos=data;
 

  });


}
  modoOscuro($event:boolean){
    this.oscuro=$event;

  }
  ocultarLogin($event:boolean){
    this.login=$event;
  }
  @ViewChild('pdf',{static:true})canva!:ElementRef<HTMLImageElement>
  descargar(e:any){
     const opciones={allowTaint:true,useCORS:true,scale:1}
      html2canvas(this.canva.nativeElement,opciones).then((canvas)=>{

          var pdf=new jsPDF('p','pt','a3')
          var img=canvas.toDataURL("image/png")
          const pdfw=pdf.internal.pageSize.getWidth()
          const pdfh=pdf.internal.pageSize.getHeight()
          pdf.addImage(img,'PNG',0,0,pdfw,pdfh,undefined,'FAST')
          pdf.save(`CV_${this.datos?.personal.ape}${this.datos?.personal.nom}.pdf`)
      })
  }
}
