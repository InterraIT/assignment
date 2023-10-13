import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _url: string = environment.API;
  constructor(private http: HttpClient) { }
  getUserList(): Observable<any> {
    let url: string =  "http://localhost:5171/api/Contact";
    return this.http.get<any>(url);
  }

  addNewUser(payload: any) {
    let url = "http://localhost:5171/api/Contact";
    return this.http.post<any>(url,JSON.stringify(payload));
  }
  updateUser(payload: any) {
    let url = "http://localhost:5171/api/Contact";
    return this.http.put<any>(url,JSON.stringify(payload));
  }
  deleteUser(id: any) {
    let url = "http://localhost:5171/api/Contact?id=" + id;
    return this.http.delete<any>(url);
  }
}
