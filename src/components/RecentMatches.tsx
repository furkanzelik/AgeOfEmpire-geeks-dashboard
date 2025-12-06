// src/components/RecentMatches.tsx

import MatchCard from "./MatchCard";

interface Props {
    games: any[];
}

export default function RecentMatches({ games }: Props) {
    return (
        <section className="rounded-xl bg-slate-800/70 p-4 space-y-4">
            <h2 className="text-xl font-semibold">Recent Matches</h2>

            {games.slice(0, 10).map((g) => (
                <MatchCard key={g.id} match={g} />
            ))}
        </section>
    );
}
