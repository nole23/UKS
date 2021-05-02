import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  updateUserData(data: any) {
    return this.http.put(this.API_URL + '', data)
      .pipe(map(res => {
        return res;
      }))
  }

  getUserById(id: any) {
    return this.http.get(this.API_URL + '' + id)
      .pipe(map(res => {
        return res;
      }))
  }
}
