import { Component,Input, OnInit } from '@angular/core';
import { Perfil } from 'src/app/clases/Perfil/perfil';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() info?:Perfil;
  @Input() modo_oscuro?:boolean
  foto:string="../../../assets/img/MyFoto.jpg"
  constructor() { }

  ngOnInit(): void {
  }

}
