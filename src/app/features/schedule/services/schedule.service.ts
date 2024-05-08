import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { League } from '../../../core/models/league.model';
import { Game } from '../../../core/models/game.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}
  private readonly leagueUrl = 'leagues';
  private readonly scheduleUrl = 'schedule';
  private selectedLeague: League;
  private gamesObs$: BehaviorSubject<Game[]> = new BehaviorSubject<Game[]>([]);
  private leagueObs$: Subject<League> = new Subject<League>();
  getLeagueObs(): Observable<League> {
    return this.leagueObs$.asObservable();
  }

  setLeagueObs(league: League) {
    this.leagueObs$.next(league);
  }

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
