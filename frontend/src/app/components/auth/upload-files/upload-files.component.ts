import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { RepositoryService } from 'src/app/services/repository.service';


@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {
  private readonly notifier: NotifierService;

  @Input('list_project') list_project: any;
  @Input('branch') branch: any;
  @Input('tree') tree: any;
  @Output() emit = new EventEmitter<any>();

  fileNames: Array<String>;
  file: File;
  constructor(private repositoryService: RepositoryService, notifier: NotifierService) {
    this.fileNames = null;
    this.file = null;
    this.notifier = notifier;
  }

  ngOnInit(): void {
    //TODO namestiti način da se vrati nazad na projekat klikom na link
    //TODO namestiti šetanje kroz dubinu prilikom dodavanja fajlova
  }

  uploadFile($event) {
    this.fileNames = [] // TODO send more files at once
    for (let i = 0; i < $event.target.files.length; i++) {
      this.fileNames = this.fileNames.concat($event.target.files[i])
    }
    this.file = $event.target.files[0]
  }

  upload() {
    if (this.file !== null) {
      const formData = new FormData();
      formData.append('type', 'upload')
      let owner = this.list_project.listUser.find(x => x.role.name === 'O')

      let name = owner.user.username + '_' + this.list_project.name;
      this.tree.forEach(element => {
        name += '_' + element;
      });
      name += '_' + this.file.name
      console.log(name)
      formData.append('cover', this.file, name)
      formData.append('parent', this.list_project.id)
      formData.append('folder', '')
      formData.append('branch', this.branch)
      formData.append('tree', this.tree)

      this.repositoryService.saveFile(formData)
        .subscribe(res => {
          if (res['message'] === 'SUCCESS') {
            this.notifier.notify('success', 'Successful upload')
            this.cancel({ 'rootTree': res['rootTree'], 'folder': this.tree[this.tree.length - 1], 'tree': this.tree })
          } else {
            this.notifier.notify('error', 'Something isn\'t right')
          }
        }, error => {
          this.notifier.notify('error', 'Server not responding')
        })
    } else {
      this.notifier.notify('warning', 'Choose the file first')
    }
  }

  ngIsNull() {
    if (this.file !== null) {
      return false
    } else {
      return true
    }
  }

  delete(index: any) {
    this.fileNames.splice(index, 1)
    this.file = null
  }

  cancel(message = null) {
    this.emit.emit(message)
  }
}
