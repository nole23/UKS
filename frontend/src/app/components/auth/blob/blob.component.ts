import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/repository';
import { RepositoryService } from 'src/app/services/repository.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blob',
  templateUrl: './blob.component.html',
  styleUrls: ['./blob.component.scss']
})
export class BlobComponent implements OnInit {
  private readonly notifier: NotifierService;

  branch: String;
  fileName: String;
  project: any;
  file: any;
  tree: any;
  list_project: any;
  branchName: any;
  isEdit: boolean = false;
  rootTree: any;
  blobEdit: any;
  constructor(private activatedRoute: ActivatedRoute, private repositoryService: RepositoryService, private router: Router, notifier: NotifierService) {
    this.branch = null;
    this.fileName = null;
    this.list_project = null;
    this.branchName = null;
    this.notifier = notifier;
    this.rootTree = null;
    this.blobEdit = null;
  }

  ngOnInit(): void {
    this.project = JSON.parse(localStorage.getItem('project'))

    this.list_project = new Project(this.project);
    this.branchName = this.list_project.rootTree[0].nameBranch;
    this.activatedRoute.params.subscribe(res => {
      this.branch = res['folderName'];
      this.tree = ['master'];
      if (this.branch !== undefined) {
        let fn = this.branch.split('?')[1].split('&')
        fn.forEach(element => {
          let test = element.split('=')[1]
          if (element !== '') this.tree.push(test)
        });

        let helpTreeRoot = this.project.rootTree[0];
        this.tree.forEach(element => {
          if (element !== 'master') {
            helpTreeRoot = helpTreeRoot.childrenFolder.find(x => x.nameNode === element)
          }
        });
        this.list_project = new Project(this.project)
        this.rootTree = [helpTreeRoot];
      }
      this.fileName = res['fileName'];
      this._findFolder();
    })
  }

  _findFolder() {
    let project = JSON.parse(localStorage.getItem('project'));
    let treeRoot = project.rootTree[0]
    if (this.tree.length > 1) {
      let helpTreeRoot = treeRoot;
      this.tree.forEach(element => {
        if (element !== 'master') {
          helpTreeRoot = helpTreeRoot.childrenFolder.find(x => x.nameNode === element);
          this.file = helpTreeRoot.files.find(x => x.name.toString() === this.fileName.toString());
          this.blobEdit = this.file.cover;
        }
      });
    } else {
      this.file = treeRoot.files.find(x => x.name.toString() === this.fileName.toString())
      this.blobEdit = this.file.cover;
    }
  }

  ngParserText(text) {
    return text.replace(/(?:\r\n|\r|\n)/g, '<br>')
  }

  ngOpenEdit() {
    if (this.isEdit) {
      this.blobEdit = this.file.cover;
      this.isEdit = false;
    } else {
      this.isEdit = true;
    }
  }

  ngDelete(file: any) {
    this.repositoryService.deleteFile(file)
      .subscribe(res => {
        if (res['message'] === 'SUCCESS') {
          this.notifier.notify('success', 'File deleted')
          this._updateProject(file)
          this.router.navigate(['/repo/' + this.project.id + '/c'])
        }
      })
  }

  ngSave() {
    this.file.cover = this.blobEdit;
    this.repositoryService.saveEditFile(this.file)
      .subscribe(res => {
        if (res['message'] === 'SUCCESS') {
          this.notifier.notify('success', 'File updated')
          this._updateData();
          this.ngOpenEdit();
        }
      })
  }

  _updateData() {
    let data = JSON.parse(localStorage.getItem('project'))
    localStorage.removeItem('project')

    let helpTreeRoot = data.rootTree[0];
    this.tree.forEach(element => {
      if (element !== 'master') {
        helpTreeRoot = helpTreeRoot.childrenFolder.find(x => x.nameNode === element)
      }
    });

    let file = helpTreeRoot.files.find(x => x.name === this.fileName)
    let index = helpTreeRoot.files.indexOf(x => x.name === this.fileName)
    file.cover = this.file.cover

    helpTreeRoot.files.splice(index, 1)
    helpTreeRoot.files.push(file)

    localStorage.setItem('project', JSON.stringify(data))
  }

  _updateProject(deletefile) {
    let data = JSON.parse(localStorage.getItem('project'))
    localStorage.removeItem('project')

    let helpTreeRoot = data.rootTree[0];
    this.tree.forEach(element => {
      if (element !== 'master') {
        helpTreeRoot = helpTreeRoot.childrenFolder.find(x => x.nameNode === element)
      }
    });

    let index = helpTreeRoot.files.indexOf(x => x.name === this.fileName)

    helpTreeRoot.files.splice(index, 1)

    localStorage.setItem('project', JSON.stringify(data))
  }
}
