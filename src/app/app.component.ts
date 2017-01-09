import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Principal } from '../pages/principal/principal';
import { Detalhes } from '../pages/detalhes/detalhes';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Principal;

  pages: Array<{ title: string, component: any , icon:any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Principal', component: Principal, icon: "home" },  
      { title: 'Alterar dados cadastrais', component: Principal, icon: "hammer" },
      { title: 'Favoritos', component: Principal, icon: "star" },
      { title: 'Logout', component: Principal, icon: "log-out" }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
