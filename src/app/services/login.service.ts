import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  NombreUsuario: string = '';
  logeado:boolean = false;


  constructor() { }

  public login(user:string,password:string){

    if(user.length > 1 && password =='123'){
      this.logeado = true;
      this.NombreUsuario = user;

    }else {

      throw{};
    }

  }
}
