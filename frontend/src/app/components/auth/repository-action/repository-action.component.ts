import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-repository-action',
  templateUrl: './repository-action.component.html',
  styleUrls: ['./repository-action.component.scss']
})
export class RepositoryActionComponent implements OnInit {

  description: any
  constructor(private repositoryService: RepositoryService) {
    this.description = null
  }

  ngOnInit(): void {
    this._getActions();
  }

  _getActions() {
    const id = JSON.parse(localStorage.getItem('project'))['id']
    this.repositoryService.getActions(id)
      .subscribe(res => {
        this.description = res['description']
      })
  }

}
