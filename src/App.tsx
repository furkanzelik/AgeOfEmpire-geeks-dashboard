// src/App.tsx
// Purpose: global layout + AoE4-themed header/footer + routing

import { Routes, Route, Link, NavLink } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PlayerPage from "./pages/PlayerPage";

export default function App() {
    return (
        <div className="min-h-screen flex flex-col bg-[#020617] text-slate-100">
            {/* Optional texture overlay if you enable .texture-parchment */}
            {/* <div className="texture-parchment" /> */}

            {/* HEADER */}
            <header className="border-b border-[#d6b56c]/40 bg-[#020617]/95 shadow-[0_4px_25px_rgba(0,0,0,0.9)] sticky top-0 z-20">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                    <Link to="/" className="flex items-baseline gap-2">
            <span className="font-cinzel text-xl tracking-[0.18em] text-[#facc6b]">
              AOE4
            </span>
                        <span className="uppercase text-xs text-slate-300 tracking-[0.25em]">
              GEEKS DASHBOARD
            </span>
                    </Link>

                    <nav className="flex items-center gap-4 text-sm">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `uppercase tracking-wide ${
                                    isActive ? "text-[#facc6b]" : "text-slate-300"
                                } hover:text-[#facc6b]`
                            }
                        >
                            Home
                        </NavLink>
                    </nav>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="flex-1">
                <div className="max-w-6xl mx-auto w-full px-4 py-8">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/player/:id" element={<PlayerPage />} />
                    </Routes>
                </div>
            </main>

            {/* FOOTER */}
            <footer className="border-t border-slate-800 bg-[#020617]/95 text-xs text-slate-400 py-3">
                <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
                    <span>Made for AoE IV Geeks · Uses aoe4world.com API</span>
                    <span className="text-[10px] text-slate-500">
            Not affiliated with Microsoft / Relic
          </span>
                </div>
            </footer>
        </div>
    );
}
