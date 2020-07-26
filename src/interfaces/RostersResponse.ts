import { Franchise } from "./RosterFranchise";

export interface RostersResponse {
	rosters: { franchise: Franchise };
	version: number;
	encoding: string;
}
