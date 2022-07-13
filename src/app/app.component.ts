import { Component, ViewChild } from '@angular/core';
import { FormatService } from './services/format.service';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent { 
  
  @ViewChild(IonRouterOutlet, { static : true }) routerOutlet: IonRouterOutlet;

  constructor(
    private formService: FormatService,
    private platform: Platform
  ) {

    this.platform.backButton.subscribeWithPriority(-1, () => {
      if(!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });

    this.formService.timeFormat.subscribe((response) => {
      if(response === null) {
        this.formService.changeTimeFormat('12-hours');
      }
    })
  }
}
