// src/components/MatchCard.tsx
// Purpose: Beautiful AoE4 match card with civ + map icons, duration, relative time, win/loss badge

import { formatDistanceToNow } from "date-fns";
import { nl } from "date-fns/locale";

interface Props {
    match: any;
}

/* ---------------------------------------------
   CIVILIZATION NORMALIZER
   Converts AOE4World civ names → icon keys
--------------------------------------------- */
function normalizeCiv(name: string) {
    const lowered = name.toLowerCase();

    if (lowered.includes("abbasid")) return "abbasid";
    if (lowered.includes("delhi")) return "delhi";
    if (lowered.includes("holy roman")) return "hre";
    if (lowered.includes("roman empire")) return "hre";
    if (lowered.includes("french")) return "french";
    if (lowered.includes("english")) return "english";
    if (lowered.includes("rus")) return "rus";
    if (lowered.includes("chinese")) return "chinese";
    if (lowered.includes("ottoman")) return "ottomans";
    if (lowered.includes("malian")) return "malians";
    if (lowered.includes("mongol")) return "mongols";

    return lowered.replace(/\s/g, "");
}

/* ---------------------------------------------
   MAP NORMALIZER
--------------------------------------------- */
function normalizeMap(name: string) {
    return name.trim();
}

/* ---------------------------------------------
   CIV ICONS
--------------------------------------------- */
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
};

/* ---------------------------------------------
   MAP ICONS
--------------------------------------------- */
const mapIcons: Record<string, string> = {
    "Dry Arabia": "https://aoe4world.b-cdn.net/images/maps/dry-arabia.png",
    "Lipany": "https://aoe4world.b-cdn.net/images/maps/lipany.png",
    "Altai": "https://aoe4world.b-cdn.net/images/maps/altai.png",
    "High View": "https://aoe4world.b-cdn.net/images/maps/high-view.png",
    "Relic River": "https://aoe4world.b-cdn.net/images/maps/relic-river.png",
    "Danube River": "https://aoe4world.b-cdn.net/images/maps/danube-river.png",
    "King of the Hill": "https://aoe4world.b-cdn.net/images/maps/king-of-the-hill.png",
    "Prairie": "https://aoe4world.b-cdn.net/images/maps/prairie.png",
};

/* ---------------------------------------------
   MAIN COMPONENT
--------------------------------------------- */
export default function MatchCard({ match }: Props) {
    const mapName = normalizeMap(match.map);
    const civName = normalizeCiv(match.civilization || "");

    const civIcon = civIcons[civName];
    const mapIcon = mapIcons[mapName];

    return (
        <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition">

            {/* LEFT SIDE */}
            <div className="flex items-center gap-4">

                {/* Map icon */}
                <div className="w-14 h-14 bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden">
                    {mapIcon ? (
                        <img
                            src={mapIcon}
                            alt={mapName}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-slate-500 text-xs">{mapName}</span>
                    )}
                </div>

                {/* Civilization icon */}
                <div className="w-14 h-14 bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden">
                    {civIcon ? (
                        <img
                            src={civIcon}
                            alt={match.civilization}
                            className="w-full h-full object-contain p-1"
                        />
                    ) : (
                        <span className="text-slate-400 text-xs">{match.civilization}</span>
                    )}
                </div>

                {/* Match info text */}
                <div>
                    <p className="font-semibold">{mapName}</p>
                    <p className="text-sm text-slate-400">
                        {Math.round(match.duration / 60)} min • {match.civilization}
                    </p>

                    <p className="text-xs text-slate-500">
                        {formatDistanceToNow(new Date(match.started_at), {
                            addSuffix: true,
                            locale: nl,
                        })}
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE — WIN/LOSS */}
            <span
                className={
                    match.won
                        ? "px-4 py-2 rounded-md bg-emerald-500/20 text-emerald-400 font-semibold"
                        : "px-4 py-2 rounded-md bg-rose-500/20 text-rose-400 font-semibold"
                }
            >
        {match.won ? "WIN" : "LOSS"}
      </span>
        </div>
    );
}
