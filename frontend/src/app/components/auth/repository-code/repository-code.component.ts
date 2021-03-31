import { Component, OnInit, Input } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Files, RootTree, ChildremTree } from 'src/app/models/repository';

@Component({
  selector: 'app-repository-code',
  templateUrl: './repository-code.component.html',
  styleUrls: ['./repository-code.component.scss']
})
export class RepositoryCodeComponent implements OnInit {
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
        name: element.name
      })
    });

    return resData;
  }

  _parserChildren(data: any, type: String) {
    let currentDate = new Date();
    let dateSent = new Date(data.dateCreate);
    let lastDay = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));

    return {
      id: data.id,
      name: type === 'folder' ? data.nameNode : data.name,
      parentFolder: type === 'file' ? data.nameNode : null,
      dateCreate: lastDay < 0 ? 'Created today.' : lastDay + '  days ago.'
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
          class: '',
          style: '',
          link: null,
          name: '<span class="float-right color-text">' + data.dateCreate + '</span>'
        }
      ]
    }
  }

  _pushNewFile(event: any) {
    const branch = event.branch, folder = event.folder;
    let data = JSON.parse(localStorage.getItem('project'));
    localStorage.removeItem('project');

    if (folder === '') {
      const indexFile = event.rootTree.files.length - 1;
      for (let i in this.rootTree) {
        this.rootTree[i].files.push(new Files(event.rootTree.files[indexFile]))
        data.rootTree[i].files.push(new Files(event.rootTree.files[indexFile]))
      }
    }

    if (folder !== '') {
      const indexChildrenFolder = event.rootTree.childrenFolder.length - 1;
      for (let i in this.rootTree) {
        this.rootTree[i].childrenFolder.push(new ChildremTree(event.rootTree.childrenFolder[indexChildrenFolder]))
        data.rootTree[i].childrenFolder.push(new ChildremTree(event.rootTree.childrenFolder[indexChildrenFolder]))
      }
    }

    localStorage.setItem('project', JSON.stringify(data))
    this._parserData(this.rootTree[0])
  }
}
