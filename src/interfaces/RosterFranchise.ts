// player status for a roster and franchise

import { Player } from "./Player";
import { Status } from "enums/status";

export interface Franchise {
	week: number;
	player: Player[] | Player;
	id: number;
}

export interface RosterFranchise {
	franchiseId: number;
	status: Status;
}
