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
    this.settings = {
      class: 'table table-hover',
      thead: undefined,
      tbody: {
        class: '',
        tr: [
          {
            class: '',
            style: '',
            td: [
              {
                class: '',
                style: '',
                link: '',
                name: '<span class="float-center"> ime</span>'
              },
              {
                class: '',
                style: '',
                link: '',
                name: '<span class="float-center"> sredina</span>'
              },
              {
                class: '',
                style: '',
                link: '',
                name: '<span class="float-right"> tekst</span>'
              }
            ]
          }
        ]
      }
    }
  }
}
