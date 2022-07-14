import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, Platform } from '@ionic/angular';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
// import { InAppReview } from '@awesome-cordova-plugins/in-app-review/ngx';
// import { AppRate } from '@awesome-cordova-plugins/app-rate/ngx';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  
  appInfo: any =  {
    name: "Turtle Live",
    package: 'Demo',
    v_code: "demo",
    v_number: "demo"
  }
  about_us: string;

  constructor(
    private appVersion: AppVersion,
    private platform: Platform,
    // private inAppReview: InAppReview,
    // private appRate: AppRate,
    private dataService: DataService
  ) { 

    this.platform.ready().then((result: any) => {
      if(result === 'dom') {
        this.appInfo = {
          name: "Turtle Live",
          package: result,
          v_code: "demo_1.0.0",
          v_number: "1.0.0"
        }
      } else {
        this.appVersion.getAppName().then((result) => {
        this.appInfo.name = result;
        });

        this.appVersion.getPackageName().then((result) => {
          this.appInfo.package = result;
        });

        this.appVersion.getVersionCode().then((result) => {
          this.appInfo.v_code = result;
        });

        this.appVersion.getVersionNumber().then((result) => {
          this.appInfo.v_number = result;
        });
      }
    })
  }

  // private loadingData = async () => {
  //   const response = await this.dataService.getAboutUs();

  //   this.about_us = response.data.about_us;
  // }

  // openRate() {

  //   this.appRate.setPreferences({
  //     usesUntilPrompt: 3,
  //     storeAppURL: {
  //       android: 'market://details?id=&lt;package_name>'
  //     }
  //   });

  //   this.appRate.promptForRating(true);
  // }

  // appDownload = () => {
  //   this.appRate.setPreferences({
  //     storeAppURL: {
  //       android: 'market://details?id=&lt;package_name>'
  //     }
  //   });
  //   this.appRate.navigateToAppStore();
  // }

  openDownload = () => {

  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  ngOnInit() { 
    // this.loadingData();
  }

}
