import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { RepositoryService } from 'src/app/services/repository.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.scss']
})
export class AddIssueComponent implements OnInit {
  private readonly notifier: NotifierService;

  @Input('id') id: any;
  @Output() emit = new EventEmitter<any>();

  newIssue: any;
  isRegistration: Boolean;
  labels: any;
  addLabels: any = null;
  constructor(private repositoryService: RepositoryService, notifier: NotifierService) {
    this.isRegistration = false;
    this.notifier = notifier;
  }

  ngOnInit(): void {
    this._getLabels();
    this.newIssue = {
      name: '',
      description: '',
      user: JSON.parse(localStorage.getItem('user')),
      id: this.id
    }
  }

  _getLabels() {
    this.labels = JSON.parse(localStorage.getItem('labels'));
  }

  ngAddIssue() {
    this.isRegistration = true;

    const formData = new FormData();
    formData.append('name', this.newIssue.name)
    formData.append('description', this.newIssue.description)
    formData.append('id', this.id)
    formData.append('labels', this.addLabels === null ? null : this.addLabels.id)

    this.repositoryService.saveIssue(formData)
      .subscribe(res => {
        if (res["message"] === 'SUCCESS') {
          this.isRegistration = false;
          this.emit.emit(res['data'])
          this.notifier.notify('success', 'New issue added')
        }
      })
  }

  setLabels(item: any) {
    this.addLabels = item;
  }

  _disableButton() {
    return this.newIssue.name && this.newIssue.description;
  }
}
