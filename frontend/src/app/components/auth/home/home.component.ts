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
    let owner = data.role.roleName === 'O' ? 'You are owner.' : 'You are developer.';
    let icon = !data.project.typeProject ? '<i class="fa fa-users color-green" aria-hidden="true"></i> ' : '<i class="fa fa-lock color-red" aria-hidden="true"></i> ';
    return {
      id: data.id,
      name: icon + data.project.rootTree[0].userCreate.username + ' / ' + data.project.name + '<br/><div class="font-12 ' + className + '">' + owner + '</div>',
      link: '/repo/' + data.project.id + '/c',
    }
  }

  _setSettings(item: any) {
    this.data['tbody']['tr'] = item;

    this.settings = this.data;
  }
}
