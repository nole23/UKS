import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  viewId: any;
  constructor(private activatedRoute: Router) {
    this.viewId = null;
  }

  ngIsRepositoryMenu() {
    let link = this.activatedRoute.url.split('/')
    if (link[1] !== '') {
      if (link[1] === 'repo') {
        this.viewId = link[3]
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }


}
