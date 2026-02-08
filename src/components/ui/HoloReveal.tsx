"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface HoloRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function HoloReveal({ children, className = "", delay = 0 }: HoloRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: {
                    opacity: 0,
                    scale: 0.95,
                },
                visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                        delay: delay
                    }
                }
            }}
            className={`relative group ${className}`}
        >
            {/* Holographic Scanline Effect */}
            <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={isInView ? { scaleY: 1, opacity: [0, 1, 0] } : {}}
                transition={{ duration: 0.6, times: [0, 0.5, 1], delay: delay }}
                className="absolute inset-0 bg-cyan-500/20 z-10 pointer-events-none origin-top"
                style={{ mixBlendMode: "overlay" }}
            />
            {/* Horizontal Glitch Line */}
            <motion.div
                initial={{ top: "0%", opacity: 0 }}
                animate={isInView ? { top: "100%", opacity: [0, 1, 0] } : {}}
                transition={{ duration: 0.8, delay: delay, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-cyan-400 z-10 shadow-[0_0_10px_#22d3ee] pointer-events-none"
            />

            {children}

            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
    );
}
