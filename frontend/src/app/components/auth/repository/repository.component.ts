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
  branch: String;
  tree: any;
  constructor(private activatedRoute: ActivatedRoute, private repositoryService: RepositoryService) {
    this.list_project = null;
    this.rootTree = null;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.repoId = res['id'];
      this.viewId = res['type'];
      console.log(this.repoId)
      if (this.viewId === 'issue') {
        this.issueId = res['idIssue']
      }

      if (this.viewId === 'c') {
        const folderName = res['folderName'];
        this.tree = ['master']
        // this.tree = [folderName.split('?')[0]]
        if (folderName !== undefined) {
          let fn = folderName.split('?')[1].split('&')
          fn.forEach(element => {
            let test = element.split('=')[1]
            if (element !== '') this.tree.push(test)
          });
        }

      }
      this._getRepository(res['id']);
    })
  }

  _getNewRepoNode() {
    let project = JSON.parse(localStorage.getItem('project'));
    let treeRoot = project.rootTree[0]

    if (this.tree !== undefined && this.tree.length > 1) {
      this.list_project = null;
      this.rootTree = null;
      this.branch = null;
      let helpTreeRoot = treeRoot;
      this.tree.forEach(element => {
        if (element !== 'master') {
          helpTreeRoot = helpTreeRoot.childrenFolder.find(x => x.nameNode === element)
        }
      });
      this.list_project = new Project(project)
      this.rootTree = [helpTreeRoot];
      this.branch = this.list_project.rootTree[0].nameBranch;
    } else {
      this.list_project = new Project(project)
      this.rootTree = this.list_project.rootTree;
      this.branch = this.list_project.rootTree[0].nameBranch;
    }
  }

  _getRepository(id: any) {
    let project = JSON.parse(localStorage.getItem('project'));
    if (project === null) {
      this.repositoryService.getRepositoryById(id)
        .subscribe(res => {
          if (res['status']) {
            localStorage.setItem('project', JSON.stringify(res['project']))
            this._getNewRepoNode();
          }
        })
    } else {
      this._getNewRepoNode();
    }
  }

  ngCloseRepo() {
    console.log('ovo treba srediti')
  }
}
