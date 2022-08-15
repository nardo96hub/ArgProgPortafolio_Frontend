export class JwtDto {
    constructor(public token:string, public bearer:string,public username:string,public roles:string[]){}
}
