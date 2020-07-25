export interface Player
{
    status: 'ROSTER' | 'locked',
    id: number,
    drafted: string
}