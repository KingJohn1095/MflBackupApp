import { RostersResponse } from "interfaces/RostersResponse";
import { PlayerResponse } from "interfaces/Player";
import { BaseApi } from "./baseApi";

export class MflApi extends BaseApi {
	constructor(baseUri: string) {
		super(baseUri);
	}

	public getRosters = (franchiseId: number) =>
		this.genericRequest<RostersResponse>(
			"GET",
			`export?TYPE=rosters&L=14228&APIKEY=&FRANCHISE=${franchiseId
				.toString()
				.padStart(4, "0")}&W=&JSON=1`
		);

	public getPlayers = (playerIds: number[]) => {
		var playerString = playerIds
			.map((i) => i.toString().padStart(4, "0"))
			.join(",");
		return this.genericRequest<PlayerResponse>(
			"GET",
			`export?TYPE=players&L=14228&APIKEY=&DETAILS=&SINCE=&PLAYERS=${encodeURI(
				playerString
			)}&JSON=1`
		);
	};
}
