import { Component, Input, OnInit } from '@angular/core';
import { FormatService } from 'src/app/services/format.service';
import { ApiService } from 'src/app/shares/api.service';

@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.scss'],
})
export class RealtimeComponent implements OnInit {

  luckyNumber: string;
  currentDate: Date = new Date();

  @Input() dateTime: string;

  breakTime: Array<string> = [
    "11:00 AM", "1:30 PM", "4:00 PM", "6:30 PM", "9:00 PM", "12:22 AM"
  ];

  // breakTime: Array<number> = [1,2,3,4];

  rates: any = {
    btc: { amount: 0, base: "BTC", currency: "MMK" },
    etc: { amount: 0, base: "ETC", currency: "MMK" }
  }

  constructor(
    private api: ApiService
  ) { 
    console.log(this.dateTime);
  }

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
    const getTime = this.currentDate.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toString();
    
    let startNumber: any = setInterval(() => {
      this.luckyNumber = this.getRandomInt(0, 99);
    }, 6000);

    if(this.breakTime.includes(getTime)) {
      clearInterval(startNumber);
      setTimeout(() => {
        startNumber = setInterval(() => {
          this.luckyNumber = this.getRandomInt(0,99);
        },6000);
      }, 10000);
    }

    const getBTC = await this.api.getRequest('prices/BTC-MMK/sell', 'api').toPromise();
    const getETC = await this.api.getRequest('prices/ETC-MMK/sell', 'api').toPromise();

    this.rates = {
      btc : getBTC.data ? getBTC.data : null,
      etc :  getETC.data? getETC.data : null
    }
  }

}
