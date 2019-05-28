import { Injectable } from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MytaskService {

  api_url = environment.HOST.link;

  constructor(private http: Http) { }

  options() {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.set('Authorization', 'vedakiskey');
    const head: any = {headers: headers};
    return new RequestOptions(head);
}

  createUser(payload) {
    return this.http.post(this.api_url + '/users/createUser', payload, this.options());
  }

  getUsers() {
    return this.http.get(this.api_url + '/users', this.options());
  }
}
