import { Component } from '@angular/core';
import { FormatService } from './services/format.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent { 
  
  constructor(
    private formService: FormatService
  ) {
    this.formService.timeFormat.subscribe((response) => {
      if(response === null) {
        this.formService.changeTimeFormat('12-hours');
      }
    })
  }
}
