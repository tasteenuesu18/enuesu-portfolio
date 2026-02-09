"use client";

import { useState } from "react";

import Image from "next/image";
import { User, Github, Menu, X, Box, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import { ARHoloNode } from "@/components/ui/ARHoloNode";

// X (Twitter) Icon - custom SVG since lucide doesn't have the new X logo
function XIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

const NAV_ITEMS = [
    { icon: User, href: "#profile", label: "Profile" },
    { icon: Box, href: "#works", label: "Works" },
];

const SOCIAL_LINKS = [
    { icon: XIcon, href: "https://x.com/taste_enuesu18", label: "X" },
    { icon: Github, href: "https://github.com/tasteenuesu18", label: "GitHub" },
];

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle Button - Styled as HUD Element */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="md:hidden fixed top-5 left-5 z-[60]"
            >
                <button
                    className={cn(
                        "p-3 rounded-none border border-cyan-500/30 backdrop-blur-md bg-slate-950/80 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.15)] clip-path-hexagon transition-all duration-300",
                        isOpen ? "bg-cyan-950/80 border-cyan-400/60" : "hover:bg-cyan-950/50"
                    )}
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)" }}
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </motion.div>

            {/* Sidebar Container */}
            <motion.aside
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1
                }}
                transition={{ duration: 0.6, ease: "circOut" }}
                className={cn(
                    "fixed left-0 top-0 h-screen w-20 bg-slate-950/90 backdrop-blur-xl border-r border-cyan-900/30 z-[9999] flex flex-col items-center py-8 justify-between transition-transform duration-300 md:translate-x-0 shadow-[5px_0_30px_rgba(0,0,0,0.5)] pointer-events-auto",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Decorative Tech Lines */}


                {/* Logo Icon */}
                {/* Logo Icon - Contact Link */}
                {/* Logo Icon - Contact Tooltip */}
                <div
                    className="relative w-14 h-14 rounded-full flex items-center justify-center group mt-16 md:mt-0 transition-all duration-300 active:scale-95 cursor-default"
                >
                    {/* Rotating Rings */}
                    <div className="absolute inset-0 border border-cyan-500/30 rounded-full group-hover:scale-125 transition-transform duration-500" />
                    <div className="absolute inset-0 border-t border-cyan-400 rounded-full animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="w-10 h-10 rounded-full border border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.3)] z-10 relative bg-slate-900 flex items-center justify-center overflow-hidden group-hover:border-cyan-400 transition-colors">
                        <Image
                            src="/ns-icon.png"
                            alt="EN"
                            width={40}
                            height={40}
                            className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                            priority
                        />
                    </div>

                    {/* Tooltip for Email */}
                    <div className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 ml-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-[9999] whitespace-nowrap">
                        <div className="flex items-center">
                            {/* Connecting Line */}
                            <div className="w-8 h-[1px] bg-cyan-500/60" />
                            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_5px_#22d3ee]" />

                            {/* Data Box */}
                            <div className="ml-2 px-3 py-1.5 bg-slate-950/90 border border-cyan-500/40 text-cyan-400 text-xs font-mono tracking-widest uppercase shadow-[0_0_20px_rgba(34,211,238,0.4)] backdrop-blur-md relative overflow-hidden flex items-center gap-2">
                                <Mail size={12} />
                                <span>tasteenuesu18@gmail.com</span>
                                {/* Scanline inside tooltip */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent w-full h-full -translate-x-full animate-[shimmer_2s_infinite]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Icons - AR Style */}
                <nav className="flex flex-col items-center w-full z-10 flex-1 justify-center gap-8">
                    {/* Primary Navigation Group */}
                    <div className="flex flex-col items-center gap-3">
                        {NAV_ITEMS.map((item, i) => (
                            <ARHoloNode
                                key={item.label}
                                {...item}
                                delay={i}
                                onClick={() => setIsOpen(false)}
                            />
                        ))}
                    </div>

                    {/* Divider / Spacer */}
                    <div className="h-px w-8 bg-cyan-900/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]" />

                    {/* Social Links Group */}
                    <div className="flex flex-col items-center gap-2">
                        {SOCIAL_LINKS.map((item, i) => (
                            <ARHoloNode
                                key={item.label}
                                {...item}
                                delay={i + 2}
                            />
                        ))}
                    </div>
                </nav>

            </motion.aside>

            {/* Mobile Backdrop with Grid Effect */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 md:hidden flex items-center justify-center"
                    >
                        {/* Optional: Grid background for mobile menu context */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
