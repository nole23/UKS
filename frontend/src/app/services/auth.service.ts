import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserRegistration } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginSource = new Subject<any>();
  login$ = this.loginSource.asObservable();
  constructor(private http: HttpClient) { }

  registraton(login: any) {
    return this.http.post(environment.apiUrl + 'sing-in', login)
      .pipe(map(res => {
        return res;
      }))
  }

  login(login: UserRegistration) {
    return this.http.post(environment.apiUrl + 'sing-up', login)
      .pipe(map(res => {
        if (res['status']) {
          const user = res['user'];
          const jwt = res['jwt'];

          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('jwt', JSON.stringify(jwt));

          this.loginSource.next();

          return res;
        } else {
          return res;
        }
      }))
  }

  logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
    this.loginSource.next();
  }
}
