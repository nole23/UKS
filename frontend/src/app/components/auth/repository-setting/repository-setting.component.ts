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
  isOwner: Boolean = false;
  user: any;
  loginUser: any;
  constructor(private repositoryService: RepositoryService, notifier: NotifierService) {
    this.loginUser = JSON.parse(localStorage.getItem('user'))
    this.tabName = null;
    this.project = new Project(JSON.parse(localStorage.getItem('project')));
    this.spiner = false;
    this.notifier = notifier;
    this.searchText = null;
    this.settings = null;
    this.listUser = null;
    this.user = JSON.parse(localStorage.getItem('user'))

  }

  ngOnInit(): void {
    this.listUser = this.project.listUser
    this._getOwner();
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
          this.notifier.notify('success', 'Project name updated')
          this._changeProject(this.project.name.toString(), this.project.typeProject);
        } else {
          this.notifier.notify('waring', 'Server not responding')
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
          this.notifier.notify('success', 'Project type updated')
          this._changeProject(this.project.name.toString(), this.project.typeProject);
        } else {
          this.notifier.notify('waring', 'Server not found')
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
    let name = ''
    if (user.user === undefined)
      name += (user.id === this.loginUser.id) ? user.firstName + ' ' + user.lastName + ' (you)' : user.firstName + ' ' + user.lastName
    else
      name += (user.user.id === this.loginUser.id) ? user.user.firstName + ' ' + user.user.lastName + ' (you)' : user.user.firstName + ' ' + user.user.lastName

    if (status === 'inicial') {
      resData.push(
        {
          name: name
        },
        {
          name: user.role.name === 'O' ? 'Owner' : 'developer'
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
            this.notifier.notify('success', 'User ' + event.td[0].name + ' has been successfully added to this project')
            this._createTableDate(listUser, 'inicial');
          } else {
            this.notifier.notify('warning', 'User ' + event.td[0].name + ' is already working on this project')
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

  _changeProject(name: string, type: Boolean) {
    let object = localStorage.getItem('project')
    localStorage.removeItem('project')
    if (name !== null) object['name'] = name;
    object['typeProject'] = type;
    localStorage.setItem('project', JSON.stringify(object))
    this.project = new Project(object);
  }

  _getOwner() {
    let listUser = this.project.listUser;
    let findUser = listUser.find(x => x.role.name === 'O')
    if (findUser === undefined) {
      this.isOwner = false;
      this.tabName = 'options'
    } else {
      this.isOwner = this.user.id.toString() === findUser.user.id.toString()
      if (this.isOwner) {
        this.tabName = 'options'
      } else {
        this.tabName = 'access'
      }
    }
  }
}
