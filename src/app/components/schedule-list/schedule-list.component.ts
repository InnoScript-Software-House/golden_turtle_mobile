import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { TODAY_NUMBER } from 'src/app/services/data.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss'],
})
export class ScheduleListComponent implements OnInit {

  @Input() data: Array<TODAY_NUMBER> = [];
  @Input() timeFormat: string = localStorage.getItem('time-format');
  @Input() scheduleList: Array<TODAY_NUMBER> = [];
  @Input() targeDate: string;

  constructor() {}

  ngOnInit() {
    this.targeDate = moment().format('Y-DD-MM');
  }
}
