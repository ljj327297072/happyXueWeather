/**
 * Created by ljj32 on 2017/8/30.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
  host: string = "https://weixin.jirengu.com/weather";
  constructor(public http: Http) {

  }
  /*
  * get请求
  * */
  get(url: string, params: URLSearchParams): Promise<JSON> {
    return new Promise((resolve, reject) => {
      this.http.get(this.genUrl(url), {search: params})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          reject(err);
        });
    })
  }
  /*
   * 处理请求链接
   * */
  genUrl(url): string{
    return this.host + url;
  }
}
