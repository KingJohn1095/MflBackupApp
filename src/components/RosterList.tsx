import * as React from "react";
import { Player } from "../interfaces/Player";
import { getSingleArray } from "../functions/getSingleArray";
import { SortableList } from "./SortableList";
import { ListItemAvatar, Avatar, ListItemText } from "@material-ui/core";
import { getMflPlayerPhoto } from "../functions/getMflPlayerPhoto";
import { MflApi } from "api/mflApi";
import { PlayerInfo } from "interfaces/PlayerInfo";

const displayPlayerInfo = (player: PlayerInfo) => (
	<>
		<ListItemAvatar>
			<Avatar alt={`${player.id}`} src={getMflPlayerPhoto(player.id)} />
		</ListItemAvatar>
		<ListItemText>{player.name} </ListItemText>
	</>
);

export const RosterList = () => {
	const [players, setPlayers] = React.useState<Player[]>([]);
	const [playerInfo, setPlayerInfo] = React.useState<PlayerInfo[]>([]);
	const mflApi = new MflApi("https://www76.myfantasyleague.com/2020");

	React.useEffect(() => {
		const fetchData = async () => {
			let rosterResponse = await mflApi.getRosters(1);
			if (rosterResponse.status === 200) {
				var franchises = getSingleArray(rosterResponse.body.rosters.franchise);
				if (franchises.length) {
					var currentFranchise = franchises[0];
					setPlayers(getSingleArray(currentFranchise.player));
				}
			}
			console.log(players.map((p) => p.id));
			if (players.length) {
				let playersResponse = await mflApi.getPlayers(players.map((p) => p.id));
				if (playersResponse.status === 200) {
					setPlayerInfo(getSingleArray(playersResponse.body.players.player));
				}
			}
		};
		fetchData();
	}, []);

	return (
		<>
			<div>My Code Updated</div>
			<SortableList
				items={playerInfo}
				keyMethod={(p) => `${p.id}`}
				displayMethod={displayPlayerInfo}
			/>
		</>
	);
};
