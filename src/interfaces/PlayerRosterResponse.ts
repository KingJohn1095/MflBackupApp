import { PlayerStatus } from "./PlayerStatus";

export interface PlayerRosterResponse {
	playerRosterStatuses: { playerStatus: PlayerStatus | PlayerStatus[] };
}
