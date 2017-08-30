import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpService} from "../../commons/http.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
                public http: HttpService
  ) {
    let params = new URLSearchParams();
    params.set("city", "青岛");
    this.http.get("/weather", params).then(res => {
      console.log(res);
    })
  }

}
