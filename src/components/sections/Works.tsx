"use client";

import { HoloReveal } from "@/components/ui/HoloReveal";
import { Construction } from "lucide-react";
import { motion } from "framer-motion";

export function Works() {
    return (
        <section
            id="works"
            className="relative min-h-screen w-full py-32 px-8 pointer-events-none bg-slate-950/80"
        >
            <div className="relative z-10 max-w-4xl mx-auto pointer-events-auto">
                {/* Section Header */}
                <HoloReveal className="mb-16">
                    <p className="text-cyan-400 font-mono tracking-widest text-sm mb-2">
                        02 / WORKS
                    </p>
                    <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                        Projects
                    </h2>
                </HoloReveal>

                {/* Coming Soon Card */}
                <HoloReveal delay={0.2} className="w-full">
                    <div className="flex flex-col items-center justify-center py-24 border border-cyan-500/30 bg-slate-900/60 backdrop-blur-md rounded-lg relative overflow-hidden group">

                        {/* Security Pattern Background */}
                        <div className="absolute inset-0 opacity-10"
                            style={{ backgroundImage: 'radial-gradient(#22d3ee 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                        />

                        <motion.div
                            animate={{
                                rotate: [0, 10, -10, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                            }}
                        >
                            <Construction className="w-20 h-20 text-cyan-400/80 mb-8 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]" />
                        </motion.div>

                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tighter">
                            現在<span className="text-cyan-400">作成中</span>...
                        </h3>

                        <p className="text-cyan-200/60 text-center max-w-md font-mono text-sm leading-relaxed">
                            実績は随時追加していく予定です。<br />
                            <span className="animate-pulse">_</span>
                        </p>

                        {/* Progress Bar */}
                        <div className="flex items-center gap-4 mt-12 w-64">
                            <div className="h-[2px] w-full bg-cyan-900/50 relative overflow-hidden">
                                <motion.div
                                    className="absolute inset-0 bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "100%" }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                        </div>
                    </div>
                </HoloReveal>
            </div>
        </section>
    );
}
