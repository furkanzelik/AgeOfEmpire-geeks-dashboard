// src/hooks/usePlayer.ts
import { useQuery } from "@tanstack/react-query";
import { getPlayer } from "../api/aoe4world";

export function usePlayer(id: string | number) {
    return useQuery({
        queryKey: ["player", id],
        queryFn: () => getPlayer(id),
    });
}
