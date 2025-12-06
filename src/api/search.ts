// src/api/search.ts
// Purpose: search AoE4 players by name

const BASE = "https://aoe4world.com/api/v0";

export async function searchPlayers(query: string) {
    const url = `${BASE}/players/search?query=${encodeURIComponent(query)}`;
    const res = await fetch(url);

    if (!res.ok) throw new Error("Search failed");
    return res.json(); // returns { players: [...] }
}
