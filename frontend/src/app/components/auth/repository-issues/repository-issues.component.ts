import { Component, OnInit, Input } from '@angular/core';
import { RepositoryService } from 'src/app/services/repository.service';
import { Issue } from 'src/app/models/repository';

@Component({
  selector: 'app-repository-issues',
  templateUrl: './repository-issues.component.html',
  styleUrls: ['./repository-issues.component.scss']
})
export class RepositoryIssuesComponent implements OnInit {
  @Input('list_project') list_project: any;

  settings: any;
  id: any;
  isAdd: Boolean;
  issue: any;
  active: any;
  finish: any;
  constructor(private repositoryService: RepositoryService) {
    this.settings = null;
    this.isAdd = false;
    this.id = null;
    this.settings = null;
    this.active = 0;
    this.finish = 0;
  }

  ngOnInit(): void {
    this.id = this.list_project.id;
    this.issue = this.list_project.issue;
    this.settings = {
      class: 'table table-hover border border-radius-10',
      thead: null,
      tbody: {
        class: '',
        tr: []
      }
    }
    this._generateTable();
    this._setInformation();
  }

  _setInformation() {
    this.issue.forEach(element => {
      if (element.status) {
        this.active = this.active + 1;
      } else {
        this.finish = this.finish + 1;
      }
    });
  }
  
  _generateTable() {
    this.settings['tbody']['class'] = 'border-radius-collapse';
    this.settings['tbody']['tr'] = this._setTr(this.issue)
  }

  _setTr(item: any) {
    let data = [];
    item.forEach(element => {
      data.push(
        {
          td: this._setTd(element)
        }
      )
    });
    return data;
  }

  _setTd(item: any) {
    let data = [{
      id: item.id,
      link: null,
      name: '<div class="w-100 h-50 font-16 bold"> <a class="cursor color-green" href="/issue/' + item.id + '"> ' + item.name + ' </a></div><div class="w-100 h-50 font-12">' + item.description + ' <span class="font-8">' + item.user.firstName + ' ' + item.user.lastName + '</span></div>'
    }]
    return data;
  }

  onEmitPublic(event: any) {
    this.isAdd = false;
    let issue = new Issue(event);
    let td = this._setTd(issue)
    this.settings['tbody']['tr'].push({td:td})
  }
}
