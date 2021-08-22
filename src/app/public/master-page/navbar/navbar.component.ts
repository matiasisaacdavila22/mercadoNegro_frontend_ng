import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';
import { Route } from '@angular/compiler/src/core';

declare const closeModal: any;
declare const showMessage: any;
declare const showRemoveConfirmationWindows: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  isLogged: Boolean = false;
  role: number = 0;
  idRemove: String = '';
  subscription!: Subscription;


  constructor(private service: SecurityService, private router:Router) { }

  ngOnInit(): void {
    this.subscription = this.service.getStoreData().subscribe(data => {
      this.isLogged = data.isLoggend;
    });
  }

  StopendConfirmation(id:String){

  }

  RemoveConfirmation(id:String){
    this.idRemove = id;
    console.log(id);
    showRemoveConfirmationWindows();
  }

  RemoveRecord(){
    console.log('removedRecod')
    closeModal('removeConfirmationModal')
    if(this.idRemove){
      console.log('removedRecod true')
      this.router.navigate([`/security/logout`]);

       }

  }


}
