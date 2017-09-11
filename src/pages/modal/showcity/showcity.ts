/**
 * Created by ljj32 on 2017/9/6.
 */
import { Component } from '@angular/core';
import { NavController, ToastController, ViewController, ModalController } from 'ionic-angular';
import { HttpService } from "../../../commons/http.service2";
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
      for(let i = 0;i < cityList.length;i++){
        if(cityList[i].cityId == cityId){
          cityList.splice(i,1);
          break;
        }
      }
      if(cityList.length < 1){
        localStorage.clear();
        this.showFlag = true;
      }else{
        localStorage.removeItem("cityList");
        localStorage.setItem("cityList",JSON.stringify(cityList));
        this.cityList = cityList;
      }
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }
  goToHomePage(cityName,cityId){
    this.viewCtrl.dismiss({"selectCity": {"cityName": cityName, "cityId": cityId}});
  }
  showCity(){
    if(localStorage.getItem("cityList")){
      this.cityList = JSON.parse(localStorage.getItem("cityList"));
      for(let i = 0;i < this.cityList.length;i++){
        let params = new URLSearchParams();
        params.set("cityid", this.cityList[i].cityId);
        this.http.get("/now", params).then(res => {
          if(res['status']== "OK"){
            let weather = res['weather'][0];
            this.cityList[i].temperature = weather.now.temperature;
            this.cityList[i].weather_code = weather.now.code;
          }
        });
      }
      this.showFlag = false;
    } else{
      this.showFlag = true;
    }
  }
}
