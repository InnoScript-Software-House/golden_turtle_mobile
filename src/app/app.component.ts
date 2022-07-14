import { Component, ViewChild } from '@angular/core';
import { FormatService } from './services/format.service';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { GoogleAnalytics } from '@awesome-cordova-plugins/google-analytics/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;

  constructor(
    private formService: FormatService,
    private platform: Platform,
    private ga: GoogleAnalytics
  ) {

    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });

    this.formService.timeFormat.subscribe((response) => {
      if (response === null) {
        this.formService.changeTimeFormat('12-hours');
      }
    });

    this.ga.startTrackerWithId('UA-223933152-1')
      .then(() => {
        console.log('Google analytics is ready now');
        this.ga.trackView('test');
        // Tracker is ready
        // You can now track pages or set additional information such as AppVersion or UserId
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));
  }
}

