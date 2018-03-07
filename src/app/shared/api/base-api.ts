import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const BASE_URL = 'https://intense-taiga-49656.herokuapp.com/';

@Injectable()
export class BaseApi {

  constructor(public http: HttpClient) {
  }

  private static getUrl(url: string = ''): string {
    return BASE_URL + url;
  }

  public get(url: string = ''): Observable<any> {
    return this.http.get(BaseApi.getUrl(url));
  }

  public post(url: string = '', data: any = {}): Observable<any> {
    return this.http.post(BaseApi.getUrl(url), data);
  }

  public put(url: string = '', data: any = {}): Observable<any> {
    return this.http.put(BaseApi.getUrl(url), data);
  }

  public delete(url: string = '', data: any = {}): Observable<any> {
    return this.http.delete(BaseApi.getUrl(url), data);
  }
}
