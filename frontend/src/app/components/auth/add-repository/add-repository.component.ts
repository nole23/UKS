import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-add-repository',
  templateUrl: './add-repository.component.html',
  styleUrls: ['./add-repository.component.scss']
})
export class AddRepositoryComponent implements OnInit {
  @Output() emit = new EventEmitter<any>();

  search: String;
  constructor(private repositoryService: RepositoryService) { }

  ngOnInit(): void {
  }

  filter() {
    if (this.search.length > 2) {
      this.repositoryService.repoSearch(this.search)
        .subscribe(res => {
          if (res['status'] === 'SUCCESS') {
            this.emit.emit(res['data'])
          }
        })
    } else {
      this.emit.emit([])
    }
  }

}
