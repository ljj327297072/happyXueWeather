/**
 * Created by ljj32 on 2017/8/30.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
  host: string = "https://free-api.heweather.com/v5";
  key: string = "788a850cd30749189eb546dbdd2107bb";
  constructor(public http: Http) {

  }
  /*
  * get请求
  * */
  get(url: string, params: URLSearchParams): Promise<JSON> {
    params.set("key", this.key);
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
