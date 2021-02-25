import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.scss']
})
export class AddIssueComponent implements OnInit {
  @Input('id') id: any;
  @Output() emit = new EventEmitter<any>();

  newIssue: any;
  isRegistration: Boolean;
  constructor(private repositoryService: RepositoryService) {
    this.isRegistration = false;
  }

  ngOnInit(): void {
    this.newIssue = {
      name: '',
      description: '',
      user: JSON.parse(localStorage.getItem('user')),
      id: this.id
    }
  }

  ngAddIssue() {
    this.isRegistration = true;
    this.repositoryService.saveIssue(this.newIssue)
      .subscribe(res => {
        this.emit.emit(res['issue'])
        this.isRegistration = false;
      })
  }
}
