import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generig-table',
  templateUrl: './generig-table.component.html',
  styleUrls: ['./generig-table.component.scss']
})
export class GenerigTableComponent implements OnInit {
  @Input('settings') settings: any;

  options: any;
  constructor() {
    this.options = null;
  }

  ngOnInit(): void {
    this._setOptions();
  }

  _setOptions() {
    this.options = {
      h1: this.settings.h1 === undefined ? null : this.settings.h1,
      h2: this.settings.h2 === undefined ? null : this.settings.h2,
      h3: this.settings.h3 === undefined ? null : this.settings.h3,
      h4: this.settings.h4 === undefined ? null : this.settings.h4,
      p: this.settings.p === undefined ? null : this.settings.p,
      table: {
        class: this.settings.class === undefined ? null : this.settings.class,
        style: this.settings.style === undefined ? null : this.settings.style,
        thead: this.settings.thead === undefined ? null : this.settings.thead,
        tbody: {
          class: this.settings.tbody.class === undefined ? null : this.settings.tbody.class,
          style: this.settings.tbody.style === undefined ? null : this.settings.tbody.style,
          tr: this._setList(this.settings.tbody.tr)
        }
      }
    }
  }

  _setList(data: any) {
    let res = [];
    for (let i=0; i<data.length; i++) {
      res.push({
        class: data[i].class === undefined ? null : data[i].class,
        style: data[i].style === undefined ? null : data[i].style,
        td: this._setTD(data[i].td)
      })
    }

    return res;
  }

  _setTD(data: any) {
    let res = [];
    for (let i=0; i<data.length; i++) {
      res.push({
        class: data[i].class === undefined ? null : data[i].class,
        style: data[i].style === undefined ? null : data[i].style,
        id: data[i].id === undefined ? null : data[i].id,
        name: data[i].name === undefined ? null : data[i].name,
        link: data[i].link === undefined ? null : data[i].link
      })
    }
    return res;
  }

  ngSetClass(item: any) {
    if (item > 7) {
      return 'tdw-auto'
    }
    
    return 'tdw-' + item;
  }
}
/*
[
  {
    class: 'cursor',
    style: null,
    td: [
      {
        class: null,
        style: null,
        id: '1',
        name: 'test1'
      }
    ]
  }
]
*/