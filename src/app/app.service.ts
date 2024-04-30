import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  constructor(private http: HttpClient) {}
  getHello() {
    debugger;
    return this.http.get<object>(environment.apiBaseUrl);
  }
}
