import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { RootTree } from 'src/app/models/repository';

@Component({
  selector: 'app-repository-code',
  templateUrl: './repository-code.component.html',
  styleUrls: ['./repository-code.component.scss']
})
export class RepositoryCodeComponent implements OnInit, OnChanges {
  private readonly notifier: NotifierService;

  @Input('branch') branch: String;
  @Input('rootTree') rootTree: RootTree;
  @Input('repoId') repoId: any;
  @Input('tree') tree: any;
  @Input('list_project') list_project: any;

  settings: any;
  type: any;
  folder: String;
  readMe: any;
  constructor(notifier: NotifierService) {
    this.settings = null;
    this.type = null;
    this.notifier = notifier;
    this.branch = null;
    this.folder = null;
    this.readMe = null;
  }

  ngOnInit(): void {
    this._parserData(this.rootTree[0]);
    console.log(this.tree)
  }

  ngOnChanges(): void {
    this.settings = null;
    this._parserData(this.rootTree[0]);
  }

  ngParserText(text) {
    return text.replace(/(?:\r\n|\r|\n)/g, '<br>')
  }

  onEmitClose(event: any) {
    if (event !== null) {
      this._pushNewFile(event);
    }
    this.type = null;
  }

  _parserData(item: any) {
    let dataTR = [];
    this.folder = item.nameBranch !== undefined ? item.nameBranch : item.nameNode;
    if (item.childrenFolder.length !== 0) {
      item.childrenFolder.forEach(element => {
        let rootDate = this._parserChildren(element, 'folder');
        dataTR.push(this._parserTableTR(rootDate, 'folder'))
      });
    }

    if (item.files.length !== 0) {
      item.files.forEach(element => {
        if (element.name === 'README.md') {
          this.readMe = element
        }
        let rootDate = this._parserChildren(element, 'file');
        dataTR.push(this._parserTableTR(rootDate, 'file'))
      });
    }

    if (dataTR.length !== 0) {
      this._createTableData(dataTR);
    }
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
        name: element.name,
        date: element.date
      })
    });

    return resData;
  }

  _parserChildren(data: any, type: String) {
    let dateSent = new Date(data.dateCreate);
    return {
      id: data.id,
      name: type === 'folder' ? data.nameNode : data.name,
      parentFolder: type === 'file' ? data.nameNode : null,
      dateCreate: dateSent
    }
  }

  _parserTableTR(data: any, type: String) {

    let test = '?'
    this.tree.forEach(element => {
      if (element !== this.branch && element !== undefined) test += 'name=' + element + '&'
    });
    const icon = type === 'folder' ? 'fa-folder' : 'fa-file-o'
    const name = type === 'folder' ? data.name : data.name
    const link = type === 'folder' ? '/repo/' + this.repoId + '/c/folder/' + this.branch + test + 'name=' + name : '/repo/' + this.repoId + '/blob/' + this.branch + test + '/' + name

    let i = '<i class="color-file fa ' + icon + '" aria-hidden="true"></i>';
    let p = 'Project'
    return {
      td: [
        {
          class: 'cursor',
          style: '',
          link: link,
          name: '<span class="float-center">' + i + ' </span>' + name
        },
        {
          class: '',
          style: '',
          link: null,
          name: '<span class="float-center">' + p + '</span>'
        },
        {
          class: 'float-right color-text',
          style: '',
          link: null,
          name: null,
          date: data.dateCreate
        }
      ]
    }
  }

  _pushNewFile(event: any) {
    let data = JSON.parse(localStorage.getItem('project'));
    localStorage.removeItem('project');

    let help_root = event.rootTree

    if (event.tree.length > 1) {
      this.tree.forEach(element => {
        if (element !== 'master') {
          let index = help_root.childrenFolder.find(x => x.nameNode === element) // index je undefined, srediti ovo ovde
          help_root = index
        }
      });
    }

    data.rootTree = []
    data.rootTree.push(event.rootTree)

    localStorage.setItem('project', JSON.stringify(data))
    this._parserData(help_root)
  }
}
