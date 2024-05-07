import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { League } from './league.model';
import { Game } from './game.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}
  private readonly leagueUrl = 'leagues';
  private readonly scheduleUrl = 'schedule';
  private selectedLeague: League;
  private gamesObs$: BehaviorSubject<Game[]> = new BehaviorSubject<Game[]>([]);

  getGamesObs(): Observable<Game[]> {
    return this.gamesObs$.asObservable();
  }

  setGamesObs(schedules: Game[]) {
    this.gamesObs$.next(schedules);
  }
  getLeagues(): Observable<League[]> {
    return this.http.get<League[]>(this.leagueUrl);
  }

  setLeague(league: League) {
    this.selectedLeague = league;
  }

  getLeagueSchedule(): Observable<Game[]> {
    return this.http.get<Game[]>(this.scheduleUrl, {
      params: {
        league: this.selectedLeague.key,
      },
    });
  }
}
