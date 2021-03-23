import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthNav implements CanActivate {

    constructor(private router: Router) {}

    canActivate() {
        if(localStorage.getItem('jwt')) {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}
