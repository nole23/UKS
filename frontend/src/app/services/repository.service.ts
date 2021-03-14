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

  getAllIssuesByRepository(id: any) {
    // return this.http.get(environment.apiUrl + 'get-all-issues/' + id)
    //   .pipe(map(res => {
    //     return res;
    //   }))
  }

  getRepositoryById(id: any) {
    return this.http.get(environment.apiUrl + 'get-repositpry/' + id)
      .pipe(map(res => {
        if (res['status'] === 'SUCCESS') {
          return res['data']
        }
        return {};
      }))
  }

  saveIssue(item: any) {
     return this.http.post(environment.apiUrl + 'add-issue', item)
      .pipe(map(res => {
        return res;
      }))
  }

  getIssueById(id: any) {
    return this.http.get(environment.apiUrl + 'issue/' + id)
      .pipe(map(res => {
        return res
      }))
  }

  saveComment(item: any) {
    return this.http.post(environment.apiUrl + 'add-issue-comment', item)
     .pipe(map(res => {
       return res;
     }))
 }
}
