import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    userRole: any = `${localStorage.getItem('role')}`;
    constructor(private router: Router) {
    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (next.data === undefined) {
            this.router.navigate(['unauth']);
            return false;
        }
        const value = next.data.role;
        const valArray: Array<any> = value.split(' ');
        if (valArray.indexOf(this.userRole) > -1) {
            return true;
        }
        this.router.navigate(['unauth']);
        return true;
    }

}
