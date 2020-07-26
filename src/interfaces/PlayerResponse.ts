import { PlayerInfo } from "./PlayerInfo";

export interface PlayerResponse {
	players: { player: PlayerInfo | PlayerInfo[] };
}
