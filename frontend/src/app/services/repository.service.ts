import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Repository } from 'src/app/models/repository';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: HttpClient) { }

  saveRepository(repository: Repository) {
    return this.http.post(environment.apiUrl + 'repository', repository)
      .pipe(map(res => {
        return res;
      }))
  }

  getAllRepository() {
    return this.http.get(environment.apiUrl + 'get-all-repository')
      .pipe(map(res => {
        return res;
      }))
  }
}
