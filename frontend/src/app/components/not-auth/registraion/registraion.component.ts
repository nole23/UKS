import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistration } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registraion',
  templateUrl: './registraion.component.html',
  styleUrls: ['./registraion.component.scss']
})
export class RegistraionComponent implements OnInit {

  login: UserRegistration;
  isRegistration: Boolean;
  isSpiner: Boolean;
  isMessage: Boolean;
  textMessage: String;
  constructor(private authService: AuthService, private router: Router) {
    this.login = new UserRegistration();
    this.isRegistration = false;
    this.isSpiner = false;
    this.isMessage = false;
  }

  ngOnInit(): void {
  }

  ngRegistration() {
    console.log(this.login)
    
    this.isRegistration = true;
    this.isSpiner = true;

    const changeForms = this._changeForms();
    console.log(changeForms)
    if (changeForms['status']) {
      this.authService.registraton(this.login)
      .subscribe(res => {
        this.isRegistration = false;
        this.isSpiner = false;
        if (res['status'] === 'SUCCESS') {
          this.router.navigate(['/login']);
        } else {
          this.isMessage = true;
          if (res['type'] === 'MAIL') {
            this.textMessage = ' mail ';
          } else if (res['type'] === 'OTHER') {
            this.textMessage = ' server ';
          }
        }
      })
    } else {
      // TO DO ovde ide sve ostalo
      this.isRegistration = false;
      this.isMessage = true;
      if (!changeForms['password']) {
        this.textMessage = 'sifra nije dobro'
      } else if (!changeForms['firstName'] && !changeForms['lastName'] && !changeForms['email'] && !changeForms['password']) {
        this.textMessage = 'niste uneli ni jedan podataka'
      }
      
    }
  }

  _changeForms() {
    let item = {
      status: true,
      firstName: this.login.firstName !== undefined,
      lastName: this.login.lastName !== undefined,
      email: this.login.email !== undefined,
      password: this.login.password !== undefined,
      againPassword: this.login.aggainPassword !== undefined
    }

    if
    (
      this.login.firstName === undefined,
      this.login.lastName === undefined,
      this.login.password === undefined,
      this.login.password === undefined,
      this.login.aggainPassword === undefined
    ) {
      item.status = false;
    } else {
      if (this.login.password.toString() !== this.login.aggainPassword.toString()) {
        item.status = false;
        item.againPassword = false;
      }
    }
    return item;
  }
}
