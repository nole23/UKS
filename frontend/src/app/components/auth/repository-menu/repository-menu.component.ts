import { Component, OnInit, Input } from '@angular/core';
import { RepositoryService } from 'src/app/services/repository.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-repository-menu',
  templateUrl: './repository-menu.component.html',
  styleUrls: ['./repository-menu.component.scss']
})
export class RepositoryMenuComponent implements OnInit {
  @Input('viewId') viewId: String;

  listUser: any;
  count: number;
  list_project: any;
  user: any;
  isOwner: Boolean = false;
  constructor(private repositoryService: RepositoryService, private router: Router) {
    this.listUser = null
    this.count = 2;
    this.list_project = null;
    this.user = JSON.parse(localStorage.getItem('user'))
  }

  ngOnInit(): void {
    this._getParam();
  }

  _getParam() {
    this.list_project = JSON.parse(localStorage.getItem('project'));
    if (this.list_project !== null) {
      this.listUser = this.list_project.listUser
      this._getOwner();
    } else {
      let self = this
      setTimeout(function () {
        self._getParam();
      }, 100)
    }
  }

  ngOwn(list: any) {
    let res = ''
    list.forEach(element => {
      if (element.role.roleName === 'O') {
        res = element.user.username
      }
    });
    return res;
  }

  ngDeleteProject(id: any) {
    this.repositoryService.deleteRepository(id)
      .subscribe(res => {
        this.router.navigate(['/home'])
      })
  }

  reload(id: any, tab: any) {
    if (tab === this.viewId) {
      let link = '/repo/' + id + '/' + tab
      this.router.navigate(['/#'], { skipLocationChange: true })
        .then(() => { this.router.navigate([link]); });
    }
  }

  _getOwner() {
    let listUser = this.listUser.find(x => x.role.roleName === 'O')
    if (listUser === undefined) {
      this.isOwner = false;
    } else {
      this.isOwner = this.user.id.toString() === listUser.user.id.toString()
    }
    console.log(this.isOwner)
  }
}
