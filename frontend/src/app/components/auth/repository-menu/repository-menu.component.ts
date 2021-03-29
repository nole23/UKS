import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/models/repository';
import { RepositoryService } from 'src/app/services/repository.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-repository-menu',
  templateUrl: './repository-menu.component.html',
  styleUrls: ['./repository-menu.component.scss']
})
export class RepositoryMenuComponent implements OnInit {
  @Input('list_project') list_project: Project;
  @Input('viewId') viewId: String;

  listUser: any;
  count: number;
  constructor(private repositoryService: RepositoryService, private router: Router) {
    this.listUser = null
    this.count = 2;
  }

  ngOnInit(): void {
    this.listUser = this.list_project.listUser
  }

  ngOwn(list: any) {
    let res = ''
    list.forEach(element => {
      if (element.role.name === 'O') {
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
}
