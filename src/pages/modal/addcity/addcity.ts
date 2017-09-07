/**
 * Created by ljj32 on 2017/9/6.
 */
import { Component } from '@angular/core';
import { NavController, ToastController, ViewController } from 'ionic-angular';
import { HttpService } from "../../../commons/http.service";
import { URLSearchParams} from '@angular/http';

import {HomePage} from "../../home/home";

@Component({
  selector: "add-city",
  templateUrl: "./addcity.html",
  providers: [HttpService]
})

export class AddCity {
  cityName: string;
  preCityName: string;
  preCityId: string;
  preProvName: string;
  searchResult: string = "";
  showResult: boolean = false;
  constructor(public navCtrl: NavController,
              public http: HttpService,
              public toastCtrl: ToastController,
              public  viewCtrl: ViewController
  ){
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }
  addCity(cityName, provName, cityId){
    // localStorage.setItem("cityName", cityName);
    // localStorage.setItem("provName", provName);
    // localStorage.setItem("cityId", cityId);
    this.navCtrl.push(HomePage, {"cityId": cityId});
  }
  /*
  * 根据文本框内容查找城市
  * */
  searchCity(){
    if(this.cityName){
      let params = new URLSearchParams();
      params.set("city", this.cityName);
      this.http.get("/search", params).then(res => {
        this.showResult = true;
        let heWeather = res["HeWeather5"][0];
        console.log(heWeather);
        if(heWeather.status == "ok"){
          this.preCityName = heWeather.basic.city;
          this.preProvName = heWeather.basic.prov;
          this.preCityId = heWeather.basic.id;
          this.searchResult = this.preCityName + " - " + this.preProvName;
        }else if(heWeather.status == "unknown city"){
          this.searchResult = "未查询到输入的城市！";
        }
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
