import * as React from "react";
import { Player } from "../interfaces/Player";
// import { RosterFranchise } from "../interfaces/RosterFranchise";
import { getSingleArray } from "../functions/getSingleArray";
import { SortableList } from "./SortableList";
import { ListItemAvatar, Avatar } from "@material-ui/core";
import { getMflPlayerPhoto } from "../functions/getMflPlayerPhoto";

interface Franchise {
	week: number;
	player: Player[] | Player;
	id: number;
}

interface RostersResponse {
	rosters: { franchise: Franchise };
	version: number;
	encoding: string;
}

const displayPlayerInto = (player: Player) => (
	<ListItemAvatar>
		<Avatar alt={`${player.id}`} src={getMflPlayerPhoto(player.id)} />
	</ListItemAvatar>
);

export const RosterList = () => {
	const [players, setPlayers] = React.useState<Player[]>([]);
	// const [rosterFranchise, setRosterFranchise] = React.useState<
	// 	RosterFranchise[]
	// >([]);

	React.useEffect(() => {
		fetch(
			"https://www76.myfantasyleague.com/2020/export?TYPE=rosters&L=14228&APIKEY=aR1s3cGUvuWvx0WmPlzAaTAeFbox&FRANCHISE=0001&W=&JSON=1",
			{
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			}
		)
			.then((response) => response.json())
			.then((json: RostersResponse) => {
				var franchises = getSingleArray(json.rosters.franchise);
				if (franchises.length) {
					var currentFranchise = franchises[0];
					setPlayers(getSingleArray(currentFranchise.player));
				}
			})
			.catch((r) => console.log(`error ${r}`));
	}, []);
	return (
		<>
			<div>My Code Updated</div>
			<SortableList
				items={players}
				keyMethod={(p) => `${p.id}`}
				displayMethod={displayPlayerInto}
			/>
		</>
	);
};
