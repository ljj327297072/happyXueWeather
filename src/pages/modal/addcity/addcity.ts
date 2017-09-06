/**
 * Created by ljj32 on 2017/9/6.
 */
import { Component } from '@angular/core';
import { NavController, ToastController, ViewController } from 'ionic-angular';
import { HttpService } from "../../../commons/http.service";
import { URLSearchParams} from '@angular/http';

@Component({
  selector: "add-city",
  templateUrl: "./addcity.html",
  providers: [HttpService]
})

export class AddCity {
  cityName: string;
  preCityName: string;
  constructor(public navCtrl: NavController,
              public http: HttpService,
              public toastCtrl: ToastController,
              public  viewCtrl: ViewController
  ){
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }
  /*
  * 根据文本框内容查找城市
  * */
  searchCity(){
    if(this.cityName){
      let params = new URLSearchParams();
      params.set("city", this.cityName);
      this.http.get("/search", params).then(res => {
        console.log(res);
      }).catch(err => {
        let toast = this.toastCtrl.create({
          message: "请求失败",
          cssClass: "customeToast",
          duration: 1500,
          position: "top"
        });
        toast.present();
      })
    }
  }
}
