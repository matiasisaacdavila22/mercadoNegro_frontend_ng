import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/core/services/security/security.service';

declare const closeModal: any;
declare const showMessage: any;
declare const showRemoveConfirmationWindows: any;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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
