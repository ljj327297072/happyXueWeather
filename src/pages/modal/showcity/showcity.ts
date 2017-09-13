/**
 * Created by ljj32 on 2017/9/6.
 */
import { Component } from '@angular/core';
import { NavController, ToastController, ViewController, ModalController } from 'ionic-angular';
import { HttpService } from "../../../commons/http.service";
import { URLSearchParams} from '@angular/http';

import {AddCity} from "../addcity/addcity";
import {HomePage} from "../../home/home";
import {TabsPage} from "../../tabs/tabs";

@Component({
  selector: "show-city",
  templateUrl: "./showcity.html",
  providers: [HttpService]
})

export class ShowCity {
  cityList: any;
  showFlag: boolean = true;
  constructor(public navCtrl: NavController,
              public http: HttpService,
              public toastCtrl: ToastController,
              public modalCtrl: ModalController,
              public viewCtrl: ViewController
  ){
    this.showCity();
  }
  addCity(){
    let modal = this.modalCtrl.create(AddCity);
    modal.present();
  }
  deleteCity(cityId){
      let cityList = this.cityList;
      if(cityList.length <= 1){
        let toast = this.toastCtrl.create({
          message: "至少保留一个城市！",
          cssClass: "customeToast",
          duration: 1500,
          position: "top"
        });
        toast.present();
      }else {
        for(let i = 0;i < cityList.length;i++){
          if(cityList[i].cityId == cityId){
            cityList.splice(i,1);
            break;
          }
        }
        localStorage.removeItem("cityList");
        localStorage.setItem("cityList",JSON.stringify(cityList));
        this.cityList = cityList;
      }
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }
  goToHomePage(cityName,provName,cityId){
    let nowCity = {"cityName": cityName, "cityId": cityId, "provName": provName}
    localStorage.setItem("nowCity", JSON.stringify(nowCity));
    this.navCtrl.push(TabsPage, {tabSelect: "1"});
  }
  showCity(){
    if(localStorage.getItem("cityList")){
      this.cityList = JSON.parse(localStorage.getItem("cityList"));
      for(let i = 0;i < this.cityList.length;i++){
        this.cityList[i].weather_code = '999';
        this.cityList[i].temperature = "N/A";
        let params = new URLSearchParams();
        params.set("city", this.cityList[i].cityId);
        this.http.get("/now", params).then(res => {
          let weather = res["HeWeather5"][0];
          if(weather.status == 'ok'){
            this.cityList[i].temperature = weather.now.tmp;
            this.cityList[i].weather_code = weather.now.cond.code;
          }
        }).catch(err=>{

        });
      }
      this.showFlag = false;
    } else{
      this.showFlag = true;
    }
  }
}
