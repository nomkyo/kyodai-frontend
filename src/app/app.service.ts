import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  constructor(private http: HttpClient) {}
  configUrl = 'http://localhost:3000/';

  getHello() {
    return this.http.get<object>(this.configUrl);
  }
}
