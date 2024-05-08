import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LeagueSelectComponent } from '../league-select/league-select.component';
import { ScheduleComponent } from '../schedule/schedule.component';
import { MatIconModule } from '@angular/material/icon';
import { ScheduleService } from '../../services/schedule.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProgressSpinnerDialogComponent } from '../../../../core/components/progress-spinner-dialog.component';
import { Subject, takeUntil } from 'rxjs';

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
export class ScheduleContainerComponent implements OnInit, OnDestroy {
  constructor(
    private scheduleService: ScheduleService,

    private dialog: MatDialog
  ) {}
  private readonly destroy$ = new Subject<void>();
  ngOnInit(): void {
    this.scheduleService
      .getLeagueObs()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getSchedule();
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getSchedule() {
    const dialogRef: MatDialogRef<ProgressSpinnerDialogComponent> =
      this.dialog.open(ProgressSpinnerDialogComponent, {
        panelClass: 'transparent',
        disableClose: true,
      });
    const subscription = this.scheduleService.getLeagueSchedule().subscribe(
      (schedules) => {
        subscription.unsubscribe();
        //handle response
        dialogRef.close();
        this.scheduleService.setGamesObs(schedules);
      },
      () => {
        subscription.unsubscribe();
        //handle error
        dialogRef.close();
      }
    );
  }
}
