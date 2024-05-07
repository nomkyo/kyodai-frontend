import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LeagueSelectComponent } from '../league-select/league-select.component';
import { ScheduleComponent } from '../schedule/schedule.component';
import { MatIconModule } from '@angular/material/icon';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-schedule-container',
  templateUrl: './schedule-container.component.html',
  styleUrl: './schedule-container.component.css',
  standalone: true,
  imports: [
    LeagueSelectComponent,
    ScheduleComponent,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ScheduleContainerComponent {
  constructor(private scheduleService: ScheduleService) {}

  getSchedule() {
    this.scheduleService.getLeagueSchedule().subscribe((schedules) => {
      this.scheduleService.setGamesObs(schedules);
    });
  }
}
