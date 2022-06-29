import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { RealtimeComponent } from './realtime/realtime.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ScheduleListComponent, RealtimeComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    ScheduleListComponent, RealtimeComponent
  ]
})
export class ComponentsModule { }
