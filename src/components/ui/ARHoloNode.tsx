"use client";

import { motion } from "framer-motion";

import React from "react";

interface ARHoloNodeProps {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    onClick?: () => void;
    isActive?: boolean;
    delay?: number;
}

// Holographic Link Item
export function ARHoloNode({ href, label, icon: Icon, onClick, isActive, delay = 0 }: ARHoloNodeProps) {
    const isInternal = href.startsWith("#");

    // Smooth scroll handler if it's an anchor link
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (onClick) onClick();

        if (isInternal) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover="hover"
            transition={{ delay: delay * 0.1 }}
            className="relative flex items-center justify-center p-2 mb-2 w-full"
        >
            {/* The Link Component */}
            <a
                href={href}
                className="group relative flex items-center justify-center w-12 h-12"
                onClick={handleClick}
                aria-label={label}
                target={!isInternal && href.startsWith("http") ? "_blank" : undefined}
                rel={!isInternal && href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
                {/* 1. Base Node Structure (Hexagon) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* Rotating Outer Ring */}
                    <div className="absolute inset-0 border border-cyan-500/20 w-full h-full scale-110 group-hover:scale-125 group-hover:border-cyan-400/50 transition-all duration-500"
                        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                    />

                    {/* Core Background */}
                    <div className={`absolute inset-0 bg-slate-900/80 backdrop-blur-md transition-all duration-300 group-hover:bg-cyan-950/40`}
                        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                    />

                    {/* Active State Indicator */}
                    {isActive && (
                        <div className="absolute inset-0 bg-cyan-500/10 animate-pulse"
                            style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                        />
                    )}
                </div>

                {/* 2. Floating Icon with Glitch/Scan Effect */}
                <div className="relative z-10 p-2 flex items-center justify-center">
                    {/* Base Icon */}
                    <Icon className={`w-5 h-5 text-slate-400 transition-all duration-300 group-hover:text-cyan-500 group-hover:scale-110 ${isActive ? "text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]" : ""}`} />

                    {/* Scanning Overlay Icon - Controlled by parent's hover variant */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center text-white drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
                            variants={{
                                hover: {
                                    clipPath: ["inset(0 0 100% 0)", "inset(0 0 0 0)", "inset(100% 0 0 0)"],
                                    opacity: [0, 1, 0],
                                    transition: {
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        times: [0, 0.5, 1]
                                    }
                                }
                            }}
                        >
                            <Icon className="w-5 h-5" />
                        </motion.div>
                    </div>
                </div>

                {/* 3. AR Data Label (Tooltip style) */}
                {/* Visible on hover only - Fixed positioning outside sidebar */}
                <div className="hidden md:block absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2 -translate-x-2 pointer-events-none z-[9999] whitespace-nowrap">
                    <div className="flex items-center">
                        {/* Connecting Line */}
                        <div className="w-8 h-[1px] bg-cyan-500/60" />
                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_5px_#22d3ee]" />

                        {/* Data Box */}
                        <div className="ml-2 px-3 py-1.5 bg-slate-950/90 border border-cyan-500/40 text-cyan-400 text-xs font-mono tracking-widest uppercase shadow-[0_0_20px_rgba(34,211,238,0.4)] backdrop-blur-md relative overflow-hidden">
                            <span className="text-[10px] text-cyan-600 mr-2">NOD.0{delay + 1}</span>
                            {label}
                            {/* Scanline inside tooltip */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent w-full h-full -translate-x-full animate-[shimmer_2s_infinite]" />
                        </div>
                    </div>
                </div>

            </a>
        </motion.div>
    );
}
