import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistration } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-registraion',
  templateUrl: './registraion.component.html',
  styleUrls: ['./registraion.component.scss']
})
export class RegistraionComponent implements OnInit {
  private readonly notifier: NotifierService;

  login: UserRegistration;
  isSpiner: Boolean;
  isPassword: Boolean;
  isEmail: String = '';
  isPasswordColor: String = '';
  constructor(private authService: AuthService, private router: Router, notifier: NotifierService) {
    this.login = new UserRegistration();
    this.isSpiner = false;
    this.notifier = notifier;
    this.isPassword = false;
  }

  ngOnInit(): void {
  }

  ngRegistration() {
    this.isSpiner = true;

    if (this._changeForms()) {
      this.authService.registraton(this.login)
        .subscribe(res => {
          console.log(res)
          if (res['message'] === 'SUCCESS') {
            this.router.navigate(['/login']);
          } else {
            this.isSpiner = false;

            if (res['data'] === 'NOT_SAVE_MAIL') {
              this.notifier.notify('warning', 'Email ' + this.login.email + '  is olready in use.')
              this.login.email = undefined;
              this.isEmail = 'error-color';
            }
          }
        })
    }
  }

  _changeForms() {
    if (this.login.firstName === undefined) {
      this.notifier.notify('error', 'Firstname does not exist.')
      this.isSpiner = false;
      return false;
    }

    if (this.login.lastName === undefined) {
      this.notifier.notify('error', 'Lastname does not exist.')
      this.isSpiner = false;
      return false;
    }

    if (this.login.email === undefined) {
      this.notifier.notify('error', 'Email does not exist.')
      this.isSpiner = false;
      return false;
    }

    if (this.login.password === undefined) {
      this.notifier.notify('error', 'First password does not exist.')
      this.isSpiner = false;
      return false;
    }

    if (this.login.aggainPassword === undefined) {
      this.notifier.notify('error', 'Again passeord does not exist.')
      this.isSpiner = false;
      return false;
    }

    if (this.login.password.toString() !== this.login.aggainPassword.toString()) {
      this.notifier.notify('error', 'Password is incorrect.')
      this.isSpiner = false;
      this.isPassword = true;
      this.isPasswordColor = 'error-color'
      return false;
    }

    return true;
  }
}
