import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {
    public getToken(): string {
        const token = JSON.parse(localStorage.getItem('jwt'));
        if (token !== null) {
          return token;
        }
        return null;
    }
}
