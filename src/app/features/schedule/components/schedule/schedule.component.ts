import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { Game } from '../../../../core/models/game.model';
import { MatTableModule } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css',
  standalone: true,
  imports: [MatTableModule],
})
export class ScheduleComponent implements OnInit, OnDestroy {
  constructor(private scheduleService: ScheduleService) {}
  private readonly destroy$ = new Subject<void>();
  columns = [
    {
      columnDef: 'time',
      cell: (element: Game) =>
        `${new Date(element.startTime).toLocaleString()}`,
    },
    {
      columnDef: 'matchup',
      cell: (element: Game) => `${element.awayTeam} @ ${element.homeTeam}`,
    },
  ];
  displayedColumns = this.columns.map((c) => c.columnDef);
  schedules: Game[];

  ngOnInit(): void {
    this.scheduleService
      .getGamesObs()
      .pipe(takeUntil(this.destroy$))
      .subscribe((schedules) => {
        this.schedules = schedules;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
