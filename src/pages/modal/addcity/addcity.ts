/**
 * Created by ljj32 on 2017/9/6.
 */
import { Component } from '@angular/core';
import {LoadingController, NavController, ToastController, ViewController} from 'ionic-angular';
import { HttpService } from "../../../commons/http.service";
import { URLSearchParams} from '@angular/http';

import {TabsPage} from "../../tabs/tabs";

@Component({
  selector: "add-city",
  templateUrl: "./addcity.html",
  providers: [HttpService]
})

export class AddCity {
  cityName: string;
  cityNamePlace: string = "";
  showFlag: boolean;
  preCityName: string;
  preProvName: string;
  preCityId: string;
  addFlag: boolean = true;
  constructor(public navCtrl: NavController,
              public http: HttpService,
              public toastCtrl: ToastController,
              public  viewCtrl: ViewController,
              public loadingCtrl: LoadingController
  ){
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }
  addCity(cityName, provName, cityId){
    this.addFlag = true;
    if(localStorage.getItem("cityList")){
      let cityList = JSON.parse(localStorage.getItem("cityList"));
      if(cityList.length >= 3){
        let toast = this.toastCtrl.create({
          message: "最多添加3个城市",
          cssClass: "customeToast",
          duration: 1500,
          position: "top"
        });
        toast.present();
        setTimeout(()=>{
          this.viewCtrl.dismiss();
        },2000);
        return;
      }
      for(let i = 0;i < cityList.length;i++){
        if(cityList[i].cityId == cityId){
          this.addFlag = false;
          break;
        }
      }
      if(this.addFlag){
        cityList.push({"cityName": cityName, "cityId": cityId, "provName": provName});
        localStorage.removeItem("cityList");
        localStorage.setItem("cityList", JSON.stringify(cityList));
        this.navCtrl.push(TabsPage, {tabSelect: "1"})
      }else{
        let toast = this.toastCtrl.create({
          message: "你已添加过此城市！",
          cssClass: "customeToast",
          duration: 1500,
          position: "top"
        });
        toast.present();
        setTimeout(()=>{
          this.viewCtrl.dismiss();
        },2000);
        return;
      }
    }else{
      let cityList = [{"cityName": cityName, "cityId": cityId, "provName": provName}];
      localStorage.removeItem("cityList");
      localStorage.setItem("cityList", JSON.stringify(cityList));
      this.navCtrl.push(TabsPage, {tabSelect: "1"});
    }
    let nowCity = {"cityName": cityName, "cityId": cityId, "provName": provName}
    localStorage.setItem("nowCity", JSON.stringify(nowCity));
  }

  /*
  * 根据文本框内容查找城市
  * */
  searchCity(){
    if(this.cityName){
      let load = this.loadingCtrl.create({
        content:"稍等一下~~"
      });
      load.present();
      let params = new URLSearchParams();
      params.set("city", this.cityName);
      this.http.get("/search", params).then(res => {
        load.dismiss();
        let weather = res["HeWeather5"][0];
        if(weather.status == 'ok'){
          this.preCityName = weather.basic.city;
          this.preCityId = weather.basic.id;
          this.preProvName = weather.basic.prov;
          this.showFlag = true;
        }else if(weather.status == 'unknown city'){
          let toast = this.toastCtrl.create({
            message: "请输入正确的城市名称！",
            cssClass: "customeToast",
            duration: 1500,
            position: "top"
          });
          toast.present();
          this.showFlag = false;
        }
        this.cityNamePlace = this.cityName;
        this.cityName = '';
      }).catch(err => {
        load.dismiss();
        this.showFlag = false;
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
