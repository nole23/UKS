import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/repository';

@Component({
  selector: 'app-blob',
  templateUrl: './blob.component.html',
  styleUrls: ['./blob.component.scss']
})
export class BlobComponent implements OnInit {

  branch: String;
  fileName: String;
  project: any;
  file: any;
  tree: any;
  list_project: any;
  branchName: any;
  constructor(private activatedRoute: ActivatedRoute) {
    this.branch = null;
    this.fileName = null;
    this.list_project = null;
    this.branchName = null;
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
        console.log(this.tree)
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
          helpTreeRoot = helpTreeRoot.childrenFolder.find(x => x.nameNode === element)
          this.file = helpTreeRoot.files.find(x => x.name.toString() === this.fileName.toString())
        }
      });
    } else {
      this.file = treeRoot.files.find(x => x.name.toString() === this.fileName.toString())
    }
  }

  ngParserText(text) {
    return text.replace(/(?:\r\n|\r|\n)/g, '<br>')
  }

}
