import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistration } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private readonly notifier: NotifierService;

  login: UserRegistration;
  isSpiner: Boolean = false;
  message: any;
  cssEmail: String = '';
  cssPassword: String = '';
  constructor(private authService: AuthService, private router: Router, notifier: NotifierService) {
    this.login = new UserRegistration();
    this.message = null;
    this.notifier = notifier;
  }

  ngOnInit(): void {
  }

  ngLogin() {
    this.isSpiner = true;

    let isCheck = this._isCheckData();
    if (isCheck) {
      this.authService.login(this.login)
        .subscribe(res => {
          this.isSpiner = false;
          if (res['message'] === 'SUCCESS') {
            this.router.navigate(['/home'])
          }
        })
    }
  }

  _isCheckData() {
    if (this.login.email === undefined) {
      this.notifier.notify('error', 'Email does not exist.')
      this.isSpiner = false;
      this.cssEmail = 'error-color'
      return false;
    }

    if (this.login.password === undefined) {
      this.notifier.notify('error', 'Password does not exist.')
      this.isSpiner = false;
      this.cssPassword = 'error-color'
      return false;
    }

    return true;
  }
}
