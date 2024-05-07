import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ScheduleService } from '../../services/schedule.service';
import { League } from '../../../../core/models/league.model';

@Component({
  selector: 'app-league-select',
  templateUrl: './league-select.component.html',
  styleUrl: './league-select.component.css',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule],
})
export class LeagueSelectComponent implements OnInit {
  constructor(private scheduleService: ScheduleService) {}

  selectedLeague: League;
  leagues: League[];
  ngOnInit(): void {
    this.scheduleService.getLeagues().subscribe((leagues) => {
      this.leagues = leagues;
    });
  }
  setLeague() {
    this.scheduleService.setLeague(this.selectedLeague);
  }
}
