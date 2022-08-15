
import { Component,ElementRef,EventEmitter,Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Perfil } from 'src/app/clases/Perfil/perfil';
import { Login } from 'src/app/clases/Security/login';
import { UserService } from 'src/app/servicio/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() info?:Perfil;
  @Output() oscuro=new EventEmitter<boolean>()
  @Output() log_inou=new EventEmitter<boolean>()
  @Output() evento=new EventEmitter<any>()
  estado:boolean=false
 
  login_out:boolean=false
  
  Login:string="LogIn"
  LoginForm:FormGroup
  testM="modal"
 
  loginUsuario?:Login
 

  constructor(private  builder:FormBuilder,private userService:UserService) {
    this.LoginForm=this.builder.group({
      user:['',Validators.required],
      contra:['',Validators.required]
    });
   }

  ngOnInit(): void {
  }
  modo(){
    
    this.estado=!this.estado;
    this.modooscuro();
  }
  modooscuro(){
    this.oscuro.emit(this.estado);
  }
  cambioslogin(){
    this.login_out=!this.login_out
    if(this.login_out){
      this.Login="LogOut"
    }else{
      this.Login="LogIn"
    }
    this.loginout();
  }
  logout(){ 
    if(this.login_out){
      
      
      this.testM="modal"
      
    }
    
    this.login()
  }
  login(){
    
    if(!this.login_out){

      if(this.LoginForm.get('user')?.valid && this.LoginForm.get('contra')?.valid){
        const user=this.LoginForm.get('user')?.value;
        const contra=this.LoginForm.get('contra')?.value;
        this.loginUsuario=new Login(user,contra)
        this.userService.login(this.loginUsuario).subscribe(
          data=>{
            this.userService.agregarSession(data)
            console.log("Login exitoso");
            this.LoginForm.get('user')?.setValue("")
            this.LoginForm.get('contra')?.setValue("")
      
            this.testM=""
            this.cambioslogin()
          }
        )
      }
    }else{
      this.userService.logout().subscribe(borrar=>{
        console.log(borrar);
        
      });
    this.cambioslogin()
    }
  }
  loginout(){
    this.log_inou.emit(this.login_out)
  }

  
  descargarPdf(event:any){
    this.evento.emit(event)
     
  }

}
