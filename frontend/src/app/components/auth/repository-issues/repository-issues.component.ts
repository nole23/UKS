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
  backUpData: any;
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
    this.backUpData = this.list_project.issue;
    this._generateTable(this.issue);
    this._setInformation();
    this._filterUser();
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
  
  _generateTable(item:any) {
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
      name: '<div class="w-100 h-50 font-16 bold"> <a class="cursor color-green" href="/repo/' + this.repoId + '/issue/' + item.id + '"> ' + item.name + ' </a></div><div class="w-100 h-50 font-12">' + item.description + ' <span class="font-8">' + item.user.firstName + ' ' + item.user.lastName + '</span></div>'
    }]
    return data;
  }

  onEmitPublic(event: any) {
    this.isAdd = false;
    let issue = new Issue(event);
    let td = this._setTd(issue)
    this.settings['tbody']['tr'].push({td:td})
  }

  ngFilterStatus() {
    let test = this.form.nativeElement.children['select'].value
    this.settings = null;

    if (test === 'status') {
      this.issue = this.list_project.issue
      setTimeout(() => {
        this._generateTable(this.list_project.issue)
      }, 50);
    }
    else {
      this.repositoryService.filter('status', this.form.nativeElement.children['select'].value, this.repoId)
      .subscribe(res=>{
        this.form.nativeElement.children['author'].value = 'author'
        let resData = [];
        res['data'].forEach(element => {
          let i = new Issue(element)
          resData.push(i)
        });
        this.issue = resData
        this.backUpData = resData
        this._generateTable(resData)
      })
    }
  }

  ngFilterAction() {
    let test = this.form.nativeElement.children['author'].value
    this.settings = null;
    if (test === 'author') {
      this.issue = this.backUpData
      setTimeout(() => {
        this._generateTable(this.issue)
      }, 50);
    }
    else {
      this.settings = null;
      this.issue = this.backUpData.filter(x => x.user.id === this.form.nativeElement.children['author'].value)
      setTimeout(() => {
        this._generateTable(this.issue)
      }, 50);
    }

  }

  _filterUser() {
    // filter
    // this.userInProject = this.issue.filter((v,i,a)=>a.findIndex(t=>(t.user.id === v.user.id))===i)
    this.userInProject = this.list_project.list_user
  }
}
