// src/components/PlayerSearchBar.tsx
// Purpose: Search AoE4 players with AoE4-styled panel + imperial button

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchPlayers } from "../api/search";

export default function PlayerSearchBar() {
    const navigate = useNavigate();

    const [value, setValue] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    async function handleSearchName(name: string) {
        if (name.trim().length < 2) {
            setResults([]);
            setHighlightedIndex(-1);
            return;
        }

        setLoading(true);
        try {
            const data = await searchPlayers(name);
            setResults(data.players || []);
            setHighlightedIndex(data.players?.length ? 0 : -1);
        } catch {
            setResults([]);
            setHighlightedIndex(-1);
        }
        setLoading(false);
    }

    function openPlayer(id: number) {
        navigate(`/player/${id}`);
        setValue("");
        setResults([]);
        setHighlightedIndex(-1);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!value.trim()) return;

        const trimmed = value.trim();
        const numeric = /^[0-9]+$/.test(trimmed);

        if (numeric) {
            openPlayer(Number(trimmed));
            return;
        }

        if (results.length > 0) {
            const chosen =
                highlightedIndex >= 0 ? results[highlightedIndex] : results[0];
            openPlayer(chosen.profile_id);
            return;
        }

        handleSearchName(trimmed);
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (!results.length) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((i) => Math.min(i + 1, results.length - 1));
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((i) => Math.max(i - 1, 0));
        }

        if (e.key === "Enter") {
            e.preventDefault();
            const chosen =
                highlightedIndex >= 0 ? results[highlightedIndex] : results[0];
            if (chosen) openPlayer(chosen.profile_id);
        }
    }

    return (
        <div className="relative">
            <form
                onSubmit={handleSubmit}
                className="imperial-card flex gap-3 items-center p-3"
            >
                <input
                    type="text"
                    placeholder="Zoek op naam of player ID..."
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                        handleSearchName(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-900/70 text-slate-100 border border-slate-700 focus:border-[#facc6b] outline-none text-sm"
                />

                <button
                    type="submit"
                    className="imperial-button text-sm whitespace-nowrap"
                >
                    Zoek speler
                </button>
            </form>

            {/* Dropdown */}
            {value.length > 1 && results.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-slate-900/95 border border-slate-700 rounded-xl overflow-hidden shadow-[0_0_32px_rgba(0,0,0,0.9)] z-20 max-h-72 overflow-y-auto">
                    {results.map((p, index) => (
                        <div
                            key={p.profile_id}
                            data-index={index}
                            onClick={() => openPlayer(p.profile_id)}
                            className={`flex items-center gap-3 p-3 cursor-pointer text-sm transition ${
                                index === highlightedIndex
                                    ? "bg-slate-700/80"
                                    : "hover:bg-slate-800/70"
                            }`}
                        >
                            <img
                                src={p.avatar}
                                alt={p.name}
                                className="w-9 h-9 rounded-full border border-slate-600"
                            />
                            <div>
                                <p className="font-semibold text-slate-100">{p.name}</p>
                                <p className="text-[11px] text-slate-400">
                                    ID: {p.profile_id}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {loading && (
                <p className="text-xs text-slate-400 mt-1">
                    Zoeken...
                </p>
            )}
        </div>
    );
}
