import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class NotAuthNav implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (!localStorage.getItem('jwt')) {
            return true;
        }
        this.router.navigate(['/home'])
        return false;
    }
}
