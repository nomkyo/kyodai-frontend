import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-progress-spinner-dialog',
  templateUrl: './progress-spinner-dialog.component.html',
  styleUrls: ['./progress-spinner-dialog.component.css'],
  imports: [MatProgressSpinnerModule],
  standalone: true,
})
export class ProgressSpinnerDialogComponent {
  constructor() {}
}
