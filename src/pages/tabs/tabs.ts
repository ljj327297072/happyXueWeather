/**
 * Created by ljj32 on 2017/8/30.
 */
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';

@Component({
  selector: "tabs",
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;

  constructor() {

  }
}

