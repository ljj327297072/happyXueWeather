/**
 * Created by ljj32 on 2017/9/6.
 */
import { Component } from '@angular/core';
import { NavController, ToastController, ViewController, ModalController } from 'ionic-angular';
import { HttpService } from "../../../commons/http.service";
import { URLSearchParams} from '@angular/http';

import {AddCity} from "../addcity/addcity";

@Component({
  selector: "show-city",
  templateUrl: "./showcity.html",
  providers: [HttpService]
})

export class ShowCity {
  constructor(public navCtrl: NavController,
              public http: HttpService,
              public toastCtrl: ToastController,
              public modalCtrl: ModalController,
              public viewCtrl: ViewController
  ){
  }
  addCity(){
    let modal = this.modalCtrl.create(AddCity);
    modal.present();
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }
}
