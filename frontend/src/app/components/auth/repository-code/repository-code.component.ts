import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repository-code',
  templateUrl: './repository-code.component.html',
  styleUrls: ['./repository-code.component.scss']
})
export class RepositoryCodeComponent implements OnInit {

  graphCode: any;
  settings: any;
  constructor() {
    this.graphCode = null;
    this.settings = null;
  }

  ngOnInit(): void {
    let dataTR = [
      {
        td: [
          {
            class: '',
            style: '',
            link: null,
            name: '<span class="float-center"><i class="fa fa-folder color-file" aria-hidden="true"></i> <a class="cursor-pointer" href="http://localhost:4200/repo/1/c?name=frontende" class="ml-2">frontende</a></span>'
          },
          {
            class: '',
            style: '',
            link: null,
            name: '<span class="float-center">Izmjenjena nova verzija projekta...</span>'
          },
          {
            class: '',
            style: '',
            link: null,
            name: '<span class="float-right color-text">17 hours ago</span>'
          }
        ]
      },
      {
        td: [
          {
            class: '',
            style: '',
            link: null,
            name: '<span class="float-center"><i class="fa fa-folder color-file" aria-hidden="true"></i> <a class="cursor-pointer" href="http://localhost:4200/repo/1/c?name=backend"class="ml-2">backend</a></span>'
          },
          {
            class: '',
            style: '',
            link: null,
            name: '<span class="float-center">Izmjenjena nova verzija projekta...</span>'
          },
          {
            class: '',
            style: '',
            link: null,
            name: '<span class="float-right color-text">17 hours ago</span>'
          }
        ]
      },
      {
        td: [
          {
            class: '',
            style: '',
            link: null,
            name: '<span class="float-center"><i class="fa fa-file-code-o" aria-hidden="true"></i> README.md</span>'
          },
          {
            class: '',
            style: '',
            link: null,
            name: '<span class="float-center">Izmjenjena nova verzija projekta...</span>'
          },
          {
            class: '',
            style: '',
            link: null,
            name: '<span class="float-right color-text">17 hours ago</span>'
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

    console.log(settings)
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
}
