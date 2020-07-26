import * as React from "react";
import { Player } from "../interfaces/Player";
import { getSingleArray } from "../functions/getSingleArray";
import { SortableList } from "./SortableList";
import { ListItemAvatar, Avatar, ListItemText } from "@material-ui/core";
import { getMflPlayerPhoto } from "../functions/getMflPlayerPhoto";
import { MflApi } from "api/mflApi";
import { PlayerInfo } from "interfaces/PlayerInfo";
import { PlayerStatus } from "interfaces/PlayerStatus";
import * as Material from "@material-ui/core";
import { Position } from "enums/position";
import { Status } from "enums/status";

const displayPlayerInfo = (player: PlayerInfo) => (
	<>
		<ListItemAvatar style={{ display: "flex", justifyContent: "center" }}>
			<Avatar alt="" src={getMflPlayerPhoto(player.id)} />
		</ListItemAvatar>
		<ListItemText>{player.name} </ListItemText>
	</>
);

export const RosterList = () => {
	const [players, setPlayers] = React.useState<Player[]>([]);
	const [playerInfo, setPlayerInfo] = React.useState<PlayerInfo[]>([]);
	const [playerStatus, setPlayerStatus] = React.useState<PlayerStatus[]>([]);
	const [
		selectedPosition,
		setSelectedPosition,
	] = React.useState<Position | null>(null);
	const mflApi = new MflApi("https://www76.myfantasyleague.com/2020");

	let benchPlayerInfo = React.useMemo(
		() =>
			playerInfo.filter(
				(p) =>
					playerStatus.some(
						(ps) =>
							ps.id === p.id && ps.roster_franchise?.status === Status.bench
					) &&
					(selectedPosition === null || p.position === selectedPosition)
			),
		[playerInfo, playerStatus, selectedPosition]
	);
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
		};
		fetchData();
	}, []);

	React.useEffect(() => {
		const fetchData = async () => {
			if (players.length) {
				let statusResponse = await mflApi.getPlayerRosterStatus(
					players.map((p) => p.id)
				);
				if (statusResponse.status === 200) {
					setPlayerStatus(
						getSingleArray(
							statusResponse.body.playerRosterStatuses.playerStatus
						)
					);
				}
			}
		};
		fetchData();
	});

	React.useEffect(() => {
		const fetchData = async () => {
			if (players.length) {
				let playersResponse = await mflApi.getPlayers(players.map((p) => p.id));
				if (playersResponse.status === 200) {
					setPlayerInfo(getSingleArray(playersResponse.body.players.player));
				}
			}
		};
		fetchData();
	}, [players]);

	return (
		<>
			<div>Select Backups</div>
			<Material.NativeSelect
				onChange={(e) =>
					setSelectedPosition(
						e.target.value === "" ? null : (e.target.value as Position)
					)
				}
				value={selectedPosition ?? ""}
			>
				<option value={""}>None</option>
				<option value={Position.quarterBack}>Quarter Back</option>
				<option value={Position.wideReceiver}>Receiver/Tight End</option>
				<option value={Position.runningBack}>Running Back</option>
			</Material.NativeSelect>
			<SortableList
				items={benchPlayerInfo}
				keyMethod={(p) => `${p.id}`}
				displayMethod={displayPlayerInfo}
			/>
		</>
	);
};
