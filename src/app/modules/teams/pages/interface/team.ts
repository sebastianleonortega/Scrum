import {TeamEmployee} from "@app/modules/teams/pages/interface/team-employees";

export interface Team {
  areaName: string;
  areaId: string;
  employees: TeamEmployee[],
  teamId: string;
  teamName: string;
}



