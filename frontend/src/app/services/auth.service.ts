import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registraton(login: any) {
    console.log(environment.apiUrl)
    return this.http.post(environment.apiUrl + 'sing-in', login)
      .pipe(map(res => {
        return res;
      }))
  }
}
