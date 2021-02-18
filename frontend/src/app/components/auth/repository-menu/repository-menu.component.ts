import { Component, OnInit, Input } from '@angular/core';
import { List_Project_User, Project } from 'src/app/models/repository';

@Component({
  selector: 'app-repository-menu',
  templateUrl: './repository-menu.component.html',
  styleUrls: ['./repository-menu.component.scss']
})
export class RepositoryMenuComponent implements OnInit {
  @Input('list_project') list_project: Project;

  listUser: any;
  constructor() { }

  ngOnInit(): void {
  }

  ngOwn(list:any) {
    let res = ''
    list.forEach(element => {
      if (element.role.name === 'O') {
        res = element.user.username
      }
    });
    return res;
  }

  ngCloseProject(id: any) {
    console.log(id)
    console.log('ovo treba srediti')
  }
}
