import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

/**
 * Import modules
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

/**
 * Import provider for service
 */
 import { FormatService } from './services/format.service';
 import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
 import { InAppReview } from '@awesome-cordova-plugins/in-app-review/ngx';
 import { AppRate } from '@awesome-cordova-plugins/app-rate/ngx';
 import { GoogleAnalytics } from '@awesome-cordova-plugins/google-analytics/ngx';
/** 
 * Import component
 */
import { AppComponent } from './app.component';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FormatService,
    AppVersion,
    GoogleAnalytics,
    InAppReview,
    AppRate
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
