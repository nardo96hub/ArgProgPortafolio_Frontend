import { Acerca } from "../Acerca/acerca";
import { Educacion } from "../Edu/educacion";
import { Experiencia } from "../Experiencia/experiencia";
import { Imagen } from "../Imagen/imagen";
import { Personal } from "../Personal/personal";

import { Proyecto } from "../Proyecto/proyecto";
import { Skill } from "../Skill/skill";
import { Usuario } from "../Usuario/usuario";

export class Perfil {

    constructor(public id_perfil:string,public personal:Personal,public puesto:string,public imagen:Imagen,public acer:Acerca,public experiencia:Experiencia[],public educacion:Educacion[],public skill:Skill[],public proyecto:Proyecto[],public usuario:Usuario){}
  
}
