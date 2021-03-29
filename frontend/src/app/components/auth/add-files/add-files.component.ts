import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { RepositoryService } from 'src/app/services/repository.service';


@Component({
  selector: 'app-add-files',
  templateUrl: './add-files.component.html',
  styleUrls: ['./add-files.component.scss']
})
export class AddFilesComponent implements OnInit {
  private readonly notifier: NotifierService;

  @Input('list_project') list_project: any;
  @Input('branch') branch: any;
  @Output() emit = new EventEmitter<any>();

  file: any;
  body: any;
  name: any;
  nameFolder: any;
  constructor(private repositoryService: RepositoryService, notifier: NotifierService) {
    this.file = null;
    this.body = '';
    this.name = '';
    this.nameFolder = '';
    this.notifier = notifier;
  }

  ngOnInit(): void {
  }

  createFile() {
    if (this.body !== '' && this.name !== '') {
      const formData = new FormData();
      formData.append('type', 'create')
      formData.append('title', this.name)
      formData.append('folder', this.nameFolder)
      formData.append('branch', this.branch)
      formData.append('text', this.body)
      formData.append('parent', this.list_project.id)

      this.repositoryService.saveFile(formData)
        .subscribe(res => {
          if (res['message'] === 'SUCCESS') {
            this.notifier.notify('success', 'File ' + this.name + ' is created!')
            this.cancel({ 'rootTree': res['rootTree'], 'branch': this.branch, 'folder': this.nameFolder })
          } else {
            this.notifier.notify('warming', 'Something isn\'t right. Please wait a moment.')
          }
        }, error => {
          this.notifier.notify('error', 'Server not responding.')
        })
    }
    else {
      this.notifier.notify('warning', this.body === "" ? 'Body can\'t be an empty string!' : 'File name can\'t be an empty string!')
    }
  }

  ngIsNull() {
    if (this.body !== '' && this.name !== '') {
      return false
    } else {
      return true
    }
  }

  cancel(message = null) {
    this.emit.emit(message)
  }
}
