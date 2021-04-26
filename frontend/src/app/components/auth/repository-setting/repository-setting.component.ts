import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/repository';
import { RepositoryService } from 'src/app/services/repository.service';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/repository';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-repository-setting',
  templateUrl: './repository-setting.component.html',
  styleUrls: ['./repository-setting.component.scss']
})
export class RepositorySettingComponent implements OnInit {
  private readonly notifier: NotifierService;

  tabName: String;
  project: Project;
  spiner: Boolean;
  searchText: String;
  settings: any;
  listUser: any;
  constructor(private repositoryService: RepositoryService, notifier: NotifierService) {
    this.tabName = 'options';
    this.project = new Project(JSON.parse(localStorage.getItem('project')));
    this.spiner = false;
    this.notifier = notifier;
    this.searchText = null;
    this.settings = null;
    this.listUser = null;
  }

  ngOnInit(): void {
    this.listUser = this.project.listUser
    this._createTableDate(this.listUser, 'inicial');
  }

  updateNameProject() {
    this.spiner = true;

    const formData = new FormData();
    formData.append('type', 'name')
    formData.append('project', this.project.id)
    formData.append('type_project', this.project.typeProject.toString())
    formData.append('name', this.project.name.toString())

    this.repositoryService.updateProject(formData)
      .subscribe(res => {
        this.spiner = false;
        if (res['message'] === 'SUCCESS') {
          this.notifier.notify('success', 'Project name success change.')
          this._changeProject();
        } else {
          this.notifier.notify('waring', 'Server not found.')
        }
      })
  }

  updateTypeProject() {
    this.spiner = true;

    const formData = new FormData();
    formData.append('type', 'type')
    formData.append('project', this.project.id)
    formData.append('type_project', this.project.typeProject.toString())
    formData.append('name', this.project.name.toString())

    this.repositoryService.updateProject(formData)
      .subscribe(res => {
        this.spiner = false;
        if (res['message'] === 'SUCCESS') {
          this.notifier.notify('success', 'Project type success change.')
          this._changeProject();
        } else {
          this.notifier.notify('waring', 'Server not found.')
        }
      })
  }

  filter() {
    if (this.searchText.length > 3) {
      this.repositoryService.userSearch(this.searchText)
        .subscribe(res => {
          this._createTableDate(res['users'], 'search')
        })
    } else {
      this._createTableDate(this.listUser, 'inicial');
    }
  }

  _createTableDate(users: any, status: String) {
    let settings = {
      class: 'table table-hover',
      thead: undefined,
      tbody: {
        tr: this._createTR(users, status)
      }
    }
    console.log(settings)
    this.settings = settings;
  }

  _createTR(users: any, status: String) {
    let resData = [];

    users.forEach((element: any) => {
      resData.push({
        class: 'font-graph',
        td: this._createTD(element, status)
      })
    });

    return resData;
  }

  _createTD(user: any, status: String) {
    let resData = []
    if (status === 'inicial') {
      resData.push(
        {
          name: user.user.firstName + ' ' + user.user.lastName
        },
        {
          name: user.role.name === '0' ? 'Owner' : 'developer'
        }
      )
    }

    if (status === 'search') {
      resData.push(
        {
          class: 'font-15',
          id: user.id,
          name: user.firstName + ' ' + user.lastName
        },
        {
          button: {
            class: 'btn btn-outline-success float-right',
            style: '',
            name: null,
            span: {
              i: 'fa fa-plus'
            }
          }
        }
      )
    }

    return resData;
  }

  onEmitClose(event: any) {
    const formData = new FormData();
    formData.append('user', event.td[0].id);
    formData.append('project', this.project.id);

    this.repositoryService.addUserInProject(formData)
      .subscribe(res => {
        if (res['message'] === 'SUCCESS') {
          let message = res['data'].find(x => { return x.isSave })
          if (message.isSave === 'true') {
            let listUser = this._updateProject(new User(res['data'][1]), new Role(res['data'][2]))
            this.notifier.notify('success', 'User ' + event.td[0].name + ' add in project.')
            this._createTableDate(listUser, 'inicial');
          } else {
            this.notifier.notify('warning', 'User ' + event.td[0].name + ' has already been added.')
          }
        }
      })
  }

  _updateProject(user: User, role: Role) {
    let data = JSON.parse(localStorage.getItem('project'))
    localStorage.removeItem('project');

    data.listUser.push({
      role: role,
      user: user
    })

    localStorage.setItem('project', JSON.stringify(data));

    return data.listUser;
  }

  _changeProject() {
    localStorage.removeItem('project')
    localStorage.setItem('project', JSON.stringify(this.project))
  }
}
