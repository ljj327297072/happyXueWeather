import { Component } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import { HttpService } from "../../commons/http.service";
import { URLSearchParams} from '@angular/http';
import { AboutPage } from "../about/about";
import { ShowCity } from "../modal/showcity/showcity"
import {AddCity} from "../modal/addcity/addcity";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HttpService]
})
export class HomePage {
  city:string = "青岛";
  constructor(public navCtrl: NavController,
              public http: HttpService,
              public toastCtrl: ToastController,
              public modalCtrl: ModalController
  ) {
    // this.searchWeather(this.city);
  }
  /*
  * 根据手机定位的经纬度查询城市名称
  * */
  getCityName(){

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
    console.log(111111111);
    let modal = this.modalCtrl.create(ShowCity);
    modal.present();
  }
  /*
  * 根据城市名称查询天气
  * */
  searchWeather(city){
    let params = new URLSearchParams();
    params.set("city", city);
    this.http.get("/weather", params).then(res => {
      let heWeather = res["HeWeather5"][0];
      if(heWeather.status == "ok"){
        console.log(heWeather);
      }else if(heWeather.status == "unknown city"){
        let toast = this.toastCtrl.create({
          message: "请输入正确的城市名称",
          cssClass: "customeToast",
          duration: 1500,
          position: "top"
        });
        toast.present();
      }else if(heWeather.status == "params invalid"){
        let toast = this.toastCtrl.create({
          message: "参数错误，请联系作者",
          cssClass: "customeToast",
          duration: 1500,
          position: "top"
        });
        toast.present();
      }else if(heWeather.status == "anr"){
        let toast = this.toastCtrl.create({
          message: "请求超时",
          cssClass: "customeToast",
          duration: 1500,
          position: "top"
        });
        toast.present();
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
