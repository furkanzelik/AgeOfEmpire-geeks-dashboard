// src/hooks/usePlayerGames.ts
// Purpose: hook to load recent matches with React Query

import { useQuery } from "@tanstack/react-query";
import { getPlayerGames } from "../api/games";

export function usePlayerGames(id: string | number) {
    return useQuery({
        queryKey: ["player-games", id],
        queryFn: () => getPlayerGames(id),
    });
}
