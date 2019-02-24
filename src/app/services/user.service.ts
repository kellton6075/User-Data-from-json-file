import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
}

 /**
  * @method getUserJSON()
  * @desc used to get json file from assets folder.
  */
public getUserJSON(): Observable<any> {
  return this.http.get('assets/data.json');
}}
