// src/pages/PlayerPage.tsx
// Purpose: AoE4-styled player dashboard with hero banner + civ-accent theme

import { useParams } from "react-router-dom";
import { usePlayer } from "../hooks/usePlayer";
import { usePlayerGames } from "../hooks/usePlayerGames";

import RecentMatches from "../components/RecentMatches";
import CivStatsChart from "../components/CivStatsChart";

const civBackgrounds: Record<string, string> = {
    english: "https://aoe4world.b-cdn.net/images/backgrounds/english.jpg",
    chinese: "https://aoe4world.b-cdn.net/images/backgrounds/chinese.jpg",
    hre: "https://aoe4world.b-cdn.net/images/backgrounds/hre.jpg",
    french: "https://aoe4world.b-cdn.net/images/backgrounds/french.jpg",
    rus: "https://aoe4world.b-cdn.net/images/backgrounds/rus.jpg",
    delhi: "https://aoe4world.b-cdn.net/images/backgrounds/delhi.jpg",
    abbasid: "https://aoe4world.b-cdn.net/images/backgrounds/abbasid.jpg",
    malians: "https://aoe4world.b-cdn.net/images/backgrounds/malians.jpg",
    ottomans: "https://aoe4world.b-cdn.net/images/backgrounds/ottomans.jpg",
    mongols: "https://aoe4world.b-cdn.net/images/backgrounds/mongols.jpg",

    default: "https://aoe4world.b-cdn.net/images/backgrounds/random.jpg",
};

function getMostPlayedCiv(games: any[]) {
    const count: Record<string, number> = {};

    games.forEach((g) => {
        const civ = g.civilization?.toLowerCase() || "unknown";
        count[civ] = (count[civ] || 0) + 1;
    });

    let top = "unknown";
    let max = 0;

    for (const civ of Object.keys(count)) {
        if (count[civ] > max) {
            max = count[civ];
            top = civ;
        }
    }

    return top;
}

function getCivAccent(civ: string) {
    const c = civ.toLowerCase();
    if (c.includes("english")) return "#c84c4c";
    if (c.includes("french")) return "#3b82f6";
    if (c.includes("chinese")) return "#f97373";
    if (c.includes("rus")) return "#60a5fa";
    if (c.includes("malian")) return "#22c55e";
    if (c.includes("ottoman")) return "#14b8a6";
    if (c.includes("delhi")) return "#eab308";
    if (c.includes("abbasid")) return "#facc6b";
    if (c.includes("mongol")) return "#06b6d4";
    if (c.includes("roman")) return "#facc6b";
    return "#facc6b";
}

export default function PlayerPage() {
    const { id } = useParams();
    const playerId = id ?? "4635035";

    const { data: player, isLoading, error } = usePlayer(playerId);
    const { data: gameData, isLoading: loadingGames } = usePlayerGames(playerId);

    if (isLoading) return <p>Speler wordt geladen…</p>;
    if (error) return <p className="text-red-400">Kon speler niet laden.</p>;
    if (!player) return <p>Geen speler gevonden.</p>;

    const games = Array.isArray(gameData?.games) ? gameData.games : [];
    const mostPlayed = getMostPlayedCiv(games);
    const accent = getCivAccent(mostPlayed);
    const background =
        civBackgrounds[mostPlayed] ?? civBackgrounds.default;

    const wins = player.games?.wins ?? 0;
    const losses = player.games?.losses ?? 0;
    const winRate = player.games?.win_rate
        ? Math.round(player.games.win_rate * 100)
        : null;

    return (
        <div className="w-full space-y-12">
            {/* HERO BANNER */}
            <div className="relative h-56 w-full rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.9)] border border-[#d6b56c]/40">
                <div className="absolute inset-0">
                    <img
                        src={background}
                        alt="civ background"
                        className="w-full h-full object-cover"
                        style={{ filter: "brightness(0.4)" }}
                    />
                </div>

                <div className="relative z-10 h-full flex items-center px-8 bg-gradient-to-r from-black/65 via-black/35 to-black/5">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <img
                                src={player.avatar}
                                alt={player.name}
                                className="w-24 h-24 rounded-full border-4 border-slate-800 shadow-[0_0_22px_rgba(0,0,0,0.9)]"
                            />
                            <div
                                className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                                style={{
                                    background: accent,
                                    color: "#020617",
                                    border: "1px solid rgba(15,23,42,0.9)",
                                }}
                            >
                                {player.rating ?? "Unranked"}
                            </div>
                        </div>

                        <div>
                            <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-slate-50">
                                {player.name}
                            </h1>
                            <p className="text-slate-300 mt-1 text-sm">
                                Player ID: {player.profile_id}
                            </p>

                            {mostPlayed !== "unknown" && (
                                <p
                                    className="text-sm mt-2"
                                    style={{ color: accent }}
                                >
                                    Mostly plays:{" "}
                                    <span className="capitalize">{mostPlayed}</span>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* STATS */}
            <section>
                <h2 className="font-cinzel text-2xl font-semibold mb-4">
                    Statistieken
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="imperial-card p-6">
                        <p className="text-xs text-slate-400">Rating</p>
                        <p className="text-4xl font-bold mt-1">
                            {player.rating ?? "?"}
                        </p>
                    </div>

                    <div className="imperial-card p-6">
                        <p className="text-xs text-slate-400">Wins</p>
                        <p className="text-4xl font-bold mt-1 text-emerald-400">
                            {wins}
                        </p>
                    </div>

                    <div className="imperial-card p-6">
                        <p className="text-xs text-slate-400">Losses</p>
                        <p className="text-4xl font-bold mt-1 text-rose-400">
                            {losses}
                        </p>
                    </div>
                </div>
            </section>

            {/* WINRATE */}
            <section>
                <h2 className="font-cinzel text-2xl font-semibold mb-4">
                    Winrate
                </h2>

                <div className="imperial-card p-6 w-full sm:w-72">
                    <p className="text-xs text-slate-400">Winrate</p>
                    <p
                        className="text-5xl font-bold mt-2"
                        style={{ color: accent }}
                    >
                        {winRate !== null ? `${winRate}%` : "?"}
                    </p>
                </div>
            </section>

            {/* RECENT MATCHES */}
            <section>
                <h2 className="font-cinzel text-2xl font-semibold mb-4">
                    Recente matches
                </h2>

                {loadingGames && <p>Matches worden geladen…</p>}
                {games.length > 0 && <RecentMatches games={games} />}
            </section>

            {/* CIV PERFORMANCE */}
            <section>
                <h2 className="font-cinzel text-2xl font-semibold mb-4">
                    Civ performance
                </h2>

                {games.length > 0 && <CivStatsChart games={games} />}
            </section>
        </div>
    );
}
