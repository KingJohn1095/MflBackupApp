import * as React from "react";
import { Player } from "../interfaces/Player";
import { RosterFranchise } from "../interfaces/RosterFranchise";

interface Franchise {
	week: number;
	player: Player;
	id: number;
}

interface RostersResponse {
	rosters: Franchise[];
}

export const RosterList = () => {
	const [players, setPlayers] = React.useState<Player[]>([]);
	const [rosterFranchise, setRosterFranchise] = React.useState<
		RosterFranchise[]
	>([]);

	React.useEffect(() => {
		fetch(
			"https://www76.myfantasyleague.com/2020/export?TYPE=rosters&L=14228&APIKEY=aR1s3cGUvuWvx0WmPlzAaTAeFbox&FRANCHISE=0001&W=&JSON=1"
		)
			.then((r) => {
				if (r.status == 200) {
					return r.json();
				}
				return {};
			})
			.then((json: RostersResponse) => {
				setPlayers(json.rosters.map((r) => r.player));
			});
	});
	return (
		<>
			{players.map((p) => (
				<div>{p.status}</div>
			))}
		</>
	);
};
