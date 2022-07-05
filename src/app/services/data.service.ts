import { Injectable } from '@angular/core';
import { ApiService } from '../shares/api.service';
import * as moment from 'moment';

export interface TODAY_NUMBER {
  id?: string | number;
  schedule_time : string;
  btc: string | number;
  etc: string | number;
  schedule_date?: string;
  lucky_number : string | number | null;
  created_at? : string;
  updated_at? : string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private apiService: ApiService
  ) { }

  public getTodayNumber = async (date: string) => {
    let getTodayNumber: Array<TODAY_NUMBER> = [];
    const defaultNumber: Array<TODAY_NUMBER> = [
      { schedule_time: '11:00 AM', btc: 0, etc: 0, lucky_number: null, schedule_date: moment(date, 'Y-DD-MM').format('Y-MM-DD') },
      { schedule_time: '1:30 PM', btc: 0, etc: 0, lucky_number: null, schedule_date: moment(date, 'Y-DD-MM').format('Y-MM-DD') },
      { schedule_time: '4:00 PM', btc: 0, etc: 0, lucky_number: null, schedule_date: moment(date, 'Y-DD-MM').format('Y-MM-DD') },
      { schedule_time: '6:00 PM', btc: 0, etc: 0, lucky_number: null, schedule_date: moment(date, 'Y-DD-MM').format('Y-MM-DD') },
      { schedule_time: '9:00 PM', btc: 0, etc: 0, lucky_number: null, schedule_date: moment(date, 'Y-DD-MM').format('Y-MM-DD') }
    ];

    const response = await this.apiService.getRequest(`lucky-number?today=${date}`).toPromise();

    if(response && response.status_code === 200) {
      getTodayNumber = response.data;
    }

    getTodayNumber.map((value: TODAY_NUMBER) => {
      defaultNumber.map((data) => {
        if(data.schedule_time === value.schedule_time) {
          data.btc = value.btc;
          data.etc = value.etc;
          data.lucky_number = value.lucky_number;
        }

        data.schedule_date = value.schedule_date;
        return data;
      });
    });

    const result: Array<TODAY_NUMBER> = defaultNumber.map((value: TODAY_NUMBER) => {
      value.schedule_time = value.schedule_date + ' ' + value.schedule_time;
      return value;
    });
    
    return result;
  }
}
