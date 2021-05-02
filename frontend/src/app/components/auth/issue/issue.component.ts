import { Component, OnInit, Input } from '@angular/core';
import { RepositoryService } from 'src/app/services/repository.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { Issue } from 'src/app/models/repository';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {
  private readonly notifier: NotifierService;

  @Input('issueId') issueId: any;
  @Input('repoId') repoId: any;

  issue: any;
  comment: any;
  project: any;
  user: any;
  isDisable: Boolean = false;
  isAssigned: Boolean = false;
  imgUrl = 'http://localhost:8000/media/picture/'
  constructor(private repositoryService: RepositoryService, notifier: NotifierService, private router: Router) {
    this.issue = null;
    this.comment = null;
    this.notifier = notifier;
    this.project = JSON.parse(localStorage.getItem('project'));
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
    this.repositoryService.getIssueById(this.issueId)
      .subscribe(res => {
        let data = res['data']
        data['comments'] = res['comments']
        this.issue = new Issue(data)

        this.isDisable = !this.issue.status;
        this.isAssignedFunction()
      })
  }

  ngComment() {
    const formData = new FormData();
    formData.append('id', this.issueId)
    formData.append('comment', this.comment)

    this.repositoryService.saveComment(formData)
      .subscribe(res => {
        if (res['message'] === 'SUCCESS') {
          this.issue.comments.push(res["data"])
          this.comment = null
        }
      })
  }

  ngCloseIssue(issue: any) {
    const formData = new FormData();
    formData.append('id', issue.id)

    this.repositoryService.closeIssues(formData)
      .subscribe(res => {
        if (res['message'] === 'SUCCESS') {
          this.notifier.notify('success', 'Issue is closed.')
          this.issue.comments.push(res["data"])
          this.isDisable = true;
          issue.status = false;
          this._updateProject(issue.id, issue, 'close');
        } else {
          this.notifier.notify('warning', 'Issue is already closed.')
        }
      })
  }

  deleteIssue(idIssues: any) {
    this.repositoryService.deleteIssues(idIssues)
      .subscribe(res => {
        if (res['message'] === 'FALSE') {
          this.notifier.notify('error', 'Not delete issue!')
        }

        this.notifier.notify('success', 'Delete issue  ' + idIssues + '. successifull.')
        this._updateProject(idIssues, null, 'remove');
      })
  }

  isOwner(userAdd: any) {
    return userAdd.id.toString() === this.user.id.toString();
  }

  updateIssue() {
    const formData = new FormData();
    formData.append('id', this.issue.id);
    formData.append('name', this.issue.name);
    formData.append('description', this.issue.description);

    this.repositoryService.updateIssue(formData)
      .subscribe(res => {
        if (res['message'] === 'SUCCESS') {
          this.notifier.notify('success', 'Issue #' + this.issue.id + ' is update successiful.')
          this.issue.comments.push(res["data"])
          this._updateIssueProject(this.issue);
        }
      })
  }

  assignedUser() {
    const formData = new FormData();
    formData.append('id', this.issue.id);
    this.repositoryService.assignedIssue(formData)
      .subscribe(res => {
        if (res['message'] === 'SUCCESS') {
          this.notifier.notify('success', 'Assigned is successifull')
          this.issue.comments.push(res['data'])
          this.issue.assigned = res['issue']['assigned']
          this._updateIssueProject(this.issue)
        }
      })
  }

  isAssignedFunction() {
    if (this.issue.assigned.length > 0) {
      if (this.issue.assigned[0].id.toString() === this.user.id.toString()) {
        this.isAssigned = true;
      }
    }
  }

  _updateIssueProject(issue: any) {
    let data = JSON.parse(localStorage.getItem('project'))
    localStorage.removeItem('project')

    let index = data.issue.findIndex(x => x.id.toString() === this.issue.id.toString())

    data.issue[index] = this.issue;

    localStorage.setItem('project', JSON.stringify(data))

    this.isAssignedFunction()
  }

  _updateProject(idIssues: any, newData: any, type: String) {
    let data = JSON.parse(localStorage.getItem('project'))
    localStorage.removeItem('project')

    let index = data.issue.findIndex(x => x.id.toString() === idIssues.toString())

    if (type === 'remove') {
      data.issue.splice(index, 1)
    }

    if (type === 'close') {
      data.issue[index] = newData
    }

    localStorage.setItem('project', JSON.stringify(data))

    this.router.navigate(['/repo/' + this.project.id + '/i'])
  }

  changeText(text: String) {
    return text.length > 30 ? text.substring(0, 30) + '...' : text;
  }
}
