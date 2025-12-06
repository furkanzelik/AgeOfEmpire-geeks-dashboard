// src/components/CivStatsChart.tsx
// Purpose: Civilization stats table + bar chart with proper civ names and fallback icons.

interface Props {
    games: any[];
}

/* CIV ICONS (AoE4World CDN) */
const civIcons: Record<string, string> = {
    english: "https://aoe4world.b-cdn.net/images/civs/english.png",
    chinese: "https://aoe4world.b-cdn.net/images/civs/chinese.png",
    hre: "https://aoe4world.b-cdn.net/images/civs/hre.png",
    french: "https://aoe4world.b-cdn.net/images/civs/french.png",
    rus: "https://aoe4world.b-cdn.net/images/civs/rus.png",
    delhi: "https://aoe4world.b-cdn.net/images/civs/delhi.png",
    abbasid: "https://aoe4world.b-cdn.net/images/civs/abbasid.png",
    malians: "https://aoe4world.b-cdn.net/images/civs/malians.png",
    ottomans: "https://aoe4world.b-cdn.net/images/civs/ottomans.png",
    mongols: "https://aoe4world.b-cdn.net/images/civs/mongols.png",

    // Fallback for any unknown civilization
    unknown: "https://aoe4world.b-cdn.net/images/civs/random.png",
};

/* Returns the icon-key for a civilization
   but keeps the REAL NAME separate (very important) */
function normalizeCiv(name: string) {
    if (!name) return "unknown";

    const lowered = name.toLowerCase();

    if (lowered.includes("holy roman")) return "hre";
    if (lowered.includes("roman")) return "hre";
    if (lowered.includes("english")) return "english";
    if (lowered.includes("chinese")) return "chinese";
    if (lowered.includes("french")) return "french";
    if (lowered.includes("rus")) return "rus";
    if (lowered.includes("delhi")) return "delhi";
    if (lowered.includes("abbasid")) return "abbasid";
    if (lowered.includes("malian")) return "malians";
    if (lowered.includes("ottoman")) return "ottomans";
    if (lowered.includes("mongol")) return "mongols";

    // Unknown/new civ (future content or custom mode)
    return "unknown";
}

export default function CivStatsChart({ games }: Props) {
    /* Build stats object */
    const stats: Record<
        string,
        {
            civKey: string;     // icon key
            civName: string;    // REAL name from API
            wins: number;
            losses: number;
            total: number;
        }
    > = {};

    games.forEach((g) => {
        const realName = g.civilization || "Unknown Civilization";
        const key = normalizeCiv(realName);

        if (!stats[key]) {
            stats[key] = {
                civKey: key,
                civName: realName,
                wins: 0,
                losses: 0,
                total: 0,
            };
        }

        stats[key].total++;
        if (g.won) stats[key].wins++;
        else stats[key].losses++;
    });

    /* Convert to array & calculate winrates */
    const data = Object.values(stats)
        .map((s) => ({
            civKey: s.civKey,
            civName: s.civName,
            icon: civIcons[s.civKey] ?? civIcons["unknown"],
            wins: s.wins,
            losses: s.losses,
            total: s.total,
            winrate: s.total > 0 ? Math.round((s.wins / s.total) * 100) : 0,
        }))
        .sort((a, b) => b.total - a.total);

    const getColor = (wr: number) => {
        if (wr >= 60) return "#34d399";
        if (wr >= 50) return "#4ade80";
        if (wr >= 40) return "#f59e0b";
        return "#ef4444";
    };

    return (
        <div className="w-full space-y-10">

            {/* ===========================
          CIV STATS TABLE
      ============================ */}
            <div className="rounded-xl bg-slate-800/70 p-6 border border-slate-700 shadow">
                <h3 className="text-xl font-semibold mb-4">Civilization Stats</h3>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-slate-400 text-sm border-b border-slate-700">
                        <tr>
                            <th className="py-2">Civ</th>
                            <th className="py-2">Games</th>
                            <th className="py-2">Wins</th>
                            <th className="py-2">Losses</th>
                            <th className="py-2">WR</th>
                        </tr>
                        </thead>

                        <tbody>
                        {data.map((row) => (
                            <tr
                                key={row.civKey + row.civName}
                                className="border-b border-slate-700/40 hover:bg-slate-700/20 transition"
                            >
                                <td className="py-3 flex items-center gap-3">
                                    <img
                                        src={row.icon}
                                        className="w-7 h-7 rounded-md"
                                        alt={row.civName}
                                    />
                                    <span>{row.civName}</span>
                                </td>

                                <td className="py-3 text-slate-300">{row.total}</td>
                                <td className="py-3 text-emerald-400">{row.wins}</td>
                                <td className="py-3 text-rose-400">{row.losses}</td>

                                <td
                                    className="py-3 font-semibold"
                                    style={{ color: getColor(row.winrate) }}
                                >
                                    {row.winrate}%
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
