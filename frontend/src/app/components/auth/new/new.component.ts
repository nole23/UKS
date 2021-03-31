import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Repository } from 'src/app/models/repository';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  registration: Repository;
  isSave: Boolean;
  constructor(private repositoryService: RepositoryService, private router: Router) {
    this.registration = new Repository();
    this.isSave = false;
  }

  ngOnInit(): void {
  }

  ngSave() {
    this.isSave = true;
    this.repositoryService.saveRepository(this.registration)
      .subscribe(res => {
        this.isSave = false;
        if (res['message'] === 'SUCCESS') {
          this.router.navigate(['/repo/' + res['project'] + '/c'])
        } else {
          console.log('Nesto ne valja, ovo srediti')
        }
      })
  }
}
