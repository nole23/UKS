import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
        if (res['message'] === 'SUCCESS') {
          return { 'status': true, 'project': res['project'] }
        }
        return { 'status': false }
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

  filter(status: any, params: any, id: any) {
    return this.http.get(environment.apiUrl + 'filter/' + status + '/' + params + '/' + id)
      .pipe(map(res => {
        return res;
      }))
  }

  deleteRepository(id: any) {
    return this.http.delete(environment.apiUrl + 'delete-repository/' + id, {})
      .pipe(map(res => {
        return res;
      }))
  }

  saveFile(file: any) {
    return this.http.post(environment.apiUrl + 'files', file)
      .pipe(map(res => {
        return res;
      }))
  }

  updateProject(data: any) {
    return this.http.put(environment.apiUrl + 'updateProject', data)
      .pipe(map(res => {
        return res;
      }))
  }

  userSearch(text: any) {
    return this.http.get(environment.apiUrl + 'userSearch/' + text)
      .pipe(map(res => {
        return res;
      }))
  }

  addUserInProject(data: any) {
    return this.http.post(environment.apiUrl + 'addUserInProject', data)
      .pipe(map(res => {
        return res;
      }))
  }

  getActions(id: any) {
    return this.http.get(environment.apiUrl + 'actions/' + id)
      .pipe(map(res => {
        return res;
      }))
  }
}
