import { PlayerStatus } from "./PlayerStatus";

export interface PlayerRosterResponse {
	playerRosterStatus: { playerStatus: PlayerStatus | PlayerStatus[] };
}
