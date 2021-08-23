import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../core/services/security/security.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthenticatedGuard implements CanActivate {

  constructor(
    private secService : SecurityService,
    private router: Router
    ){};

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.secService.sessionExist() && this.secService.verifyRoleInSession(3)){
        return true;
      }
      this.router.navigate(["/home"]);
        return false;
    }

}
