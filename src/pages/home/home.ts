import { Component } from '@angular/core';
import { NavController, ToastController, ModalController, NavParams, LoadingController } from 'ionic-angular';
import { HttpService } from "../../commons/http.service";
import { URLSearchParams } from '@angular/http';
import { AboutPage } from "../about/about";
import { ShowCity } from "../modal/showcity/showcity";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HttpService]
})
export class HomePage {
  cityWeather: any ={
    basic:{
      update:{
        loc:""
      }
    },
    now:{
      tmp:"",
      cond:{
        txt:""
      },
      wind:{
        dir:"",
        sc:""
      },
      hum:"",
      pres:""
    },
    aqi:{
      city:{
        qlty:"",
        pm25:""
      }
    },
    daily_forecast: [],
  };
  nowCity: any = {
    cityName: "请添加城市",
    provName: null,
    cityId: null
  };
  constructor(public navCtrl: NavController,
              public http: HttpService,
              public toastCtrl: ToastController,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController
  ) {
    if(localStorage.getItem("nowCity")){
      let nowCity = JSON.parse(localStorage.getItem("nowCity"));
      this.nowCity = nowCity;
      this.searchWeather(nowCity.cityId);
    }
  }
  /*
  * 根据手机定位的经纬度查询城市ID
  * */
  getCityLocation(){

  }
  /*
  * 下拉刷新
  * */
  doRefresh(refresher) {
    let params = new URLSearchParams();
    params.set("city", this.nowCity.cityId);
    this.http.get("/weather", params).then(res => {
      refresher.complete();
      let weather = res["HeWeather5"][0];
      if(weather['status']== "ok"){
        console.log(weather);
        this.cityWeather = weather;

      }
    }).catch(err => {
      refresher.complete();
      let toast = this.toastCtrl.create({
        message: "请求失败",
        cssClass: "customeToast",
        duration: 1500,
        position: "top"
      });
    })
  }

  /*
   * 打开或关闭menu
   * */
  toggleMenu(){
    let modal = this.modalCtrl.create(ShowCity);
    modal.present();
  }
  /*
  * 根据城市ID查询天气
  * */
  searchWeather(city){
    let params = new URLSearchParams();
    params.set("city", city);
    let load = this.loadingCtrl.create({
      content:"稍等一下~~"
    });
    load.present();
    this.http.get("/weather", params).then(res => {
      load.dismiss();
      let weather = res["HeWeather5"][0];
      if(weather['status']== "ok"){
        console.log(weather);
        this.cityWeather = weather;
      }
    }).catch(err => {
        load.dismiss();
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
