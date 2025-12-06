// src/api/aoe4world.ts

const BASE = "https://aoe4world.com/api/v0";

export async function apiGet(path: string) {
    const res = await fetch(`${BASE}${path}`);
    if (!res.ok) throw new Error("API error");
    return res.json();
}

export function getPlayer(id: string | number) {
    return apiGet(`/players/${id}`);
}
