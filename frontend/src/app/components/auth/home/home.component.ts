import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  settings: any;
  data: any;
  user: any;
  constructor(private repositoryService: RepositoryService) {
    this.settings = null;
    this.user = JSON.parse(localStorage.getItem('user'))
  }

  ngOnInit(): void {
    localStorage.removeItem('project')
    this._getAllRepository();
    this.data = {
      class: 'table table-hover',
      thead: null,
      tbody: {
        tr: []
      }
    }
  }

  _getAllRepository() {
    this.repositoryService.getAllRepository(this.user.id)
      .subscribe(res => {
        let data = res['data']

        let resData = []
        data.forEach(element => {
          resData.push({
            class: 'cursor',
            td: [this._setData(element)]
          })
        });

        this._setSettings(resData);
      })
  }

  _setData(data: any) {
    let className = data.role.roleName === 'O' ? 'color-green' : 'color-orange';
    let owner = data.role.roleName === 'O' ? 'Owner is: ' + data.user.firstName + ' ' + data.user.lastName : 'Developer is: ' + data.user.firstName + ' ' + data.user.lastName;
    return {
      id: data.id,
      name: data.user.username + '/' + data.project.name + '<br/><div class="font-12 ' + className + '">' + owner + '</div>',
      link: '/repo/' + data.id + '/c'
    }
  }

  _setSettings(item: any) {
    this.data['tbody']['tr'] = item;

    this.settings = this.data;
  }
}
