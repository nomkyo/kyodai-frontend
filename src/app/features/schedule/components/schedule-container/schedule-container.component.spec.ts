import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ScheduleContainerComponent } from './schedule-container.component';
import { Spectator, byTestId, createComponentFactory } from '@ngneat/spectator';
import { League } from '../../../../core/models/league.model';
import { faker } from '@faker-js/faker';
import { By } from '@angular/platform-browser';
import { MatOption, MatSelect } from '@angular/material/select';
import { Game } from '../../../../core/models/game.model';

describe('ScheduleContainer', () => {
  let spectator: Spectator<ScheduleContainerComponent>;
  let controller: HttpTestingController;
  const expectedLeagues: League[] = [
    {
      key: 'mlb_baseball',
      group: 'Baseball',
      title: 'MLB',
      description: 'MLB Baseball',
      active: true,
    },
    {
      key: 'nba_basketball',
      group: 'Basketball',
      title: 'NBA',
      description: 'NBA Basketball',
      active: true,
    },
  ];
  const expectedGames: Game[] = [
    {
      id: faker.string.hexadecimal(),
      homeTeam: faker.location.city(),
      awayTeam: faker.location.city(),
      homeSpread: 1.2,
      awaySpread: -1.2,
      startTime: faker.date.soon().toISOString(),
    },
    {
      id: faker.string.hexadecimal(),
      homeTeam: faker.location.city(),
      awayTeam: faker.location.city(),
      homeSpread: 1.5,
      awaySpread: -1.5,
      startTime: faker.date.soon().toISOString(),
    },
  ];
  const createComponent = createComponentFactory({
    component: ScheduleContainerComponent,
    imports: [HttpClientTestingModule],
    detectChanges: true,
  });

  beforeEach(() => {
    spectator = createComponent();
    controller = spectator.inject(HttpTestingController);
    const leagueController = controller.expectOne('leagues');
    leagueController.flush(expectedLeagues);
    spectator.detectChanges();
  });
  it('loads the leagues', () => {
    const expectedText = expectedLeagues.map((l) => l.title);

    // Act
    spectator.click(byTestId('league-select'));

    // Assert
    controller.verify();
    const leagueOption = spectator.queryAll(byTestId('league-option'), {
      root: true,
    });
    expect(leagueOption.map((l) => l.textContent)).toEqual(expectedText);
  });
  describe('league is selected', () => {
    let scheduleUrl: string;
    beforeEach(() => {
      const expectedLeague = expectedLeagues[0];
      const searchParams = new URLSearchParams({ league: expectedLeague.key });
      scheduleUrl = `schedule?${searchParams.toString()}`;

      spectator.click(byTestId('league-select'));
      spectator.debugElement
        .query(By.directive(MatOption))
        .componentInstance.select();
      spectator.detectChanges();
    });
    it('schedule-btn looks for the selected league', () => {
      // Act
      spectator.click(byTestId('schedule-btn'));

      // Assert
      controller.expectOne(scheduleUrl);
      controller.verify();
    });

    it('schedule-table displays the schedule', () => {
      const dateGame1 = new Date(expectedGames[0].startTime).toLocaleString();
      const dateGame2 = new Date(expectedGames[1].startTime).toLocaleString();
      const teamsGame1 = `${expectedGames[0].awayTeam} @ ${expectedGames[0].homeTeam}`;
      const teamsGame2 = `${expectedGames[1].awayTeam} @ ${expectedGames[1].homeTeam}`;

      spectator.click(byTestId('schedule-btn'));
      const scheduleRequest = controller.expectOne(scheduleUrl);

      // Act
      scheduleRequest.flush(expectedGames);
      spectator.detectChanges();

      // Assert
      const cells = spectator.queryAll(byTestId('schedule-cell'));
      expect(cells[0].textContent?.trim()).toEqual(dateGame1);
      expect(cells[1].textContent?.trim()).toEqual(teamsGame1);
      expect(cells[2].textContent?.trim()).toEqual(dateGame2);
      expect(cells[3].textContent?.trim()).toEqual(teamsGame2);
    });
  });
});
