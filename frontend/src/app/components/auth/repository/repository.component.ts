import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService } from 'src/app/services/repository.service';
import { List_Project_User, Project } from 'src/app/models/repository';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {

  list_project: Project
  viewId: String;
  repoId: any;
  issueId: any;
  rootTree: any;
  constructor(private activatedRoute: ActivatedRoute, private repositoryService: RepositoryService) {
    this.list_project = null;
    this.rootTree = null;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.repoId = res['id'];
      this.viewId = res['type'];
      
      if (this.viewId === 'issue'){
        this.issueId = res['idIssue']
      }

      //if (this.viewId === 'i') {
        this._getRepositpry(res['id']);
     // } 
    })
  }

  _getRepositpry(id: any) {
    this.repositoryService.getRepositoryById(id)
      .subscribe(res => {
        this.list_project = new Project(res['project'])
        this.rootTree = this.list_project.rootTree;
      })
  }

  ngCloseRepo() {
    console.log('ovo treba srediti')
  }
}
