import { Component, OnInit } from '@angular/core';
import { DataService, TODAY_NUMBER } from '../services/data.service';
import { FormatService } from '../services/format.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  timeFormat: string = localStorage.getItem('time-format') === '12-hours' ? 'hh:mm a' : 'H:mm';
  dateTimeformat: string = 'MMM d, y, hh:mm a';
  scheduleList: Array<TODAY_NUMBER> = [];
  isLoading: boolean = true;
  
  constructor(
    private formatService: FormatService,
    private dataService: DataService
  ) { 
    this.formatService.timeFormat.subscribe((result) => {
      this.timeFormat = result  === '12-hours' ? 'hh:mm a' : 'H:mm';
      this.dateTimeformat = result  === '12-hours' ? 'MMM d, y, hh:mm a' : 'MMM d, y, H:mm';
    })
  }

  private loadingData = async ($event?: any) => {
    const today = moment().format('Y-MM-DD');
    const response = await this.dataService.getTodayNumber(today);
    this.scheduleList = response.data;
    this.isLoading = response.isLoading;

    if($event) {
      $event.target.complete();
    }
  }

  doRefresh($event: any) {
    this.isLoading = true;
    this.loadingData($event);
  }

  ngOnInit() {
    this.loadingData();
  }

}
