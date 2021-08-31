import { Injectable } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private af: AngularFireAuth) { }

  createUser(email:string, password:string){
     return this.af.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email:string, password:string){
    return this.af.auth.signInWithEmailAndPassword(email, password);
  }

  logOut(){
    return this.af.auth.signOut();
  }

  hasUser() {
    console.log('esta logueado')
    console.log(this.af.authState)
    return this.af.authState;
  }
}
