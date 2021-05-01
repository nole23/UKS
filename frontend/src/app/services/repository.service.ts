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

  getAllRepository(id: any) {
    return this.http.get(this.API_URL + 'get-all-repository/' + id)
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

  closeIssues(data: any) {
    return this.http.put(this.API_URL + 'close-issue', data)
      .pipe(map(res => {
        return res;
      }))
  }

  updateIssue(data: any) {
    return this.http.put(this.API_URL + 'update-issue', data)
      .pipe(map(res => {
        return res;
      }))
  }

  assignedIssue(data: any) {
    return this.http.put(this.API_URL + 'assigne-issue', data)
      .pipe(map(res => {
        return res;
      }))
  }

  filter(status: any, params: any, nameUser: any, id: any) {
    return this.http.get(this.API_URL + 'filter/' + status + '/' + params + '/' + nameUser + '/' + id)
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

  deleteIssues(id: any) {
    return this.http.delete(this.API_URL + 'delete-issues/' + id, {})
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

  getParam(id: any) {
    return this.http.get(environment.apiUrl + 'statistic/' + id)
      .pipe(map(res => {
        return res;
      }))
  }
}
