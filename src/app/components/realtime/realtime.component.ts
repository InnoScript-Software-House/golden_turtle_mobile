import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.scss'],
})
export class RealtimeComponent implements OnInit {

  luckyNumber: string;

  constructor() { }

  private getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);

    const intNumber: number = Math.floor(Math.random() * (max - min) + min);

    if(intNumber < 10) {
      const oneNumber = Math.floor(Math.random() * (9-0) + 0);
      return intNumber.toString() +oneNumber.toString();
    } else {
      return intNumber.toString();
    }
  }
  ngOnInit() {
    this.luckyNumber = this.getRandomInt(0,99);

    setInterval(() => {
      this.luckyNumber = this.getRandomInt(0, 99);
    }, 300);
    
  }

}
