import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormatService } from 'src/app/services/format.service';
import { ApiService } from 'src/app/shares/api.service';
import * as moment from 'moment';
import { Subscription, timer } from 'rxjs';
import { map } from 'rxjs/operators'

const data = {
    btc: "343543",
    etc: "200450",
    lucky_number: "51",
    schedule_date: "2022-07-10",
    schedule_time: "2022-07-10 9:00 PM"
}

@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.scss'],
})
export class RealtimeComponent implements OnInit {

  luckyNumber: string;
  currentDate: Date = new Date();
  timerSubscription: Subscription;
  reachTime: boolean = false;

  @Input() dateTime: string;

  breakTime: Array<any> = [
    { start_time: '11:00 AM', end_time: '11:30 AM' },
    { start_time: '1:30 PM', end_time: '2:00 PM' },
    { start_time: '4:00 PM', end_time: '4:30 PM' },
    { start_time: '6:00 PM', end_time: '6:30 PM' },
    { start_time: '9:00 PM', end_time: '9:30 PM' },
  ];
  
  rates: any = {
    btc: { amount: 0, base: "BTC", currency: "MMK" },
    etc: { amount: 0, base: "ETC", currency: "MMK" }
  }

  constructor(
    private api: ApiService,
    private dataService: DataService
  ) { }

  private getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    
    const intNumber: number = Math.floor(Math.random() * (max - min) + min);

    if(intNumber < 10) {
      const oneNumber = Math.floor(Math.random() * (9-0) + 0);
      return intNumber.toString() + oneNumber.toString();
    } else {
      return intNumber.toString();
    }
  }
  
  async ngOnInit() {
    this.luckyNumber = this.getRandomInt(0,99);
    const today = moment().format('Y-MM-DD');
    let getTime = this.currentDate.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toString();
    const todayNumber = await this.dataService.getTodayNumber(today);

    let startNumber: any = setInterval(() => {
      this.luckyNumber = this.getRandomInt(0, 99);
    }, 6000);

    this.timerSubscription = timer(0, 6000).pipe(
      map(() => {
        const currentTime = moment().format('h:mm A');
        if(todayNumber){
          const getLuckyNumber = todayNumber.filter((value) => value.lucky_number !== null);

          getLuckyNumber.map((value, index) => {
            
            const luckyHour = moment(new Date(value.schedule_time).getTime()).format('h:mm A');
            const interval = moment(new Date(value.schedule_time).getTime() + 30*60000).format('h:mm A');

            if( ( currentTime >= luckyHour && currentTime <= interval ) && this.reachTime === false){
              clearInterval(startNumber);
              this.reachTime = true;
              this.luckyNumber = value.lucky_number.toString();
              setTimeout(() => {
                startNumber = setInterval(() => {
                  this.luckyNumber = this.getRandomInt(0,99);
                },6000);
                this.reachTime = false;
              }, 1800000);
              return;
            }
            else{
              return;
            }
          });
        }
      })
    ).subscribe();


    const getBTC = await this.api.getRequest('prices/BTC-MMK/sell');
    const getETC = await this.api.getRequest('prices/ETC-MMK/sell');

    this.rates = {
      btc : getBTC.data ? getBTC.data : null,
      etc :  getETC.data? getETC.data : null
    }
  }

}
