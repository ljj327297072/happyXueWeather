import { Component } from '@angular/core';
import { NavController, ToastController, ModalController, NavParams } from 'ionic-angular';
import { HttpService } from "../../commons/http.service2";
import { URLSearchParams } from '@angular/http';
import { AboutPage } from "../about/about";
import { ShowCity } from "../modal/showcity/showcity";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HttpService]
})
export class HomePage {
  cityWeather: any;
  cityName: string = "哈哈哈";
  cityId: string;
  constructor(public navCtrl: NavController,
              public http: HttpService,
              public toastCtrl: ToastController,
              public modalCtrl: ModalController,
              public navParams: NavParams
  ) {
    this.searchWeather("WX4FBXXFKE4F");
  }
  /*
  * 根据手机定位的经纬度查询城市ID
  * */
  getCityLocation(){

  }
  /*
  * 去详情页
  * */
  goToAbout(){
    this.navCtrl.push(AboutPage);
  }
  /*
   * 打开或关闭menu
   * */
  toggleMenu(){
    let modal = this.modalCtrl.create(ShowCity);
    modal.onDidDismiss(data => {
      if(data){
        this.searchWeather(data.selectCity.cityId);
        this.cityName = data.selectCity.cityName;
      }
    });
    modal.present();
  }
  /*
  * 根据城市ID查询天气
  * */
  searchWeather(city){
    let params = new URLSearchParams();
    params.set("cityid", city);
    this.http.get("/now", params).then(res => {
      if(res['status']== "OK"){
        let weather = res['weather'][0];
        console.log(weather);
        this.cityWeather = weather;
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
