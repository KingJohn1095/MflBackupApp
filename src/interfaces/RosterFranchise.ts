// player status for a roster and franchise

export interface RosterFranchise {
    franchiseId: number,
    status: 'R'| 'S' |'NS'|'IR'|'TS',
}