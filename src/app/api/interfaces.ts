export interface Driver {
  driverId: string;
  name: string;
  surname: string;
  nationality: string;
  birthday: string;
  number: number;
  shortName: string;
  url: string;
}

export interface DriversResponse {
  api: string;
  url: string;
  limit: number;
  offset: number;
  total: number;
  drivers: Driver[];
}

export interface IRacesApiResponse {
  api: string;
  url: string;
  limit: number;
  offset: number;
  total: number;
  season: number;
  round: number;
  championship: {
    championshipId: string;
    championshipName: string;
    url: string;
    year: number;
  };
  races: IRaces[];
}

export interface IRaces {
  raceId: string;
  championshipId: string;
  raceName: string | null;
  schedule: {
    race: { date: string; time: string | null };
    qualy: { date: string; time: string | null };
    fp1: { date: string; time: string | null };
    fp2: { date: string; time: string | null };
    fp3: { date: string; time: string | null };
    sprintQualy: { date: string | null; time: string | null };
    sprintRace: { date: string | null; time: string | null };
  };
  laps: number | null;
  round: number;
  url: string | null;
  fast_lap: {
    fast_lap: string | null;
    fast_lap_driver_id: string | null;
    fast_lap_team_id: string | null;
  };
  circuit: {
    circuitId: string;
    circuitName: string;
    country: string;
    city: string;
    circuitLength: string;
    lapRecord: string;
    firstParticipationYear: number;
    corners: number;
    fastestLapDriverId: string;
    fastestLapTeamId: string;
    fastestLapYear: number;
    url: string;
  };
  winner: {
    birthday: string | null;
    country: string | null;
    driverId: string | null;
    name: string
    number: number | null;
    shortName: string | null;
    surname: string | null;
  }
  teamWinner: {
  constructorsChampionships: number;
  country: string | null;
  driversChampionships: number;
  firstAppearance: string;
  teamId: string;
  teamName: string;
  url: string;
  }
}[];

  
export interface IDriverStandingsApiResponse {
  api: string;
  url: string;
  limit: number;
  total: number;
  season: number;
  championshipId: string;
  drivers_championship: IDriverStandings[];
}

export interface IDriverStandings {
  classificationId: number;
  driverId: string;
  teamId: string;
  points: number;
  position: number;
  wins: number;
  driver: {
    name: string;
    surname: string;
    nationality: string;
    birthday: string;
    number: number;
    shortName: string;
    url: string;
  };
  team: {
    teamId: string;
    teamName: string;
    country: string;
    firstAppareance: number;
    constructorsChampionships: number;
    driversChampionships: number;
    url: string;
  };

};

 export interface IConstructorsStandingsApiResponse {
  api: string;
  url: string;
  limit: number;
  offset: number;
  total: number;
  season: number;
  championshipId: string;
  constructors_championship: IConstructorsStandings[]; 
 }


 export interface IConstructorsStandings {
    classificationId: number;
    teamId: string;
    points: number;
    position: number;
    wins: number;
    team: {
      teamName: string;
      country: string;
      firstAppareance: number;
      constructorsChampionships: number;
      driversChampionships: number;
      url: string;
    };
}