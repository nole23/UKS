import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserRegistration } from 'src/app/models/user';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly notifier: NotifierService;

  private API_URL = 'http://localhost:8000/api/';

  private loginSource = new Subject<any>();
  login$ = this.loginSource.asObservable();
  constructor(private http: HttpClient, notifier: NotifierService) {
    this.notifier = notifier;
  }

  registraton(login: any) {
    return this.http.post(this.API_URL + 'sing-in', login)
      .pipe(map(res => {
        return res;
      }))
  }

  login(login: UserRegistration) {
    return this.http.post(this.API_URL + 'sing-up', login)
      .pipe(map(res => {
        if (res['message'] === 'SUCCESS') {
          console.log(res['data']['jwt'])

          const user = res['data']['user'];
          const jwt = res['data']['jwt'];

          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('jwt', JSON.stringify(jwt));

          this.loginSource.next();

          return res;
        } else {
          if (res['data'] === 'EMAIL_NOT_FOUND')
            this.notifier.notify('warning', 'Email is not correct.')

          if (res['data'] === 'PASSWORD_NOT_FOUND')
            this.notifier.notify('warning', 'Password is not correct.')

          return res;
        }
      }))
  }

  logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
    localStorage.removeItem('project');
    this.loginSource.next();
  }
}
