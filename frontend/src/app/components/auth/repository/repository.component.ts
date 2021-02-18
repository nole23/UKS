import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService } from 'src/app/services/repository.service';
import { List_Project_User, Project } from 'src/app/models/repository';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {

  list_project: Project
  constructor(private activatedRoute: ActivatedRoute, private repositoryService: RepositoryService) {
    this.list_project = null;
  }

  ngOnInit(): void {
    let test1 = {
      user: {
        id: 1,
        firstName: 'Novica',
        lastName: 'Nikolic',
        username: 'nole'
      },
      role: {
        name: 'O'
      }
    }

    let test = {
      id: 1,
      name: 'test1',
      description: 'testiramo nesto da vidimo kako radi',
      date_create: '18. feb 2021.',
      type_project: false,
      list_project_user: [test1]
    }

    let project = new Project(test);
    console.log(project)

    this.list_project = project;
    // this.list_project = list;
    // console.log(this.list_project)
    this.activatedRoute.params.subscribe(res => {
      this._getRepositpry(res['id']);
      console.log(res['type'])
    })
  }

  _getRepositpry(id: any) {
    // this.repositoryService.getRepositoryById(id)
    //   .subscribe(res => {
    //     console.log(res)
    //   })
  }

  ngCloseRepo() {
    console.log('ovo treba srediti')
  }
}
