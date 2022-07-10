import { Component, OnInit,  ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { DataService, TODAY_NUMBER } from '../services/data.service';
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
  scheduleList: Array<TODAY_NUMBER> = [];
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

  private loadingData = async () => {
    const today = moment().format('Y-DD-MM');
    this.scheduleList = await this.dataService.getTodayNumber(today);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  search = async ($vent: any) => {
    this.chooseDate = moment($vent.target.value).format('Y-DD-MM');
    this.scheduleList = await this.dataService.getTodayNumber(this.chooseDate);
  }

  ngOnInit() {
    this.loadingData();
  }
}
