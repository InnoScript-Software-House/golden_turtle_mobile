import { Component, OnInit } from '@angular/core';
import { FormatService } from 'src/app/services/format.service';

@Component({
  selector: 'app-change-date-format',
  templateUrl: './change-date-format.component.html',
  styleUrls: ['./change-date-format.component.scss'],
})
export class ChangeDateFormatComponent implements OnInit {

  timeFormat: string;

  constructor(
    private formatService: FormatService
  ) { 
    this.formatService.timeFormat.subscribe((response) => {
      this.timeFormat = response;
    })
  }

  ngOnInit() {
  }

  changeDateFormat($event: any) {
    this.formatService.changeTimeFormat($event.target.value);
    this.timeFormat = $event.target.value;
  }
}
