import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss']
})
export class HeadersComponent implements OnInit {

  isStatus: Boolean;
  userID: any;
  imgUrl = 'http://localhost:8000/media/picture/'
  constructor(private authService: AuthService, private router: Router) {
    this.userID = null;
    this.authService.login$.subscribe(res => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('jwt')) {
      this.isStatus = true;
      this.userID = JSON.parse(localStorage.getItem('user'))['id']
    } else {
      this.isStatus = false;
    }
  }

  _isLogin() {
    return this.isStatus
  }

  ngLogOut() {
    this.authService.logOut();
    this.ngOnInit();
    this.router.navigate(['/']);
  }
}
