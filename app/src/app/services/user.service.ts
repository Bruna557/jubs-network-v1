import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;
  public token;

  constructor(public _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  followUser(followeId: number): Observable<any> {
    let headers = new HttpHeaders()
      .set('Authorization', this.getToken());
    let userId = parseInt(localStorage.getItem('identity'));

    return this._http.post(this.url + 'user/' + userId + '/follow/' + followeId, {}, {headers: headers});
  }

  unfollowUser(followeId: number): Observable<any> {
    let headers = new HttpHeaders()
      .set('Authorization', this.getToken());
    let userId = parseInt(localStorage.getItem('identity'));

    return this._http.delete(this.url + 'user/' + userId + '/unfollow/' + followeId, {headers: headers});
  }

  getFollowed(): Observable<any> {
    let headers = new HttpHeaders()
      .set('Authorization', this.getToken());
    let userId = parseInt(localStorage.getItem('identity'));

    return this._http.get(this.url + 'user/' + userId + '/followed', {headers: headers});
  }

  getFollowers(): Observable<any> {
    let headers = new HttpHeaders()
      .set('Authorization', this.getToken());
    let userId = parseInt(localStorage.getItem('identity'));

    return this._http.get(this.url + 'user/' + userId + '/followers', {headers: headers});
  }

  login(username: string, password: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');
    let data = 'username=' + username + '&password=' + password;

    return this._http.post(this.url + 'login', data, {headers, responseType: 'text'});
  }

  logout(): Observable<any> {
    let headers = new HttpHeaders()
      .set('Authorization', this.getToken());
    let userId = parseInt(localStorage.getItem('identity'));

    return this._http.post(this.url + 'logout/' + userId, {}, {headers, responseType: 'text'});
  }

  registerUser(user: User) {
    let headers = new HttpHeaders()
      .set('Authorization', this.getToken());
    let body = JSON.stringify(user);

    return this._http.post(this.url + 'register', user, {headers: headers});
  }

  getUserId(username: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Authorization', this.getToken());
    let params = new HttpParams()
      .append('username', username);

    return this._http.get(this.url + 'user', {headers: headers, params: params, responseType: 'text'});
  }

  getUser(userId: number = null): Observable<any> {
    let headers = new HttpHeaders()
      .set('Authorization', this.getToken());

    if(userId == null) {
      userId = parseInt(localStorage.getItem('identity'));
    }

    return this._http.get(this.url + 'user/' + userId, {headers: headers});
  }

  deleteUser(): Observable<any> {
    let headers = new HttpHeaders()
      .set('Authorization', this.getToken());
    let userId = parseInt(localStorage.getItem('identity'));

    return this._http.delete(this.url + 'user/' + userId, {headers: headers});
  }

  changeDescription(description: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Authorization', this.getToken());
    let userId = parseInt(localStorage.getItem('identity'));

    return this._http.put(this.url + 'user/' + userId + '/change-description', description, {headers: headers});
  }

  changePicture(picture: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Authorization', this.getToken());
    let userId = parseInt(localStorage.getItem('identity'));

    return this._http.put(this.url + 'user/' + userId + '/change-picture', picture, {headers: headers});
  }

  changePassword(password: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Authorization', this.getToken());
    let userId = parseInt(localStorage.getItem('identity'));

    return this._http.put(this.url + 'user/' + userId + '/change-password', password, {headers: headers});
  }

  search(text: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Authorization', this.getToken());
    let userId = parseInt(localStorage.getItem('identity'));
    let params = new HttpParams()
      .append('username', text);

    return this._http.get(this.url + 'user/' + userId +'/search', {headers: headers, params: params});
  }

  getToken() {
    let token = localStorage.getItem('token');

    if (token != "undefined") {
        this.token = token;
    } else {
        this.token = null;
    }

    return this.token;
  }
}
