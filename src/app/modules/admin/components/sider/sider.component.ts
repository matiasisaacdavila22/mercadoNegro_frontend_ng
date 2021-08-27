import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/core/services/security/security.service';
import { Route } from '@angular/compiler/src/core';

declare const closeModal: any;
declare const showMessage: any;
declare const showRemoveConfirmationWindows: any;

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.css']
})
export class SiderComponent {

  isLogged: Boolean = false;
  role: number = 0;
  idRemove: String = '';
  subscription!: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private service: SecurityService, private router:Router) {}


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
