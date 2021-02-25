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
  constructor(private repositoryService: RepositoryService) {
    this.settings = null;
  }

  ngOnInit(): void {
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
    this.repositoryService.getAllRepository()
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
    return {
      id: data.id,
      name: data.name,
      link: '/repo/' + data.id + '/c'
    }
  }

  _setSettings(item: any) {
    this.data['tbody']['tr'] = item;

    this.settings = this.data;
  }
}
