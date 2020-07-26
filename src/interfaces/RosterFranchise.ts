// player status for a roster and franchise

import { Player } from "./Player";

export interface Franchise {
	week: number;
	player: Player[] | Player;
	id: number;
}

export interface RosterFranchise {
	franchiseId: number;
	status: "R" | "S" | "NS" | "IR" | "TS";
}
