import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { RealtimeComponent } from './realtime/realtime.component';
import { IonicModule } from '@ionic/angular';
import { ChangeDateFormatComponent } from './change-date-format/change-date-format.component';



@NgModule({
  declarations: [ScheduleListComponent, RealtimeComponent, ChangeDateFormatComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    ScheduleListComponent, RealtimeComponent, ChangeDateFormatComponent
  ]
})
export class ComponentsModule { }
