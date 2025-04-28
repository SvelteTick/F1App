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



export interface RacesResponse {
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
  races: races[];
}

export interface races {
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
    winner: string | null;
    teamWinner: string | null;
  }[];


