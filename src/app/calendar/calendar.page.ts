import { Component, OnInit,  ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { FormatService } from '../services/format.service';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})

export class CalendarPage implements OnInit {
  timeFormat: string = localStorage.getItem('time-format') === '12-hours' ? 'hh:mm a' : 'H:mm';
  dateTimeformat: string = 'MMM d, y, hh:mm a';
  scheduleList: Array<any> = [];
  chooseDate: string;

  @ViewChild(IonModal) modal: IonModal;

  constructor(
    private formatService: FormatService,
    private dataService: DataService
  ) { 
    this.formatService.timeFormat.subscribe((result) => {
      this.timeFormat = result  === '12-hours' ? 'hh:mm a' : 'H:mm';
      this.dateTimeformat = result  === '12-hours' ? 'MMM d, y, hh:mm a' : 'MMM d, y, H:mm';
    })
  }

  private getHistroy = async () => {
    const getSchedule = await this.dataService.historyRecord(this.chooseDate);
    const schedule_dates = [];

    getSchedule.map((value: any) => {
      value.schedule_time = value.schedule_date + ' ' + value.schedule_time;
      schedule_dates.push(value.schedule_date);
    });

    let uniqueSchedules = [...new Set(schedule_dates)];

    uniqueSchedules.map((schedule: any) => {
      const filterSchedules = getSchedule.filter((filtered: any) => {
        if(filtered.schedule_date === schedule) {
          return filtered;
        }
      })

      this.scheduleList.push(filterSchedules);
    });
  }

  private loadingData = async () => {
    this.chooseDate = moment().format('Y-DD-MM');
    this.getHistroy();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  search = async ($event: any) => {
    this.chooseDate = moment($event.target.value).format('Y-DD-MM');
    this.scheduleList = [];
    this.getHistroy();
  }

  ngOnInit() {
    this.loadingData();
  }
}
