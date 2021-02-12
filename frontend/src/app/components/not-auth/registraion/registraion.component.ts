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
  }
}
