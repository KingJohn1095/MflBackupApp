import * as React from "react";
import { Player } from "../interfaces/Player";
import { getSingleArray } from "../functions/getSingleArray";
import { SortableList } from "./SortableList";
import { ListItemAvatar, Avatar } from "@material-ui/core";
import { getMflPlayerPhoto } from "../functions/getMflPlayerPhoto";
import { MflApi } from "api/MflApi";

const displayPlayerInto = (player: Player) => (
	<ListItemAvatar>
		<Avatar alt={`${player.id}`} src={getMflPlayerPhoto(player.id)} />
	</ListItemAvatar>
);

export const RosterList = () => {
	const [players, setPlayers] = React.useState<Player[]>([]);
	const mflApi = new MflApi("https://www76.myfantasyleague.com/2020");

	React.useEffect(() => {
		mflApi
			.getRosters(1)
			.then((r) => {
				if (r.status === 200) {
					var franchises = getSingleArray(r.body.rosters.franchise);
					if (franchises.length) {
						var currentFranchise = franchises[0];
						setPlayers(getSingleArray(currentFranchise.player));
					}
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
