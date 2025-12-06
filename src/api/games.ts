// src/api/games.ts
// Purpose: fetch recent matches for a player

import { apiGet } from "./aoe4world";

export interface Aoe4Game {
    id: string;
    map: string;
    duration: number;
    started_at: string;
    civ: string;
    won: boolean;
}

export function getPlayerGames(id: string | number) {
    return apiGet(`/players/${id}/games`);
}
