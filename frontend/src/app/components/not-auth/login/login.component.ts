import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistration } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: UserRegistration;
  isLogin: Boolean;
  message: any;
  constructor(private authService: AuthService, private router: Router) {
    this.login = new UserRegistration();
    this.isLogin = false;
    this.message = null;
  }

  ngOnInit(): void {
  }

  ngLogin() {
    this.message = null;
    this.isLogin = true;
    this.authService.login(this.login)
      .subscribe(res => {
        if(res['status']) {
          this.router.navigate(['/home'])
        } else {
          this.isLogin = false;
          this.message = res['message'];
        }
      })
  }
}
