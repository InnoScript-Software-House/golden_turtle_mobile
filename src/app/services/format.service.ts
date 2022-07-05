import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  private timeFormatSubject: BehaviorSubject<any>;
  public timeFormat: Observable<any>;

  constructor(
  ) { 
    const getTimeFormat = JSON.parse(localStorage.getItem('time-format'));
    this.timeFormatSubject = new BehaviorSubject(getTimeFormat);
    this.timeFormat = this.timeFormatSubject.asObservable();
  }

  public changeTimeFormat = (value: string) => {
    localStorage.setItem('time-format',JSON.stringify(value));
    this.timeFormatSubject.next(value);
    return value;
  }
}
