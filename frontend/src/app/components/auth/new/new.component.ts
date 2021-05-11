import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Repository } from 'src/app/models/repository';
import { RepositoryService } from 'src/app/services/repository.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  private readonly notifier: NotifierService;

  registration: Repository;
  isSpiner: Boolean = false;
  constructor(private repositoryService: RepositoryService, private router: Router, notifier: NotifierService) {
    this.registration = new Repository();
    this.notifier = notifier;
  }

  ngOnInit(): void {
  }

  ngSave() {
    this.isSpiner = true;
    this.repositoryService.saveRepository(this.registration)
      .subscribe(res => {
        this.isSpiner = false;
        if (res['message'] === 'SUCCESS') {
          this.router.navigate(['/repo/' + res['project'] + '/c'])
        } else {
          this.notifier.notify('warming', 'Server not found. Please contant administrator.')
        }
      })
  }

  _disableButton() {
    return this.registration.name && this.registration.description;
  }
}
