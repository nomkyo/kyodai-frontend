import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { apiInterceptor } from './core/interceptors/api.interceptor';
import { ScheduleContainerComponent } from './features/schedule/components/schedule-container/schedule-container.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslocoRootModule,
    ScheduleContainerComponent,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([apiInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
