import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotAuthNav implements CanActivate {

    constructor() {}

    canActivate() {
        if(localStorage.getItem('jwt')) {
            return false;
        }
        return true;
    }
}
