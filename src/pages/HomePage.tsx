// src/pages/HomePage.tsx
// Purpose: Homepage with hero slideshow + blur crossfade (no framer-motion)

import { useEffect, useState } from "react";
import PlayerSearchBar from "../components/PlayerSearchBar";

const backgrounds = [
    "https://cdn.ageofempires.com/aoe/wp-content/uploads/2021/06/bg-age4-civ-eng-splash-right-mobile.webp",
    "https://cdn.ageofempires.com/aoe/wp-content/uploads/2021/06/bg-age4-civ-chi-splash-right-mobile.webp",
    "https://cdn.ageofempires.com/aoe/wp-content/uploads/2021/08/bg-age4-civ-hre-splash-right-mobile.webp",
    "https://cdn.ageofempires.com/aoe/wp-content/uploads/2021/06/bg-age4-civ-fre-splash-right-mobile.webp",
    "https://cdn.ageofempires.com/aoe/wp-content/uploads/2021/08/bg-age4-civ-rus-splash-right-mobile.webp",
    "https://cdn.ageofempires.com/aoe/wp-content/uploads/2021/06/bg-age4-civ-mon-splash-right-mobile.webp",
];
export default function HomePage() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(
            () => setIndex((i) => (i + 1) % backgrounds.length),
            6000
        );
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full space-y-12">
            {/* HERO */}
            <div className="relative h-[60vh] min-h-[420px] w-full rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.9)] border border-[#d6b56c]/40">

                {/* Slideshow */}
                <div className="absolute inset-0">
                    {backgrounds.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            alt="civ backdrop"
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2000ms] ease-out ${
                                i === index ? "opacity-100 blur-0" : "opacity-0 blur-md"
                            }`}
                            style={{ filter: "brightness(0.4)" }}
                        />
                    ))}
                </div>

                {/* Overlay */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center bg-gradient-to-b from-black/40 via-black/20 to-black/60">
                    <h1 className="font-cinzel text-4xl md:text-5xl font-extrabold mb-4 text-[#facc6b] drop-shadow-[0_0_25px_rgba(0,0,0,0.9)] opacity-0 animate-slideUp">
                        Age of Empires IV · Geeks
                    </h1>

                    <p className="text-lg text-slate-200 max-w-xl mb-8 opacity-0 animate-fadeIn delayed-200">
                        Track spelers, analyseer matches en ontdek jouw beste civilizations.
                    </p>

                    <div className="w-full max-w-xl opacity-0 animate-fadeIn delayed-400">
                        <PlayerSearchBar />
                    </div>
                </div>
            </div>

            {/* DIVIDER */}
            <div className="imperial-divider" />

            {/* FEATURES */}
            <section className="mb-12">
                <h2 className="font-cinzel text-2xl font-semibold mb-6 text-slate-100">
                    Wat kan je hier doen?
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { title: "Zoek spelers", desc: "Vind elke AoE4 speler op naam of ID en open direct hun dashboard." },
                        { title: "Match history", desc: "Bekijk recente ranked games, civ-keuzes, maps en win/loss." },
                        { title: "Civ performance", desc: "Analyseer winrates per civilization en ontdek je echte main." },
                        { title: "Leaderboards", desc: "In de toekomst: globale ranglijsten en top spelers per civ." },
                    ].map((tile, i) => (
                        <div
                            key={i}
                            className="imperial-card p-6 hover:border-[#facc6b]/80 hover:shadow-[0_0_32px_rgba(250,204,107,0.4)] transition"
                        >
                            <h3 className="text-lg font-semibold mb-2 text-slate-50">
                                {tile.title}
                            </h3>
                            <p className="text-slate-300 text-sm">{tile.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}