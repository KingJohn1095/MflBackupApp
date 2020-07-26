import { RosterFranchise } from "./RosterFranchise";

export interface PlayerStatus {
	id: number;
	roster_franchise?: RosterFranchise;
	is_fa?: boolean;
	locked?: boolean;
}
