import { Component, Input,OnInit } from '@angular/core';
import { FormGroup,FormControl, FormBuilder } from '@angular/forms';
import { Perfil } from 'src/app/clases/Perfil/perfil';
import { Skill } from 'src/app/clases/Skill/skill';
import { PortafolioService } from 'src/app/servicio/portafolio.service';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  @Input() info?:Perfil;
  @Input() Login?:boolean;
  @Input() oscuro?:boolean;
  
  
  niveles:string[]=["BASICO","INTERMEDIO","AVANZADO"];
  skillForm:FormGroup
  constructor(private  builder:FormBuilder,private service:PortafolioService) {
    this.skillForm=this.builder.group({
      id:[''],
      lenguaje:[''],
      nivel:['']
     
    }); 
   }

 
  ngOnInit(): void {
       
  }
  inicializar(){
      this.skillForm.get('lenguaje')?.setValue("")
      this.skillForm.get('nivel')?.setValue("BASICO")
  }
  skill:{lenguaje:string,nivel:string}={lenguaje:"",nivel:""};
  crearSkill(){
    this.skill.lenguaje=this.skillForm.get('lenguaje')?.value;
    this.skill.nivel=this.skillForm.get('nivel')?.value;
   
    const skill:Skill=new Skill(this.skill.lenguaje,this.skill.nivel);

    this.service.crearSkill(skill).subscribe(r=>this.info=r)

    
  }
  editarSkill(){

    const lenguaje=this.skillForm.get('lenguaje')?.value;
    const nivel=this.skillForm.get('nivel')?.value;
    const id=this.skillForm.get('id')?.value
    const skill:Skill=new Skill(lenguaje,nivel,id);
    skill.lenguaje=lenguaje;
    skill.nivel=nivel
 

    this.service.editarSkill(skill).subscribe((edit)=>{
      this.info=edit;
    })

  }
  
  borrarSkillId(skill:Skill){
    this.service.borrarSkillId(skill).subscribe((r)=>{ console.log(r);
      this.info=r;
  
  });
}

  editar_skill(skill:Skill){
      this.skillForm.get('id')?.setValue(skill.id_Skill)
      this.skillForm.get('lenguaje')?.setValue(skill.lenguaje)
      this.skillForm.get('nivel')?.setValue(skill.nivel)
      
  }

}
