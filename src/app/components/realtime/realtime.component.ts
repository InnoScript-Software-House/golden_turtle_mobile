import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ApiService } from 'src/app/shares/api.service';
import * as moment from 'moment';
import { Subscription, timer } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.scss'],
})
export class RealtimeComponent implements OnInit {

  luckyNumber: any;
  currentDate: Date = new Date();
  timerSubscription: Subscription;
  reachTime: boolean = false;
  btcRate: any;
  btcPoint: any;
  etcRate: any;
  etcPoint: any;
  isLoading: boolean = true;
  generateNumber: any = {
    luckyNumber: this.getRandomInt(0,99),
    btcRate: 0,
    btcPoint: 0,
    etcRate: 0,
    etcPoint: 0

  }

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

  // private remainTime (lasttime){
  //   const time = moment(new Date(lasttime).getTime() + 30*60000).valueOf() - moment().valueOf();
  //   if(time > 0 ){
  //     return time;
  //   }
  //   return 0;
  // }
  
  async ngOnInit() {
    this.luckyNumber = this.getRandomInt(0,99);

    const getBTC = await this.api.getRequest('prices/BTC-HKD/sell');
    const getETC = await this.api.getRequest('prices/ETC-HKD/sell');

    const today = moment().format('Y-MM-DD');

    setInterval(() => {
      this.generateNumber.luckyNumber = this.getRandomInt(0,99);

      this.generateNumber = {
        luckyNumber : this.getRandomInt(0, 100),
        btcRate :  parseInt(getBTC.data.amount) + Number(this.getRandomInt(0, 100)) + '.' + this.getRandomInt(0,9).charAt(0) + this.luckyNumber.charAt(1),
        etcRate :  parseInt(getETC.data.amount) + Number(this.getRandomInt(0, 100)) + '.' + this.getRandomInt(0,9).charAt(0) + this.luckyNumber.charAt(1)
      }
    }, 1000);

    // let getTime = this.currentDate.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toString();
    const todayNumber = (await this.dataService.getTodayNumber(today)).data;

    const format = 'hh:mm A'; 

    setInterval(() => {
      const currentTime = moment().format(format);
      const nextSchedules = todayNumber.filter(value => value.lucky_number !== null);
      const nextNumber = nextSchedules[nextSchedules.length - 1];
      const start_time = moment(nextNumber.schedule_time);

      let end_time;

      if(nextNumber.schedule_time === moment().format('Y-MM-DD') + ' 9:00 PM') {
        end_time = moment(nextNumber.schedule_time).add(630, 'minute');
      } else {
        end_time = moment(nextNumber.schedule_time).add(30, 'minute');
      }

      const isBetween = moment(currentTime , format).isBetween(start_time, end_time);

      console.log(isBetween);

      if(isBetween === false) {
        this.luckyNumber = this.generateNumber.luckyNumber;
        this.btcRate = this.generateNumber.btcRate;
        this.btcPoint = this.generateNumber.btcPoint;
        this.etcRate = this.generateNumber.etcRate;
        this.etcPoint = this.generateNumber.etcPoint;
      }

      if(isBetween) {
        this.luckyNumber = nextNumber.lucky_number;
        this.btcRate = nextNumber.btc;
        this.etcRate = nextNumber.etc;
      }

    }, 1000);


    // const format = 'hh:mm A'
    // const time = moment('1:00 PM' , format)
    // const before = moment('12:00 AM' , format)
    // const after = moment('2:00 PM' , format)
    // console.log(time)
    // console.log(before)
    // console.log(after)
   
    // if(time.isBetween(before , after) ) {
    //   console.log(true)
    // } else {
    //   console.log(false)
    // }

    // let startNumber: any = setInterval(() => {
    //   this.luckyNumber = this.getRandomInt(0, 99);
    //   this.btcRate = parseInt(getBTC.data.amount) + parseInt(this.getRandomInt(100, 999));
    //   this.btcPoint = Math.floor(Math.random() * (9 - 0) + 0) + this.luckyNumber.slice(0,1);
    //   this.etcRate = parseInt(getETC.data.amount) + parseInt(this.getRandomInt(10,99));
    //   this.etcPoint = Math.floor(Math.random() * (9 - 0) + 0)+this.luckyNumber.slice(1,2);
    // }, 6000);


    // this.timerSubscription = timer(0, 10000).pipe(
    //   map(() => {
    //     const currentTime = moment().format('h:mm A');

    //     if(todayNumber){
    //       const getLuckyNumber = todayNumber.filter((value: any) => value.lucky_number !== null && moment(new Date(value.schedule_time).getTime()).format('h:mm A') >= currentTime);
    //       getLuckyNumber.map((value: any, index: number) => {
            
    //         const luckyHour = moment(new Date(value.schedule_time).getTime()).format('h:mm A');
    //         const interval = moment(new Date(value.schedule_time).getTime() + 30*60000).format('h:mm A');

    //         if( ( currentTime >= luckyHour && currentTime <= interval ) && this.reachTime === false){
    //           clearInterval(startNumber);
    //           this.luckyNumber = value.lucky_number.toString();
    //           this.reachTime = true;
    //           this.btcRate = parseInt(getBTC.data.amount);
    //           this.btcPoint = Math.floor(Math.random() * (9 - 0) + 0)+this.luckyNumber.slice(0,1);
    //           this.etcRate = parseInt(getETC.data.amount);
    //           this.etcPoint = Math.floor(Math.random() * (9 - 0) + 0)+this.luckyNumber.slice(1,2);
    //           if( currentTime >= '9:00 PM'){

    //             setTimeout(() => {
    //               startNumber = setInterval(() => {
    //                 this.luckyNumber = this.getRandomInt(0, 99);
    //                 this.btcRate = parseInt(getBTC.data.amount) + parseInt(this.getRandomInt(10, 99));
    //                 this.btcPoint = Math.floor(Math.random() * (9 - 0) + 0)+this.luckyNumber.slice(0,1);
    //                 this.etcRate = parseInt(getETC.data.amount) + parseInt(this.getRandomInt(10,99));
    //                 this.etcPoint = Math.floor(Math.random() * (9 - 0) + 0)+this.luckyNumber.slice(1,2);
    //               },6000);
    //               this.reachTime = false;
    //             },this.remainTime(value.schedule_time + 600 * 60000));
    //             return;
    //           }
    //           setTimeout(() => {
    //             startNumber = setInterval(() => {
    //               this.luckyNumber = this.getRandomInt(0, 99);
    //               this.btcRate = parseInt(getBTC.data.amount) + parseInt(this.getRandomInt(10, 99));
    //               this.btcPoint = Math.floor(Math.random() * (9 - 0) + 0)+this.luckyNumber.slice(0,1);
    //               this.etcRate = parseInt(getETC.data.amount) + parseInt(this.getRandomInt(10,99));
    //               this.etcPoint = Math.floor(Math.random() * (9 - 0) + 0)+this.luckyNumber.slice(1,2);
    //             },6000);
    //             this.reachTime = false;
    //           }, this.remainTime(value.schedule_time));
    //           return;
    //         }
    //         else{
    //           return;
    //         }
    //       });
    //     }

    //     this.isLoading = false;
    //   })
    // ).subscribe();
  

    this.rates = {
      btc : getBTC.data ? getBTC.data : null,
      etc :  getETC.data? getETC.data : null
    }
  }

}
