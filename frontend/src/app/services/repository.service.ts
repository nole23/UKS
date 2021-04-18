import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Repository } from 'src/app/models/repository';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  private API_URL = environment['apiUrl'];

  constructor(private http: HttpClient) { }

  saveRepository(repository: Repository) {
    return this.http.post(this.API_URL + 'repository', repository)
      .pipe(map(res => {
        return res;
      }))
  }

  getAllRepository() {
    return this.http.get(this.API_URL + 'get-all-repository')
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
    return this.http.get(this.API_URL + 'get-repositpry/' + id)
      .pipe(map(res => {
        if (res['message'] === 'SUCCESS') {
          return { 'status': true, 'project': res['project'] }
        }
        return { 'status': false }
      }))
  }

  saveIssue(item: any) {
    return this.http.post(this.API_URL + 'add-issue', item)
      .pipe(map(res => {
        return res;
      }))
  }

  getIssueById(id: any) {
    return this.http.get(this.API_URL + 'issue/' + id)
      .pipe(map(res => {
        return res
      }))
  }

  saveComment(item: any) {
    return this.http.post(this.API_URL + 'add-issue-comment', item)
      .pipe(map(res => {
        return res;
      }))
  }

  filter(status: any, params: any, id: any) {
    return this.http.get(this.API_URL + 'filter/' + status + '/' + params + '/' + id)
      .pipe(map(res => {
        return res;
      }))
  }

  deleteRepository(id: any) {
    return this.http.delete(this.API_URL + 'delete-repository/' + id, {})
      .pipe(map(res => {
        return res;
      }))
  }

  saveFile(file: any) {
    return this.http.post(this.API_URL + 'files', file)
      .pipe(map(res => {
        return res;
      }))
  }
}
