import { Component, OnInit, Input } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { RootTree } from 'src/app/models/repository';

@Component({
  selector: 'app-repository-code',
  templateUrl: './repository-code.component.html',
  styleUrls: ['./repository-code.component.scss']
})
export class RepositoryCodeComponent implements OnInit {
  private readonly notifier: NotifierService;

  @Input('list_project') list_project: any;
  @Input('rootTree') rootTree: RootTree;

  settings: any;
  type: any;
  constructor(notifier: NotifierService) {
    this.settings = null;
    this.type = null;
    this.notifier = notifier;
  }

  ngOnInit(): void {
    this._parserDate(this.rootTree);
  }

  _parserDate(item: any) {
    let currentDate = new Date();
    let dateSent = new Date(item.dateCreate);
    let lastDay = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
    let rootDate = {
      id: item.id,
      name: item.name,
      dateCreate: lastDay == 0 ? 'Danas kreirano' : 'Kreirano prije ' + lastDay + ' dana'
    }

    let dataTR = [
      {
        td: [
          {
            class: '',
            style: '',
            link: null,
            name: '<span class="float-center"><i class="fa fa-folder color-file" aria-hidden="true"></i> <a class="cursor-pointer" href="http://localhost:4200/repo/1/c?name=' + rootDate.name + '" class="ml-2">' + rootDate.name + '</a></span>'
          },
          {
            class: '',
            style: '',
            link: null,
            name: '<span class="float-center">Project</span>'
          },
          {
            class: '',
            style: '',
            link: null,
            name: '<span class="float-right color-text">' + rootDate.dateCreate + '</span>'
          }
        ]
      }
    ]

    this._createTableData(dataTR);
  }

  _createTableData(item: any) {
    let settings = {
      class: 'table table-hover',
      thead: undefined,
      tbody: {
        class: '',
        tr: this._createTR(item),
      }
    }
    this.settings = settings;
  }

  _createTR(item: any) {
    let resData = []

    item.forEach((element: any) => {
      resData.push({
        class: 'font-graph',
        style: '',
        td: this._createTD(element.td)
      });
    });

    return resData;
  }

  _createTD(item: any) {
    let resData = []

    item.forEach((element: any) => {
      resData.push({
        class: element.class,
        style: element.style,
        link: element.link,
        name: element.name
      })
    });

    return resData;
  }

  onEmitClose(event: any) {
    this.type = null;
  }
}
