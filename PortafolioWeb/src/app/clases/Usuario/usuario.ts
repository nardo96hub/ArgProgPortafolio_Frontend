import { Role } from "../Roles/role";

export class Usuario {
    constructor(public id_usuario:string,public usuario:string,public contrasena:string,public roles:Role[]){}
}
