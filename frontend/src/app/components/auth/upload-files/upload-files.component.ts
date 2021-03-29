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
  @Output() emit = new EventEmitter<any>();

  fileNames: Array<String>;
  file: File;
  constructor(private repositoryService: RepositoryService, notifier: NotifierService) {
    this.fileNames = null;
    this.file = null;
    this.notifier = notifier;

  }

  ngOnInit(): void {
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
      formData.append('cover', this.file, this.file.name)
      formData.append('parent', this.list_project.id)
      formData.append('folder', '')
      formData.append('branch', this.branch)

      this.repositoryService.saveFile(formData)
        .subscribe(res => {
          if (res['message'] === 'SUCCESS') {
            this.notifier.notify('success', 'Successful upload')
            this.cancel({ 'rootTree': res['rootTree'], 'branch': this.branch, 'folder': '' })
          } else {
            this.notifier.notify('warming', 'Something isn\'t right. Please wait a moment.')
          }
        }, error => {
          this.notifier.notify('error', 'Server not responding.')
        })
    } else {
      this.notifier.notify('warning', 'First you must choose a file.')
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
