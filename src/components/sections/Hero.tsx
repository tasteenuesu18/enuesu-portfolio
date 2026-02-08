"use client";


import { HoloReveal } from "@/components/ui/HoloReveal";

export function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-transparent flex flex-col justify-center items-center pointer-events-none">
            {/* Overlay Content */}
            <div className="relative z-10 w-full max-w-6xl px-8 pointer-events-auto">

                {/* Main Title Area - with improved visibility and alignment */}
                <div className="flex flex-col items-center text-center space-y-4 bg-slate-950/30 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.3)] mx-auto max-w-4xl">
                    <HoloReveal delay={1.2}>
                        <p className="text-cyan-400 font-mono tracking-widest text-sm uppercase mb-2">
                            Engineer (Lazy)
                        </p>
                    </HoloReveal>

                    <HoloReveal delay={1.0}>
                        <h1 className="text-7xl md:text-[9rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-gray-400 leading-none mix-blend-overlay drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                            enuesu
                        </h1>
                        <p className="text-xl md:text-2xl font-mono tracking-[0.5em] text-cyan-200/60 mt-4 md:mt-6">
                            PORTFOLIO
                        </p>
                    </HoloReveal>

                    <HoloReveal delay={1.5}>
                        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent w-full max-w-md mt-6 mx-auto" />
                    </HoloReveal>
                </div>


            </div>

        </section >
    );
}
