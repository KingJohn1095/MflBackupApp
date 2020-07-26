export interface Player {
	status: "ROSTER" | "locked";
	id: number;
	drafted: string;
}

export interface PlayerInfo {
	position: string;
	name: string;
	id: number;
	team: string;
}

export interface PlayerResponse {
	player: PlayerInfo | PlayerInfo[];
}
