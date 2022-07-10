import { Injectable } from '@angular/core';

/**
 * Import services, providers and lib
 */
import { Http } from '@capacitor-community/http';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

interface HTTP_OPTIONS {
  url: string;
  headers?: any;
  params?: any;
}

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

@Injectable({ providedIn: 'root'})
export class DataService {

  constructor() { }

  public getTodayNumber = async (date: string) => {
    let getTodayNumber: Array<TODAY_NUMBER> = [];

    const defaultNumber: Array<TODAY_NUMBER> = [
      { schedule_time: '11:00 AM', btc: 0, etc: 0, lucky_number: null, schedule_date: moment(date, 'Y-DD-MM').format('Y-MM-DD') },
      { schedule_time: '1:30 PM', btc: 0, etc: 0, lucky_number: null, schedule_date: moment(date, 'Y-DD-MM').format('Y-MM-DD') },
      { schedule_time: '4:00 PM', btc: 0, etc: 0, lucky_number: null, schedule_date: moment(date, 'Y-DD-MM').format('Y-MM-DD') },
      { schedule_time: '6:30 PM', btc: 0, etc: 0, lucky_number: null, schedule_date: moment(date, 'Y-DD-MM').format('Y-MM-DD') },
      { schedule_time: '9:00 PM', btc: 0, etc: 0, lucky_number: null, schedule_date: moment(date, 'Y-DD-MM').format('Y-MM-DD') }
    ];

    const options = {
      url: `${environment.app_api}/lucky-number?today=${date}`
    };

    const response = await Http.get(options);

    if(response && response.status === 200) {
      getTodayNumber = response.data.data;
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

  public historyRecord = async (month: string) => {
    const options = {
      url: `${environment.app_api}/lucky-number?month=${month}`
    };

    const response = await Http.get(options);

    if(response && response.status === 200) {
      return response.data.data;
    }
  }
}
