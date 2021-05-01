import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { RepositoryService } from 'src/app/services/repository.service';
import { Issue } from 'src/app/models/repository';

@Component({
  selector: 'app-repository-issues',
  templateUrl: './repository-issues.component.html',
  styleUrls: ['./repository-issues.component.scss']
})
export class RepositoryIssuesComponent implements OnInit {
  @Input('list_project') list_project: any;
  @Input('id') repoId: any;
  @ViewChild('formcontrol') form: ElementRef;

  settings: any;
  id: any;
  isAdd: Boolean;
  issue: any;
  active: any;
  finish: any;
  status: any;
  action: any;
  userInProject: any;
  constructor(private repositoryService: RepositoryService) {
    this.settings = null;
    this.isAdd = false;
    this.id = null;
    this.active = 0;
    this.finish = 0;
    this.action = null;
  }

  ngOnInit(): void {
    this.id = this.list_project.id;
    this.issue = this.list_project.issue;
    this._generateTable(this.issue);
    this._setInformation();
    this._filterUser();
  }

  _setInformation() {
    this.issue = JSON.parse(localStorage.getItem('project'))['issue']
    this.active = 0
    this.finish = 0

    this.active = this.issue.length

    this.issue.forEach(element => {
      if (element.status) {
        //this.active = this.active + 1;
      } else {
        this.finish = this.finish + 1;
      }
    });
  }

  _generateTable(item: any) {
    this.settings = {
      class: 'table table-hover border border-radius-10',
      thead: null,
      tbody: {
        class: '',
        tr: []
      }
    }
    this.settings['tbody']['class'] = 'border-radius-collapse';
    this.settings['tbody']['tr'] = this._setTr(item)
  }

  _setTr(item: any) {
    let data = [];
    item.forEach(element => {
      data.push(
        {
          //class: element.status ? '' : 'color-background-red',
          td: this._setTd(element)
        }
      )
    });
    return data;
  }

  _setTd(item: any) {
    let description = item.description.length < 100 ? item.description : item.description.substring(0, 100) + '...'
    let name = item.name.length < 50 ? item.name : item.name.substring(0, 50) + '...'
    let color = item.status ? 'color-green' : 'color-red'
    let icon = item.status ? '<i class="fa fa-exclamation-circle color-green" aria-hidden="true"></i>' : '<i class="fa fa-exclamation-circle color-red" aria-hidden="true"></i>'
    let data = [{
      id: item.id,
      link: null,
      name: '<div class="w-100 h-50 font-16 bold">' + icon + '<a class="cursor ' + color + '" href="/repo/' + this.repoId + '/issue/' + item.id + '"> ' + name + ' </a></div><div class="w-100 h-50 font-12">' + description + ' <span class="font-8">' + item.user.firstName + ' ' + item.user.lastName + '</span></div>'
    }]
    return data;
  }

  onEmitPublic(event: any) {
    this.isAdd = false;
    let issue = new Issue(event);
    let td = this._setTd(issue)
    this.settings['tbody']['tr'].push({ td: td })
    this._updateProject(issue);
  }

  ngFilterStatus() {
    let status = this.form.nativeElement.children['select'].value
    let nameUser = this.form.nativeElement.children['author'].value
    this.settings = null;

    if (status === 'status') {
      this.issue = this.list_project.issue
      setTimeout(() => {
        this._generateTable(this.list_project.issue)
      }, 50);
    }
    else {
      this.repositoryService.filter('status', status, nameUser, this.repoId)
        .subscribe(res => {
          if (res['message'] === 'SUCCESS') {
            let resData = [];
            res['data'].forEach((element: any) => {
              resData.push(new Issue(element))
            });

            this.issue = resData
            this._generateTable(resData)
          }
        })
    }
  }

  _filterUser() {
    this.userInProject = this.list_project.listUser
  }

  _updateProject(issue: Issue) {
    let data = JSON.parse(localStorage.getItem('project'))
    localStorage.removeItem('project')

    data.issue.push(issue)

    localStorage.setItem('project', JSON.stringify(data));

    this._setInformation();
  }
}
