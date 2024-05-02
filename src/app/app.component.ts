import { Component, OnInit } from '@angular/core';
import { ConfigService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-starter';
  hello: string;
  constructor(private configService: ConfigService) {}

  ngOnInit() {
    this.configService.getHello().subscribe((data) => {
      this.hello = data['msg'];
    });
  }
}
