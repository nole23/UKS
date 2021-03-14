import { Component, OnInit, Input } from '@angular/core';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {
  @Input('issueId') issueId:any;
  @Input('repoId') repoId:any;

  issue:any;
  comment:String;
  constructor(private repositoryService: RepositoryService) { 
    this.issue = null;
    this.comment = null;
  }

  ngOnInit(): void {
    this.repositoryService.getIssueById(this.issueId)
      .subscribe(res => {
        console.log(res)
        this.issue = res['issue']
      })
  }

  ngComment() {
    let data = {
      id: this.issueId,
      comment: this.comment,
      user: JSON.parse(localStorage.getItem('user'))
    }

    this.repositoryService.saveComment(data)
      .subscribe(res => {
        this.issue.issueComment.push(res["comment"])
        this.comment = null
    })
  }
}
